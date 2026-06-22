using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using FinLad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class CategoryService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public async Task EnsureDefaultCategoriesAsync()
    {
        var existing = await _context.Categories.Select(c => c.Name).ToListAsync();
        var defaults = Enum.GetNames<CategoryType>();

        foreach (var name in defaults)
        {
            if (!existing.Contains(name))
                _context.Categories.Add(new Category { Name = name });
        }

        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyCollection<CategoryExpenseDto>> GetExpensesByCategoryAsync(Guid userId, int? year = null)
    {
        var targetYear = year ?? DateTime.UtcNow.Year;

        var grouped = await _context.Transactions
            .Where(t => t.Type == TransactionType.Expense && t.UserId == userId && t.Date.Year == targetYear)
            .GroupBy(t => t.Category.Name)
            .Select(g => new { Category = g.Key, Total = g.Sum(t => t.Amount) })
            .ToListAsync();

        var grandTotal = grouped.Sum(x => x.Total);

        var categories = Enum.GetNames<CategoryType>().Where(c => c != "Salary");
        return [.. categories.Select(name =>
        {
            var match = grouped.FirstOrDefault(g => g.Category == name);
            var total = match?.Total ?? 0;
            var percentage = grandTotal > 0 ? Math.Round(total / grandTotal * 100, 1) : 0;
            return new CategoryExpenseDto(name, total, percentage);
        })];
    }
}

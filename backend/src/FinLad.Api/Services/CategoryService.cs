using Finlad.Domain.Entities;
using FinLad.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class CategoryService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public async Task EnsureDefaultCategoriesAsync()
    {
        var existing = await _context.Categories.Select(c => c.Name).ToListAsync();

        var defaults = new[] { "Food", "Transport", "Utilities", "Housing", "Entertainment", "Health", "Education", "Shopping", "Salary", "Other" };

        foreach (var name in defaults)
        {
            if (!existing.Contains(name))
                _context.Categories.Add(new Category { Name = name });
        }

        await _context.SaveChangesAsync();
    }
}

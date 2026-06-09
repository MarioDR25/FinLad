using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using FinLad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class TransactionService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    
    public async Task<IReadOnlyCollection<TransactionDto>>GetByUserIdAsync(Guid userId)
    {
        return await _context.Transactions
            .AsNoTracking()
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.Date)
            .Include(t => t.Category)
            .Include(t => t.Wallet)
            .Select(t => new TransactionDto(
                t.Id,
                t.Amount,
                t.Type.ToString(),
                t.Category.Name,
                t.Wallet.Name,
                t.Description,
                t.Date
            ))
            .ToListAsync();
    }


    public async Task<TransactionDto> CreateFromParsedAsync(ParsedTransaction parsed, Guid userId)
    {
        if (string.IsNullOrWhiteSpace(parsed.Category))
            throw new InvalidOperationException("AI returned an empty category");

        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Name == parsed.Category);

        if (category == null)
        {
            category = new Category { Name = parsed.Category };
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        var wallet = await _context.Wallets
            .FirstOrDefaultAsync(w => w.UserId == userId && w.Name == parsed.Wallet)
            ?? await _context.Wallets.FirstAsync(w => w.UserId == userId);

        var type = parsed.Type switch
        {
            "Income" => TransactionType.Income,
            "Expense" => TransactionType.Expense,
            "Transfer" => TransactionType.Transfer,
            _ => throw new InvalidOperationException($"Unknown transaction type: {parsed.Type}")
        };

        var transaction = new Transaction
        {
            Amount = parsed.Amount,
            Type = type,
            Description = parsed.Description,
            Date = parsed.Date.HasValue
                ? DateTime.SpecifyKind(parsed.Date.Value, DateTimeKind.Utc)
                : DateTime.UtcNow,
            CategoryId = category.Id,
            WalletId = wallet.Id,
            UserId = userId
        };

        if (type == TransactionType.Income)
            wallet.Balance += parsed.Amount;
        else if (type == TransactionType.Expense)
            wallet.Balance -= parsed.Amount;
        else if (type == TransactionType.Transfer)
        {
            var toWallet = await _context.Wallets
                .FirstOrDefaultAsync(w => w.UserId == userId && w.Name == parsed.ToWallet)
                ?? throw new InvalidOperationException($"Destination wallet not found: {parsed.ToWallet}");

            wallet.Balance -= parsed.Amount;
            toWallet.Balance += parsed.Amount;
        }

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new TransactionDto(
            transaction.Id,
            transaction.Amount,
            transaction.Type.ToString(),
            category.Name,
            wallet.Name,
            transaction.Description,
            transaction.Date
        );
    }

    public async Task<IReadOnlyCollection<CategoryExpenseDto>> GetExpensesByCategoryAsync(Guid userId)
    {
        var grouped = await _context.Transactions
            .Where(t => t.Type == TransactionType.Expense && t.UserId == userId)
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



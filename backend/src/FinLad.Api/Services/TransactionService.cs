using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using FinLad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class TransactionService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public async Task<string[]> GetCategoryNamesAsync(Guid userId)
    {
        return await _context.Categories
            .Select(c => c.Name)
            .Distinct()
            .ToArrayAsync();
    }

    public async Task<string[]> GetWalletNamesAsync(Guid userId)
    {
        return await _context.Wallets
            .Where(w => w.UserId == userId)
            .Select(w => w.Name)
            .ToArrayAsync();
    }

    public async Task<Transaction> CreateFromParsedAsync(ParsedTransaction parsed, Guid userId)
    {
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
            _ => TransactionType.Transfer
        };

        var transaction = new Transaction
        {
            Amount = parsed.Amount,
            Type = type,
            Description = parsed.Description,
            Date = parsed.Date ?? DateTime.UtcNow,
            CategoryId = category.Id,
            WalletId = wallet.Id,
            UserId = userId
        };

        if (type == TransactionType.Income)
            wallet.Balance += parsed.Amount;
        else if (type == TransactionType.Expense)
            wallet.Balance -= parsed.Amount;

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return transaction;
    }
}

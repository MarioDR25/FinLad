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
}

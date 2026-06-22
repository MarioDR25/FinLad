using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using FinLad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class TransactionService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    
    public async Task<IReadOnlyCollection<TransactionDto>>GetByUserIdAsync(Guid userId, int? year = null)
    {
        var query = _context.Transactions
            .AsNoTracking()
            .Where(t => t.UserId == userId);

        if (year.HasValue)
            query = query.Where(t => t.Date.Year == year.Value);

        return await query
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

    public async Task<IReadOnlyCollection<TransactionByMonthDto>> GetMonthlyTransactions(Guid userId, TransactionType type, int? year = null)
    {
        var targetYear = year ?? DateTime.UtcNow.Year;

        var grouped = await _context.Transactions
            .Where(t => t.Type == type && t.UserId == userId && t.Date.Year == targetYear)
            .GroupBy(t => t.Date.Month)
            .Select(g => new { Month = g.Key, Total = g.Sum(t => t.Amount) })
            .ToListAsync();

        var monthNames = System.Globalization.DateTimeFormatInfo.CurrentInfo.MonthNames;
        return [.. grouped.Select(g => new TransactionByMonthDto(monthNames[g.Month - 1], g.Total))];
    }

    public async Task<IReadOnlyCollection<TotalDto>> GetTotalsAsync(Guid userId, int? year = null)
    {
        var targetYear = year ?? DateTime.UtcNow.Year;

        var totals = await _context.Transactions
            .Where(t => t.UserId == userId && t.Date.Year == targetYear)
            .GroupBy(t => t.Type)
            .Select(g => new { Type = g.Key, Total = g.Sum(t => t.Amount) })
            .ToListAsync();

        var income = totals.FirstOrDefault(t => t.Type == TransactionType.Income)?.Total ?? 0;
        var expenses = totals.FirstOrDefault(t => t.Type == TransactionType.Expense)?.Total ?? 0;

        return
        [
            new TotalDto("totalIncome", "Total Income", "fa-money-bill-trend-up fa-rotate-180", income),
            new TotalDto("totalExpenses", "Total Expenses", "fa-money-bill-trend-up", expenses)
        ];
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

        if ((type == TransactionType.Expense || type == TransactionType.Transfer) && wallet.Balance < parsed.Amount)
            throw new InvalidOperationException($"Insufficient balance in {wallet.Name}. Available: {wallet.Balance} PLN");

        transaction.Validate();

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





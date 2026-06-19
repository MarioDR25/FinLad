using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using FinLad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class WalletService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public ICollection<Wallet> CreateDefaultWallets(Guid userId)
    {
        return [.. Enum.GetValues<WalletType>().Select(type => new Wallet
        {
            Name = type.ToString(),
            Type = type,
            Balance = 0.00m,
            UserId = userId,
            Description = type switch
            {
                WalletType.BankAccount => "Capital deposited in traditional checking, savings, or payroll accounts. It represents funds held under standard banking custody for operational management and transfers.",
                WalletType.CreditCard => "Tracks the balance and spending associated with commercial credit lines. It monitors outstanding balances and financial obligations with the issuing institution.",
                WalletType.Cash => "Records physical cash, banknotes, coins, and on-hand capital available immediately for daily liquid use. It actively tracks the flow of paper money managed directly and independently.",
                WalletType.DigitalWallet => "Funds stored in virtual platforms, fintech accounts, and electronic payment gateways. It centralizes capital allocated for digital transactions and web-based operations.",
                _ => string.Empty
            },
            Icon = type switch
            {
                WalletType.BankAccount => "fa-building-columns",
                WalletType.CreditCard => "fa-credit-card",
                WalletType.Cash => "fa-coins",
                WalletType.DigitalWallet => "fa-mobile-screen",
                _ => string.Empty
            },
            Tag = type switch
            {
                WalletType.BankAccount => "MAIN",
                WalletType.CreditCard => "CREDIT",
                WalletType.Cash => "DAILY",
                WalletType.DigitalWallet => "DIGITAL",
                _ => string.Empty
            }
        })];
    }


    public async Task<IEnumerable<WalletDto>> GetAllWalletsAsync(Guid userId)
    {
        return await _context.Wallets.Where(w => w.UserId == userId)
                        .Select(w => new WalletDto(
                                w.Id,
                                w.Name,
                                w.Tag,
                                w.Icon,
                                w.Description ?? string.Empty,
                                w.Balance
                            )
                        ).ToListAsync();
    }
}

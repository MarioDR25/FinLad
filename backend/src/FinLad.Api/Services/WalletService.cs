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
                WalletType.BankAccount => "Main bank account",
                WalletType.CreditCard => "Credit card tracking",
                WalletType.Cash => "Physical cash",
                WalletType.DigitalWallet => "Digital platforms",
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

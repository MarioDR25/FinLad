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
        return
        [
            new(){ Name = "Bank Account", Type = WalletType.BankAccount, Balance = 0.00m, UserId = userId, Description = "Main bank account", Icon = "fa-building-columns",  Tag = "MAIN" },
            new(){ Name = "Credit Card", Type = WalletType.CreditCard, Balance = 0.00m, UserId = userId, Description = "Credit card tracking", Icon = "fa-credit-card", Tag = "CREDIT"},
            new(){ Name = "Cash", Type = WalletType.Cash, Balance = 0.00m, UserId = userId, Description = "Physical cash", Icon = "fa-coins",  Tag = "DAILY" },
            new(){ Name = "Digital Wallet", Type = WalletType.DigitalWallet, Balance = 0.00m, UserId = userId, Description = "Digital platforms", Icon = "fa-mobile-screen", Tag = "DIGITAL"}
        ];
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



using Finlad.Domain.Enums;

namespace Finlad.Domain.Entities;

public class Wallet : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Balance { get; set; }
    public string? Icon { get; set; }
    public string? Tag { get; set; }
    public WalletType Type { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<Transaction> Transactions { get; set; } = [];
}
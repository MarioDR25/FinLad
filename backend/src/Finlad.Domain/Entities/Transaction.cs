namespace Finlad.Domain.Entities;

public class Transaction : BaseEntity
{
    public DateTime Date { get; set; }
    public required string Type { get; set; } 
    public decimal Amount { get; set; }
    public required string Description { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid WalletId { get; set; }
    public Wallet Wallet { get; set; } = null!;
}



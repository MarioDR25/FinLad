using Finlad.Domain.Enums;

namespace Finlad.Domain.Entities;

public class Transaction : BaseEntity
{
    public DateTime Date { get; set; }
    public TransactionType Type { get; set; }
    public decimal Amount { get; set; }
    public required string Description { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid WalletId { get; set; }
    public Wallet Wallet { get; set; } = null!;
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public void Validate()
    {
        if (Amount <= 0)
            throw new InvalidOperationException("Amount must be greater than zero.");

        if (string.IsNullOrWhiteSpace(Description))
            throw new InvalidOperationException("Description is required.");

        if (UserId == Guid.Empty)
            throw new InvalidOperationException("UserId is required.");

        if (WalletId == Guid.Empty)
            throw new InvalidOperationException("WalletId is required.");

        if (CategoryId == Guid.Empty)
            throw new InvalidOperationException("CategoryId is required.");
    }
}

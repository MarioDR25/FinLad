namespace Finlad.Domain.Entities;

public class User : BaseEntity
{
    public required string FirstName { get; set; }
    public string? LastName { get; set; }
    public required string Email { get; set; }
    public string? PasswordHash { get; set; }

    public ICollection<Wallet> Wallets { get; set; } = [];
    public ICollection<Transaction> Transactions { get; set; } = [];

}
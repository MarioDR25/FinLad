namespace Finlad.Domain.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }
    public string? Icon { get; set; }
    public ICollection<Transaction> Transactions { get; set; } = [];
}
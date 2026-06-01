namespace Finlad.Domain.Entities;

public class User : BaseEntity
{
    public required string FirstName { get; set; }
    public string? LastName { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash {get; set; } = string.Empty; 
}



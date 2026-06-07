namespace FinLad.Api.Models;

public record WalletDto(
    Guid Id,
    string Name,
    string? Tag,
    string? Icon,
    string Description,
    decimal Balance
);



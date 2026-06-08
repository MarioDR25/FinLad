namespace FinLad.Api.Models;

public record AiTransactionRequest(string UserInput);

public record ParsedTransaction(
    decimal Amount,
    string Type,
    string Category,
    string Wallet,
    string Description,
    DateTime? Date,
    string? Error
)
{
    public bool IsValid => Error == null;
}

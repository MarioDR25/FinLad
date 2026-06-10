namespace FinLad.Api.Models;

public record AiTransactionRequest(string DataInput);

public record ParsedTransaction(
    decimal Amount,
    string Type,
    string Category,
    string Wallet,
    string Description,
    DateTime? Date,
    string? Error,
    string? ToWallet = null
)
{
    public bool IsValid => string.IsNullOrWhiteSpace(Error)
        && Amount > 0
        && !string.IsNullOrWhiteSpace(Type)
        && !string.IsNullOrWhiteSpace(Category)
        && !string.IsNullOrWhiteSpace(Wallet)
        && !string.IsNullOrWhiteSpace(Description)
        && (Type != "Transfer" || !string.IsNullOrWhiteSpace(ToWallet));
}

public record TransactionDto(
    Guid Id,
    decimal Amount,
    string Type,
    string Category,
    string Wallet,
    string Description,
    DateTime Date
);


public record TransactionByMonthDto( string Month, decimal Amount );

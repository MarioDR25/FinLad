using Finlad.Domain.Entities;
using Finlad.Domain.Enums;

namespace UnitTests;

public class TransactionTests
{
    [Fact]
    public void Validate_ValidTransaction_DoesNotThrow()
    {
        var tx = new Transaction
        {
            Amount = 100,
            Description = "Test",
            UserId = Guid.NewGuid(),
            WalletId = Guid.NewGuid(),
            CategoryId = Guid.NewGuid()
        };

        var exception = Record.Exception(() => tx.Validate());
        Assert.Null(exception);
    }

    [Fact]
    public void Validate_AmountZero_Throws()
    {
        var tx = new Transaction
        {
            Amount = 0,
            Description = "Test",
            UserId = Guid.NewGuid(),
            WalletId = Guid.NewGuid(),
            CategoryId = Guid.NewGuid()
        };

        var ex = Assert.Throws<InvalidOperationException>(() => tx.Validate());
        Assert.Contains("Amount", ex.Message);
    }

    [Fact]
    public void Validate_AmountNegative_Throws()
    {
        var tx = new Transaction
        {
            Amount = -50,
            Description = "Test",
            UserId = Guid.NewGuid(),
            WalletId = Guid.NewGuid(),
            CategoryId = Guid.NewGuid()
        };

        var ex = Assert.Throws<InvalidOperationException>(() => tx.Validate());
        Assert.Contains("Amount", ex.Message);
    }

    [Fact]
    public void Validate_EmptyDescription_Throws()
    {
        var tx = new Transaction
        {
            Amount = 100,
            Description = "",
            UserId = Guid.NewGuid(),
            WalletId = Guid.NewGuid(),
            CategoryId = Guid.NewGuid()
        };

        var ex = Assert.Throws<InvalidOperationException>(() => tx.Validate());
        Assert.Contains("Description", ex.Message);
    }

    [Fact]
    public void Validate_EmptyUserId_Throws()
    {
        var tx = new Transaction
        {
            Amount = 100,
            Description = "Test",
            UserId = Guid.Empty,
            WalletId = Guid.NewGuid(),
            CategoryId = Guid.NewGuid()
        };

        var ex = Assert.Throws<InvalidOperationException>(() => tx.Validate());
        Assert.Contains("UserId", ex.Message);
    }

    [Fact]
    public void Validate_EmptyWalletId_Throws()
    {
        var tx = new Transaction
        {
            Amount = 100,
            Description = "Test",
            UserId = Guid.NewGuid(),
            WalletId = Guid.Empty,
            CategoryId = Guid.NewGuid()
        };

        var ex = Assert.Throws<InvalidOperationException>(() => tx.Validate());
        Assert.Contains("WalletId", ex.Message);
    }

    [Fact]
    public void Validate_EmptyCategoryId_Throws()
    {
        var tx = new Transaction
        {
            Amount = 100,
            Description = "Test",
            UserId = Guid.NewGuid(),
            WalletId = Guid.NewGuid(),
            CategoryId = Guid.Empty
        };

        var ex = Assert.Throws<InvalidOperationException>(() => tx.Validate());
        Assert.Contains("CategoryId", ex.Message);
    }
}

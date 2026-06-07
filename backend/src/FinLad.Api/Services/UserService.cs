using Finlad.Api.Models;
using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class UserService(AppDbContext context, TokenService tokenService)
{
    private readonly AppDbContext _context = context;
    private readonly TokenService _tokenService = tokenService;

    public async Task<string> RegisterAsync(RegisterDto userRegister)
    {
        bool emailExists = await _context.Users.AnyAsync(u => u.Email == userRegister.Email);

        if (emailExists) return "This email address is already registered.";

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var userId = Guid.NewGuid();

            User user = new()
            {
                Id = userId,
                FirstName = userRegister.FirstName,
                LastName = userRegister.LastName,
                Email = userRegister.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegister.Password),
                CreatedAt = DateTime.UtcNow,
                Wallets = CreateDefaultWallets(userId)

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            var token = _tokenService.GenerateToken(user);


            return $"User {userRegister.FirstName} has been registered successfully";
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return $"Error: {ex.Message}";
        }
    }


    public async Task<AuthResponseDto> LoginAsync(LoginDto userLogin)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userLogin.Email);
        if (user == null)
            return new AuthResponseDto("Invalid email or password.", false);

        if (!BCrypt.Net.BCrypt.Verify(userLogin.Password, user.PasswordHash))
            return new AuthResponseDto("Invalid email or password.", false);

        var token = _tokenService.GenerateToken(user);

        return new AuthResponseDto(
            Message: "Login successful",
            Success: true,
            Token: token,
            Name: $"{user.FirstName}  {user.LastName}"
        );
    }


    public static ICollection<Wallet> CreateDefaultWallets(Guid userId)
    {
        return
        [
            new() { Name = "Bank Account", Type = WalletType.BankAccount, Balance = 0, UserId = userId },
                new() { Name = "Credit Card", Type = WalletType.CreditCard, Balance = 0, UserId = userId },
                new() { Name = "Cash", Type = WalletType.Cash, Balance = 0, UserId = userId },
                new() { Name = "Digital Wallet", Type = WalletType.DigitalWallet, Balance = 0, UserId = userId }
        ];
    }
}



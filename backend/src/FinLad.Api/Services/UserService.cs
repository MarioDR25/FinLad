using Finlad.Api.Models;
using Finlad.Domain.Entities;
using Finlad.Domain.Enums;
using FinLad.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class UserService(AppDbContext context, WalletService walletService, TokenService tokenService)
{
    private readonly AppDbContext _context = context;
    private readonly WalletService _walletService = walletService;
    private readonly TokenService _tokenService = tokenService;

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto userRegister)
    {
        bool emailExists = await _context.Users.AnyAsync(u => u.Email == userRegister.Email);

        if (emailExists) return new AuthResponseDto("This email address is already registered.", false);

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
                Wallets = _walletService.CreateDefaultWallets(userId)

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            var token = _tokenService.GenerateToken(user);

            return new AuthResponseDto(
                Message: "has been registered successfully",
                Success: true,
                Token: token,
                Name: $"{user.FirstName}  {user.LastName}"
            );
        }
            
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return new AuthResponseDto($"Error:{ex.Message}", false);
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
}



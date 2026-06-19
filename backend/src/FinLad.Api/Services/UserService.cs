using System.Net.Http.Json;
using System.Text.Json;
using Finlad.Api.Models;
using Finlad.Domain.Entities;
using FinLad.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class UserService(AppDbContext context, WalletService walletService, TokenService tokenService, HttpClient http)
{
    private readonly AppDbContext _context = context;
    private readonly WalletService _walletService = walletService;
    private readonly TokenService _tokenService = tokenService;
    private readonly HttpClient _http = http;

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto userRegister)
    {
        bool emailExists = await _context.Users.AnyAsync(u => u.Email == userRegister.Email);
        if (emailExists) return new AuthResponseDto("This email address is already registered.", false);

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var user = CreateUser(userRegister.Email, userRegister.FirstName, userRegister.LastName, BCrypt.Net.BCrypt.HashPassword(userRegister.Password));
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            var token = _tokenService.GenerateToken(user);
            return new AuthResponseDto("Registration successful", true, token, $"{user.FirstName} {user.LastName}");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return new AuthResponseDto($"Error: {ex.Message}", false);
        }
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto userLogin)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userLogin.Email);
        if (user == null || string.IsNullOrEmpty(user.PasswordHash))
            return new AuthResponseDto("Invalid email or password.", false);

        if (!BCrypt.Net.BCrypt.Verify(userLogin.Password, user.PasswordHash))
            return new AuthResponseDto("Invalid email or password.", false);

        var token = _tokenService.GenerateToken(user);
        return new AuthResponseDto("Login successful", true, token, $"{user.FirstName} {user.LastName}");
    }

    public async Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginDto dto)
    {
        var response = await _http.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={dto.IdToken}");

        if (!response.IsSuccessStatusCode)
            return new AuthResponseDto("Invalid Google token.", false);

        var payload = await response.Content.ReadFromJsonAsync<JsonElement>();
        var email = payload.GetProperty("email").GetString()!;
        var firstName = payload.GetProperty("given_name").GetString()!;
        var lastName = payload.TryGetProperty("family_name", out var ln) ? ln.GetString() : null;

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            user = CreateUser(email, firstName, lastName, null);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        var token = _tokenService.GenerateToken(user);
        return new AuthResponseDto("Google login successful", true, token, $"{user.FirstName} {user.LastName}");
    }

    private User CreateUser(string email, string firstName, string? lastName, string? passwordHash)
    {
        var userId = Guid.NewGuid();
        return new User
        {
            Id = userId,
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow,
            Wallets = _walletService.CreateDefaultWallets(userId)
        };
    }
}

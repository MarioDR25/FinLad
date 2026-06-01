using Finlad.Api.Models;
using Finlad.Domain.Entities;
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

        try
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                FirstName = userRegister.FirstName,
                LastName = userRegister.LastName,
                Email = userRegister.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegister.PasswordHash),
                CreatedAt = DateTime.UtcNow

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateToken(user);


            return $"User {userRegister.FirstName} has been registered successfully";
        }
        catch (Exception ex)
        {
            return $"Error: {ex.Message}";
        }
    }
}



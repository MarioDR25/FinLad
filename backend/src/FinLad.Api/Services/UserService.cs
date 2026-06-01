using Finlad.Api.Models;
using Finlad.Domain.Entities;
using FinLad.Api.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FinLad.Api.Services;

public class UserService(AppDbContext context, TokenService tokenService, IPasswordHasher<User> passwordHasher)
{
    private readonly AppDbContext _context = context;
    private readonly TokenService _tokenService = tokenService;
    private readonly IPasswordHasher<User> _passwordHasher = passwordHasher;

    public async Task<AuthResponseDto> LoginAsync(LoginDto userLogin)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userLogin.Email);
        if (user == null)
            return new AuthResponseDto("User not found", false);
        
        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, userLogin.Password);
        if (result != PasswordVerificationResult.Success)
            return new AuthResponseDto("Incorrect user credentials", false);

        var token = _tokenService.GenerateToken(user);

        return new AuthResponseDto(
            Message: "Login successful",
            Success: true,
            Token: token,
            Name: user.FirstName + user.LastName
        );
    }
}

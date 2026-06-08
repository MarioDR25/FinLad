using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Finlad.Domain.Entities;
using FinLad.Api.configurations;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FinLad.Api.Services;

public class TokenService(IOptions<JwtSettings> jwtOptions)
{
    private readonly JwtSettings _jwtSettings = jwtOptions.Value; 

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtSettings.Key));

        int duration = _jwtSettings.DurationInMinutes;

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.GivenName, user.FirstName)
        };

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(duration),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}
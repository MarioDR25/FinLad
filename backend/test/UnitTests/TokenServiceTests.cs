using System.Security.Claims;
using Finlad.Domain.Entities;
using FinLad.Api.configurations;
using FinLad.Api.Services;
using Microsoft.Extensions.Options;

namespace UnitTests;

public class TokenServiceTests
{
    [Fact]
    public void GenerateToken_ReturnsValidJwtWithCorrectClaims()
    {
        var jwtSettings = new JwtSettings
        {
            Key = "this-is-a-secret-key-for-testing-puroposes!",
            Issuer = "TestIssuer",
            Audience = "TestAudience",
            DurationInMinutes = 60
        };
        var options = Options.Create(jwtSettings);
        var service = new TokenService(options);

        var user = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            FirstName = "Mario",
            Email = "mario@test.com",
            PasswordHash = "hashed"
        };

        // Act: ejecuta el metodo
        string token = service.GenerateToken(user);

        // Assert: verifica que el token no este vacio
        Assert.False(string.IsNullOrEmpty(token));

        // Lee el token generado para validar claims
        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);

        Assert.Equal("TestIssuer", jwt.Issuer);
        Assert.Contains(jwt.Audiences, a => a == "TestAudience");
        Assert.Contains(jwt.Claims, c =>
            c.Type == ClaimTypes.Email && c.Value == "mario@test.com");
        Assert.Contains(jwt.Claims, c =>
            c.Type == ClaimTypes.NameIdentifier && c.Value == "11111111-1111-1111-1111-111111111111");
    }
}

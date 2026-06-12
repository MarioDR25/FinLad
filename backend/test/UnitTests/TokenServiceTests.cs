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

        string token = service.GenerateToken(user);

        Assert.False(string.IsNullOrEmpty(token));

        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);

        Assert.Equal("TestIssuer", jwt.Issuer);
        Assert.Contains(jwt.Audiences, a => a == "TestAudience");
        Assert.Contains(jwt.Claims, c =>
            c.Type == ClaimTypes.Email && c.Value == "mario@test.com");
        Assert.Contains(jwt.Claims, c =>
            c.Type == ClaimTypes.NameIdentifier && c.Value == "11111111-1111-1111-1111-111111111111");
    }

    [Fact]
    public void GenerateToken_ContainsExpirationClaim()
    {
        var jwtSettings = new JwtSettings
        {
            Key = "this-is-a-secret-key-for-testing-puroposes!",
            Issuer = "TestIssuer",
            Audience = "TestAudience",
            DurationInMinutes = 30
        };
        var options = Options.Create(jwtSettings);
        var service = new TokenService(options);

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "Test",
            Email = "test@test.com",
            PasswordHash = "hashed"
        };

        string token = service.GenerateToken(user);
        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);

        Assert.True(jwt.ValidTo > DateTime.UtcNow);
        Assert.True(jwt.ValidTo <= DateTime.UtcNow.AddMinutes(31));
    }
}

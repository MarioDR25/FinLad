using Finlad.Api.Models;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinLad.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(UserService userService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
    {
        var result = await userService.RegisterAsync(registerDto);
        return Ok(result);
    }
}

using Finlad.Api.Models;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinLad.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(UserService userService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
    {
        var result = await userService.LoginAsync(loginDto);
        return Ok(result);
    }
}

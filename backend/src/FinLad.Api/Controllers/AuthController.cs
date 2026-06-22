using System.Net.Mime;
using Finlad.Api.Models;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinLad.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
public class AuthController(UserService userService) : ControllerBase
{
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
    {
        var result = await userService.RegisterAsync(registerDto);
        if (!result.Success)
            return Conflict(result);
        return Ok(result);
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
    {
        var result = await userService.LoginAsync(loginDto);
        if (!result.Success)
            return Unauthorized(result);
        return Ok(result);
    }

    [HttpPost("google")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResponseDto>> GoogleLogin(GoogleLoginDto dto)
    {
        var result = await userService.GoogleLoginAsync(dto);
        if (!result.Success)
            return BadRequest(result);
        return Ok(result);
    }

    [HttpPost("forgot-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<AuthResponseDto>> ForgotPassword(ForgotPasswordRequest request)
    {
        var result = await userService.ForgotPasswordAsync(request);
        return Ok(result);
    }

    [HttpPost("reset-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResponseDto>> ResetPassword(ResetPasswordRequest request)
    {
        var result = await userService.ResetPasswordAsync(request);
        if (!result.Success)
            return BadRequest(result);
        return Ok(result);
    }
}

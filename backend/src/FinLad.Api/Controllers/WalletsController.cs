using System.Net.Mime;
using System.Security.Claims;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinLad.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
public class WalletsController(WalletService walletService) : ControllerBase
{
    private readonly WalletService _walletService = walletService;
    [HttpGet]
    public async Task<IActionResult> GetWallets()
    {   
        
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var wallets = await _walletService.GetAllWalletsAsync(userId);
        return Ok(wallets);
    }
}

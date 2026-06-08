using System.Net.Mime;
using System.Security.Claims;
using FinLad.Api.Models;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinLad.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[Produces(MediaTypeNames.Application.Json)]
public class TransactionController(AiService aiService, TransactionService transactionService) : ControllerBase
{
    [HttpPost("ai")]
    public async Task<IActionResult> Parse([FromBody] AiTransactionRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var parsed = await aiService.ParseTransactionAsync(request.UserInput);

        if (!parsed.IsValid)
            return BadRequest(new { error = parsed.Error });

        var transaction = await transactionService.CreateFromParsedAsync(parsed, userId);

        return Ok(transaction);
    }
}

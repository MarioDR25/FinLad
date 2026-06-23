using System.Net.Mime;
using System.Security.Claims;
using Finlad.Domain.Enums;
using FinLad.Api.Hubs;
using FinLad.Api.Models;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.SignalR;

namespace FinLad.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[Produces(MediaTypeNames.Application.Json)]
public class TransactionController(AiService aiService, TransactionService transactionService, IHubContext<TransactionHub> hubContext) : ControllerBase
{
    private readonly AiService _aiService = aiService;
    private readonly TransactionService _transactionService = transactionService;
    private readonly IHubContext<TransactionHub> _hubContext = hubContext;


    [HttpGet]
    public async Task<IActionResult> GetTransactions([FromQuery] int? year)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var transactions = await _transactionService.GetByUserIdAsync(userId, year);
        return Ok(transactions);
    }



    [HttpPost("ai")]
    [EnableRateLimiting("ai")]
    public async Task<IActionResult> Parse([FromBody] AiTransactionRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var parsed = await _aiService.ParseTransactionAsync(request.DataInput);

        if (!parsed.IsValid)
            return BadRequest(new { error = parsed.Error ?? "Could not understand the transaction. Try being more specific." });

        try
        {
            var dto = await _transactionService.CreateFromParsedAsync(parsed, userId);
            await _hubContext.Clients.All.SendAsync("TransactionCreated", dto);
            return Ok(dto);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("totals")]
    public async Task<IActionResult> GetTotals([FromQuery] int? year)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _transactionService.GetTotalsAsync(userId, year);
        return Ok(result);
    }

    [HttpGet("monthly")]
    public async Task<IActionResult> GetMonthly([FromQuery] TransactionType type, [FromQuery] int? year)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _transactionService.GetMonthlyTransactions(userId, type, year);
        return Ok(result);
    }

}

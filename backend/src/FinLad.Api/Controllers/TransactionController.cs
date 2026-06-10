using System.Net.Mime;
using System.Security.Claims;
using FinLad.Api.Hubs;
using FinLad.Api.Models;
using FinLad.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> GetTransactions()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var transactions = await _transactionService.GetByUserIdAsync(userId);
        return Ok(transactions);
    }



    [HttpPost("ai")]
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


    [HttpGet("by-category")]
    public async Task<IActionResult> GetByCategory()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _transactionService.GetExpensesByCategoryAsync(userId);
        return Ok(result);
    }

    [HttpGet("monthly")]
    public async Task<IActionResult> GetMonthly([FromQuery] string type, [FromQuery] int? year)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _transactionService.GetMonthlyTransactions(userId, type, year);
        return Ok(result);
    }


}

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
public class CategoryController(CategoryService categoryService) : ControllerBase
{
    [HttpGet("expenses")]
    public async Task<IActionResult> GetExpenses([FromQuery] int? year)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await categoryService.GetExpensesByCategoryAsync(userId, year);
        return Ok(result);
    }
}

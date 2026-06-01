using System.ComponentModel.DataAnnotations;

namespace Finlad.Api.Models;

public record LoginDto(
        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        string Email,

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
        string Password
);

public record AuthResponseDto(
    string Message,
    bool Success,
    string? Token = null,
    string? Name = null
);

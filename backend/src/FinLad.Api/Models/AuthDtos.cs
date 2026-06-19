using System.ComponentModel.DataAnnotations;

namespace Finlad.Api.Models;

public record RegisterDto(
        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "First name must be between 2 and 50 characters.")]
        string FirstName,

        [StringLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        string? LastName,

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        string Email,

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
        string Password
);

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

public record GoogleLoginDto(string IdToken);

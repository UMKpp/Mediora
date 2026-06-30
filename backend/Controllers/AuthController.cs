using Mediora.Api.Data;
using Mediora.Api.DTOs;
using Mediora.Api.Helpers;
using Mediora.Api.Models;
using Mediora.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly MedioraDbContext _dbContext;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthController(MedioraDbContext dbContext, IJwtTokenService jwtTokenService)
    {
        _dbContext = dbContext;
        _jwtTokenService = jwtTokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) ||
            string.IsNullOrWhiteSpace(request.Username) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new ApiError("Full name, username, email, and password are required."));
        }

        var normalizedEmail = request.Email.Trim().ToLower();
        var normalizedUsername = request.Username.Trim().ToLower();

        if (await _dbContext.Users.AnyAsync(user => user.Email.ToLower() == normalizedEmail))
        {
            return Conflict(new ApiError("Email is already registered."));
        }

        if (await _dbContext.Users.AnyAsync(user => user.Username.ToLower() == normalizedUsername))
        {
            return Conflict(new ApiError("Username is already registered."));
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Username = request.Username.Trim(),
            Email = request.Email.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "User",
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return Ok(new { message = "Registration successful." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Identifier) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new ApiError("Username/email and password are required."));
        }

        var identifier = request.Identifier.Trim().ToLower();
        var user = await _dbContext.Users.FirstOrDefaultAsync(account =>
            account.Email.ToLower() == identifier || account.Username.ToLower() == identifier);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized(new ApiError("Invalid username/email or password."));
        }

        var token = _jwtTokenService.GenerateToken(user);
        return Ok(new AuthResponse(
            token,
            new AuthUserDto(user.Id, user.FullName, user.Username, user.Email, user.Role)));
    }
}

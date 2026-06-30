namespace Mediora.Api.DTOs;

public record RegisterRequest(
    string FullName,
    string Username,
    string Email,
    string Password);

public record LoginRequest(
    string Identifier,
    string Password);

public record AuthUserDto(
    int Id,
    string FullName,
    string Username,
    string Email,
    string Role);

public record AuthResponse(
    string Token,
    AuthUserDto User);

namespace Mediora.Api.DTOs;

public record EmergencyServiceCreateDto(
    string ServiceName,
    string Hotline,
    string ServiceType,
    string Description,
    string? Email,
    bool IsUrgent);

namespace Mediora.Api.DTOs;

public record PharmacyCreateDto(
    string Name,
    string Province,
    string District,
    string City,
    string Address,
    string Phone,
    string OpeningHours,
    bool IsOpenNow,
    bool Is24Hours,
    bool HomeDelivery,
    decimal Rating);

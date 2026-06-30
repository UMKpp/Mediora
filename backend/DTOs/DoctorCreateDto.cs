namespace Mediora.Api.DTOs;

public record DoctorCreateDto(
    string Name,
    string Specialization,
    string Province,
    string District,
    string City,
    string Hospital,
    string Symptoms,
    string Experience,
    decimal Rating,
    string Availability,
    string Phone,
    string ConsultationHours,
    string Languages);

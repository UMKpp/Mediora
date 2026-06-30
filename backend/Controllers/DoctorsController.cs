using Mediora.Api.Data;
using Mediora.Api.DTOs;
using Mediora.Api.Helpers;
using Mediora.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Controllers;

[ApiController]
[Route("api/doctors")]
public class DoctorsController : ControllerBase
{
    private readonly MedioraDbContext _dbContext;

    public DoctorsController(MedioraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
    {
        return Ok(await _dbContext.Doctors.AsNoTracking().ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Doctor>> GetDoctor(int id)
    {
        var doctor = await _dbContext.Doctors.FindAsync(id);
        return doctor is null ? NotFound(new ApiError("Doctor not found.")) : Ok(doctor);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Doctor>> CreateDoctor(DoctorCreateDto dto)
    {
        var doctor = new Doctor
        {
            Name = dto.Name,
            Specialization = dto.Specialization,
            Province = dto.Province,
            District = dto.District,
            City = dto.City,
            Hospital = dto.Hospital,
            Symptoms = dto.Symptoms,
            Experience = dto.Experience,
            Rating = dto.Rating,
            Availability = dto.Availability,
            Phone = dto.Phone,
            ConsultationHours = dto.ConsultationHours,
            Languages = dto.Languages
        };

        _dbContext.Doctors.Add(doctor);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateDoctor(int id, DoctorCreateDto dto)
    {
        var doctor = await _dbContext.Doctors.FindAsync(id);
        if (doctor is null) return NotFound(new ApiError("Doctor not found."));

        doctor.Name = dto.Name;
        doctor.Specialization = dto.Specialization;
        doctor.Province = dto.Province;
        doctor.District = dto.District;
        doctor.City = dto.City;
        doctor.Hospital = dto.Hospital;
        doctor.Symptoms = dto.Symptoms;
        doctor.Experience = dto.Experience;
        doctor.Rating = dto.Rating;
        doctor.Availability = dto.Availability;
        doctor.Phone = dto.Phone;
        doctor.ConsultationHours = dto.ConsultationHours;
        doctor.Languages = dto.Languages;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDoctor(int id)
    {
        var doctor = await _dbContext.Doctors.FindAsync(id);
        if (doctor is null) return NotFound(new ApiError("Doctor not found."));

        _dbContext.Doctors.Remove(doctor);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}

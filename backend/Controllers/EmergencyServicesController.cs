using Mediora.Api.Data;
using Mediora.Api.DTOs;
using Mediora.Api.Helpers;
using Mediora.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Controllers;

[ApiController]
[Route("api/emergency-services")]
public class EmergencyServicesController : ControllerBase
{
    private readonly MedioraDbContext _dbContext;

    public EmergencyServicesController(MedioraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmergencyService>>> GetEmergencyServices()
    {
        return Ok(await _dbContext.EmergencyServices.AsNoTracking().ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmergencyService>> GetEmergencyService(int id)
    {
        var service = await _dbContext.EmergencyServices.FindAsync(id);
        return service is null ? NotFound(new ApiError("Emergency service not found.")) : Ok(service);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<EmergencyService>> CreateEmergencyService(EmergencyServiceCreateDto dto)
    {
        var service = new EmergencyService
        {
            ServiceName = dto.ServiceName,
            Hotline = dto.Hotline,
            ServiceType = dto.ServiceType,
            Description = dto.Description,
            Email = dto.Email,
            IsUrgent = dto.IsUrgent
        };

        _dbContext.EmergencyServices.Add(service);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEmergencyService), new { id = service.Id }, service);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateEmergencyService(int id, EmergencyServiceCreateDto dto)
    {
        var service = await _dbContext.EmergencyServices.FindAsync(id);
        if (service is null) return NotFound(new ApiError("Emergency service not found."));

        service.ServiceName = dto.ServiceName;
        service.Hotline = dto.Hotline;
        service.ServiceType = dto.ServiceType;
        service.Description = dto.Description;
        service.Email = dto.Email;
        service.IsUrgent = dto.IsUrgent;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteEmergencyService(int id)
    {
        var service = await _dbContext.EmergencyServices.FindAsync(id);
        if (service is null) return NotFound(new ApiError("Emergency service not found."));

        _dbContext.EmergencyServices.Remove(service);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}

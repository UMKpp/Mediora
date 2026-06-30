using Mediora.Api.Data;
using Mediora.Api.DTOs;
using Mediora.Api.Helpers;
using Mediora.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Controllers;

[ApiController]
[Route("api/pharmacies")]
public class PharmaciesController : ControllerBase
{
    private readonly MedioraDbContext _dbContext;

    public PharmaciesController(MedioraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pharmacy>>> GetPharmacies()
    {
        return Ok(await _dbContext.Pharmacies.AsNoTracking().ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Pharmacy>> GetPharmacy(int id)
    {
        var pharmacy = await _dbContext.Pharmacies.FindAsync(id);
        return pharmacy is null ? NotFound(new ApiError("Pharmacy not found.")) : Ok(pharmacy);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Pharmacy>> CreatePharmacy(PharmacyCreateDto dto)
    {
        var pharmacy = new Pharmacy
        {
            Name = dto.Name,
            Province = dto.Province,
            District = dto.District,
            City = dto.City,
            Address = dto.Address,
            Phone = dto.Phone,
            OpeningHours = dto.OpeningHours,
            IsOpenNow = dto.IsOpenNow,
            Is24Hours = dto.Is24Hours,
            HomeDelivery = dto.HomeDelivery,
            Rating = dto.Rating
        };

        _dbContext.Pharmacies.Add(pharmacy);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPharmacy), new { id = pharmacy.Id }, pharmacy);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdatePharmacy(int id, PharmacyCreateDto dto)
    {
        var pharmacy = await _dbContext.Pharmacies.FindAsync(id);
        if (pharmacy is null) return NotFound(new ApiError("Pharmacy not found."));

        pharmacy.Name = dto.Name;
        pharmacy.Province = dto.Province;
        pharmacy.District = dto.District;
        pharmacy.City = dto.City;
        pharmacy.Address = dto.Address;
        pharmacy.Phone = dto.Phone;
        pharmacy.OpeningHours = dto.OpeningHours;
        pharmacy.IsOpenNow = dto.IsOpenNow;
        pharmacy.Is24Hours = dto.Is24Hours;
        pharmacy.HomeDelivery = dto.HomeDelivery;
        pharmacy.Rating = dto.Rating;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletePharmacy(int id)
    {
        var pharmacy = await _dbContext.Pharmacies.FindAsync(id);
        if (pharmacy is null) return NotFound(new ApiError("Pharmacy not found."));

        _dbContext.Pharmacies.Remove(pharmacy);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}

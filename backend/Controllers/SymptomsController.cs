using Mediora.Api.Data;
using Mediora.Api.DTOs;
using Mediora.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Controllers;

[ApiController]
[Route("api/symptoms")]
public class SymptomsController : ControllerBase
{
    private readonly MedioraDbContext _dbContext;

    public SymptomsController(MedioraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Symptom>>> GetSymptoms()
    {
        return Ok(await _dbContext.Symptoms.AsNoTracking().ToListAsync());
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Symptom>> CreateSymptom(SymptomCreateDto dto)
    {
        var symptom = new Symptom
        {
            Name = dto.Name,
            Category = dto.Category
        };

        _dbContext.Symptoms.Add(symptom);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSymptoms), new { id = symptom.Id }, symptom);
    }
}

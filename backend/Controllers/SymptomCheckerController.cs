using Mediora.Api.Data;
using Mediora.Api.DTOs;
using Mediora.Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Controllers;

[ApiController]
[Route("api/symptom-checker")]
public class SymptomCheckerController : ControllerBase
{
    private readonly MedioraDbContext _dbContext;

    public SymptomCheckerController(MedioraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> Analyze(SymptomAnalyzeRequest request)
    {
        var symptomIds = request.SymptomIds?.Where(id => id > 0).ToHashSet() ?? new HashSet<int>();
        var symptomNames = request.SymptomNames?
            .Where(name => !string.IsNullOrWhiteSpace(name))
            .Select(name => name.Trim().ToLower())
            .ToHashSet() ?? new HashSet<string>();

        if (symptomIds.Count == 0 && symptomNames.Count == 0)
        {
            return BadRequest(new ApiError("At least one symptom ID or symptom name is required."));
        }

        if (symptomNames.Count > 0)
        {
            var matchedIds = await _dbContext.Symptoms
                .Where(symptom => symptomNames.Contains(symptom.Name.ToLower()))
                .Select(symptom => symptom.Id)
                .ToListAsync();

            foreach (var id in matchedIds)
            {
                symptomIds.Add(id);
            }
        }

        if (symptomIds.Count == 0)
        {
            return Ok(Array.Empty<SymptomAnalyzeResult>());
        }

        var conditions = await _dbContext.Conditions
            .Include(condition => condition.ConditionSymptoms)
            .AsNoTracking()
            .ToListAsync();

        var results = conditions
            .Select(condition =>
            {
                var conditionSymptomIds = condition.ConditionSymptoms.Select(mapping => mapping.SymptomId).ToList();
                var matchedCount = conditionSymptomIds.Count(symptomIds.Contains);
                var score = conditionSymptomIds.Count == 0 ? 0 : (double)matchedCount / conditionSymptomIds.Count;

                return new SymptomAnalyzeResult(
                    condition.Id,
                    condition.Name,
                    condition.RiskLevel,
                    condition.Recommendation,
                    matchedCount,
                    Math.Round(score, 2));
            })
            .Where(result => result.MatchedSymptoms > 0)
            .OrderByDescending(result => result.MatchScore)
            .ThenByDescending(result => result.MatchedSymptoms)
            .ToList();

        return Ok(results);
    }
}

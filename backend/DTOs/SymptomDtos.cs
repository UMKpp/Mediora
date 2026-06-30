namespace Mediora.Api.DTOs;

public record SymptomCreateDto(
    string Name,
    string Category);

public record SymptomAnalyzeRequest(
    List<int>? SymptomIds,
    List<string>? SymptomNames);

public record SymptomAnalyzeResult(
    int ConditionId,
    string ConditionName,
    string RiskLevel,
    string Recommendation,
    int MatchedSymptoms,
    double MatchScore);

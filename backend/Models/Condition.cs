namespace Mediora.Api.Models;

public class Condition
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string RiskLevel { get; set; } = string.Empty;
    public string Recommendation { get; set; } = string.Empty;
    public ICollection<ConditionSymptom> ConditionSymptoms { get; set; } = new List<ConditionSymptom>();
}

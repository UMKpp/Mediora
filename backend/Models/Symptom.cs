namespace Mediora.Api.Models;

public class Symptom
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public ICollection<ConditionSymptom> ConditionSymptoms { get; set; } = new List<ConditionSymptom>();
}

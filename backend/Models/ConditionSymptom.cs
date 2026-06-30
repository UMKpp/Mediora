namespace Mediora.Api.Models;

public class ConditionSymptom
{
    public int Id { get; set; }
    public int ConditionId { get; set; }
    public Condition? Condition { get; set; }
    public int SymptomId { get; set; }
    public Symptom? Symptom { get; set; }
}

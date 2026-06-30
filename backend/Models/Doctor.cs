namespace Mediora.Api.Models;

public class Doctor
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public string Province { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Hospital { get; set; } = string.Empty;
    public string Symptoms { get; set; } = string.Empty;
    public string Experience { get; set; } = string.Empty;
    public decimal Rating { get; set; }
    public string Availability { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string ConsultationHours { get; set; } = string.Empty;
    public string Languages { get; set; } = string.Empty;
}

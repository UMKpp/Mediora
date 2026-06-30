namespace Mediora.Api.Models;

public class EmergencyService
{
    public int Id { get; set; }
    public string ServiceName { get; set; } = string.Empty;
    public string Hotline { get; set; } = string.Empty;
    public string ServiceType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Email { get; set; }
    public bool IsUrgent { get; set; }
}

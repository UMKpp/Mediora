namespace Mediora.Api.Models;

public class Pharmacy
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Province { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string OpeningHours { get; set; } = string.Empty;
    public bool IsOpenNow { get; set; }
    public bool Is24Hours { get; set; }
    public bool HomeDelivery { get; set; }
    public decimal Rating { get; set; }
}

namespace FinLad.Api.configurations;

public class AiSettings
{
    public const string SectionName = "AiSettings";
    public string ApiKey { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = string.Empty;
}



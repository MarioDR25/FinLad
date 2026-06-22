namespace FinLad.Api.configurations;

public class EmailSettings
{
    public const string SectionName = "Email";
    public string SmtpHost { get; set; } = "smtp.gmail.com";
    public int SmtpPort { get; set; } = 587;
    public string SenderName { get; set; } = "FinLad";
    public string SenderEmail { get; set; } = string.Empty;
    public string SenderPassword { get; set; } = string.Empty;
}

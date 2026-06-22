using FinLad.Api.configurations;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FinLad.Api.Services;

public class EmailService(IOptions<EmailSettings> emailOptions)
{
    private readonly EmailSettings _settings = emailOptions.Value;

    public async Task SendPasswordResetEmail(string toEmail, string resetToken)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
        message.To.Add(new MailboxAddress("", toEmail));
        message.Subject = "Reset your FinLad password";

        var resetLink = $"http://localhost:4200/auth/reset-password?token={resetToken}";

        message.Body = new TextPart("html")
        {
            Text = $"""
                <h2>Password Reset</h2>
                <p>You requested a password reset. Click the link below to set a new password:</p>
                <p><a href="{resetLink}">Reset Password</a></p>
                <p>This link expires in 1 hour.</p>
                <p>If you didn't request this, ignore this email.</p>
            """
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_settings.SenderEmail, _settings.SenderPassword);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}

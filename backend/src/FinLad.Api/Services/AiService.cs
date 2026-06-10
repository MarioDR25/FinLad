using System.Text;
using System.Text.Json;
using Finlad.Domain.Enums;
using FinLad.Api.configurations;
using FinLad.Api.Models;
using Microsoft.Extensions.Options;

namespace FinLad.Api.Services;

public class AiService(HttpClient http, IOptions<AiSettings> aiOptions)
{
    private readonly AiSettings _aiSettings = aiOptions.Value;
    public async Task<ParsedTransaction> ParseTransactionAsync(string userInput)
    {
        var prompt = BuildPrompt(userInput);

        var requestBody = new
        {
            model = _aiSettings.Model,
            messages = new[]
            {
                new { role = "system", content = "You are a financial transaction parser. Always respond with valid JSON only, no markdown." },
                new { role = "user", content = prompt }
            },
            temperature = 0.1
        };

        var request = new HttpRequestMessage(HttpMethod.Post, _aiSettings.BaseUrl)
        {
            Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
        };
        request.Headers.Add("Authorization", $"Bearer {_aiSettings.ApiKey}");

        var response = await http.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<JsonElement>();
        var content = result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

        Console.WriteLine("=== DEEPSEEK RAW RESPONSE ===");
        Console.WriteLine(content);

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        return JsonSerializer.Deserialize<ParsedTransaction>(content!, options)!;
    }

    private static string BuildPrompt(string userInput)
    {
        var today = DateTime.UtcNow.ToString("yyyy-MM-dd");
        var categories = Enum.GetNames<CategoryType>();
        var types = Enum.GetNames<TransactionType>();
        var wallets = Enum.GetNames<WalletType>();
        var errorExample = """{"amount":0,"type":"","category":"","wallet":"","description":"","date":null,"error":"reason","toWallet":null}""";

        return $"""
            You are a financial transaction parser. Analyze this message and return ONLY a JSON object.
            Pick the best matching value from each list below based on the user's message.

            Today's date is {today}.

            Types: [{string.Join(", ", types)}]
            Categories: [{string.Join(", ", categories)}]
            Wallets: [{string.Join(", ", wallets)}]

            Rules:
            - "type" must be one of the types above. Use Transfer when moving money between wallets (keywords: "transferí", "consigné", "deposité", "retiré", "saqué", "moví", "pasé"). Use Income for receiving money, Expense for spending money
            - "category" must be one of the categories above, pick the closest match
            - "wallet" must be one of the wallets above. For Transfer, this is the SOURCE wallet (where money comes FROM). Use CreditCard for "tarjeta"/"card", BankAccount for "banco"/"cuenta"/"bank", Cash for "efectivo"/"cash", DigitalWallet for "digital"/"app"
            - "toWallet" must be one of the wallets above. Only required for Transfer, this is where money goes TO. Use Cash for "retiré"/"withdraw" if no destination, BankAccount for "deposité"/"consigné" if no destination. Use null for Income/Expense
            - "amount" is always a positive number
            - "description" is a very brief summary (max 3 words). Never include the payment method or wallet name. Example: "almuerzo", "zapatos hijo", "semestre universidad", "uber"
            - "date" (yyyy-MM-dd). If "today"/"hoy" is mentioned, use the date above. If "ayer"/"yesterday", subtract 1 day. If a specific date is mentioned, use that. If no date at all, set to null

            If the message is not a financial transaction, return:
            {errorExample}

            User message: "{userInput}"

            JSON:
            """;
    }
}

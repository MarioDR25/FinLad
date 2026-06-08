using System.Net.Http.Json;
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

        return JsonSerializer.Deserialize<ParsedTransaction>(content!)!;
    }

    private static string BuildPrompt(string userInput)
    {
        var categories = Enum.GetNames<CategoryType>();
        var types = Enum.GetNames<TransactionType>();
        var wallets = Enum.GetNames<WalletType>();
        var errorExample = """{"amount":0,"type":"","category":"","wallet":"","description":"","date":null,"error":"reason"}""";

        return $"""
            Parse this financial message into a transaction. Return ONLY a JSON object.

            Available categories: [{string.Join(", ", categories)}]
            Available wallets: [{string.Join(", ", wallets)}]

            Rules:
            - "Type" must be one of: [{string.Join(", ", types)}]
            - "Category" must match one of the available categories exactly, or use the closest match
            - "Wallet" must match one of the available wallets exactly, or use the closest match
            - "Amount" is always a positive number
            - "Description" is a short summary
            - "Date" is optional, use yyyy-MM-dd if mentioned, otherwise null

            If the message does NOT describe a financial transaction, is gibberish, empty, or missing critical information (amount, type), return:
            {errorExample}

            User message: "{userInput}"

            JSON:
            """;
    }
}

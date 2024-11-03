using System;
using System.Net;
using System.Net.Http;
using System.Diagnostics;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using SpotiSync.Models;

namespace SpotiSync.Services;
public class SpotifyService
{
    private readonly string _loginUrl = "http://130.61.91.169:5008/spotify/login";
    private readonly string _tokenUrl = "http://130.61.91.169:5008/spotify/token";
    private readonly string _pollUrl = "http://130.61.91.169:5008/spotify/poll";

    public void OpenSpotifyLogin()
    {
        Process.Start(new ProcessStartInfo
        {
            FileName = _loginUrl,
            UseShellExecute = true // apparently ensures that it opens in default browser
        });
    }

    public async Task<string> WaitForAuthorizationCodeAsync()
    {
        using var httpClient = new HttpClient();

        var response = await httpClient.GetAsync(_pollUrl);
        response.EnsureSuccessStatusCode();
        
        string authCode = await response.Content.ReadAsStringAsync();
        Console.WriteLine("auth: " + authCode);
        return authCode;
    }

    public async Task<TokenResponse> ExchangeCodeForToken(string authorizationCode)
    {
        using var httpClient = new HttpClient();
        var content = JsonContent.Create(new {code = authorizationCode});

        var response = await httpClient.PostAsync(_tokenUrl, content);
        response.EnsureSuccessStatusCode();

        var tokenResponseJson = await response.Content.ReadAsStringAsync();
        var tokenResponse = JsonSerializer.Deserialize<TokenResponse>(tokenResponseJson);
        return tokenResponse;
    }
}

using System.Net;
using System.Net.Http;
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using SpotiSync.Models;

namespace SpotiSync.Services;
public class SpotifyService
{
    private readonly string _loginUrl = "http://130.61.91.169:5008/spotify/login";
    private readonly string _tokenUrl = "http://130.61.91.169:5008/spotify/token";

    public void OpenSpotifyLogin()
    {
        Process.Start(new ProcessStartInfo
        {
            FileName = _loginUrl,
            UseShellExecute = true // apparently ensures that it opens in default browser
        });
    }

    public async Task<string> ListenForSpotifyCallback()
    {
        var listener = new HttpListener();
        listener.Prefixes.Add("http://130.61.91.169:5008/callback/");
        listener.Start();

        var context = await listener.GetContextAsync();
        var query = context.Request.QueryString;
        var authorizationCode = query["code"];  // extract code from query
        
        var response = context.Response;
        var responseString = "<html><body>Login successful! You can close this window.</body></html>";
        var buffer = Encoding.UTF8.GetBytes(responseString);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.OutputStream.Close();

        listener.Stop();
        return authorizationCode;
    }

    public async Task<TokenResponse> ExchangeCodeForToken(string authorizationCode)
    {
        using var httpClient = new HttpClient();
        var content = new StringContent($"{{\"code\": \"{authorizationCode}\"}}", Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(_tokenUrl, content);
        response.EnsureSuccessStatusCode();

        var tokenResponseJson = await response.Content.ReadAsStringAsync();
        var tokenResponse = JsonSerializer.Deserialize<TokenResponse>(tokenResponseJson);
        return tokenResponse;
    }
}

using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;
using System.Text.Json.Serialization;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// make sure enums are serialized correctly
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// select port
builder.WebHost.ConfigureKestrel(options =>
{
	options.ListenAnyIP(5008);
});

var app = builder.Build();

// for testing purposes
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// environment variables
var clientId = Environment.GetEnvironmentVariable("SPOTIFY_CLIENT_ID");
var clientSecret = Environment.GetEnvironmentVariable("SPOTIFY_CLIENT_SECRET");
var redirectUri = "http://130.61.91.169:5008/callback";  // Replace with your server IP or domain

// login (redirects to spotify auth)
app.MapGet("/spotify/login", () =>
{
    var loginRequest = new LoginRequest(new Uri(redirectUri), clientId, LoginRequest.ResponseType.Code)
    {
        Scope = new[] { Scopes.UserReadEmail, Scopes.UserReadPrivate }
    };

    var uri = loginRequest.ToUri();
    return Results.Redirect(uri.ToString());
})
.WithName("SpotifyLogin")
.WithOpenApi();

// exhange code for token
app.MapPost("/spotify/token", async ([FromBody] string code) =>
{
    var config = SpotifyClientConfig.CreateDefault();
    var oauthClient = new OAuthClient(config);

    var tokenRequest = new AuthorizationCodeTokenRequest(clientId, clientSecret, code, new Uri(redirectUri));
    var tokenResponse = await oauthClient.RequestToken(tokenRequest);

    // return access token and refresh token
    return Results.Ok(new
    {
        AccessToken = tokenResponse.AccessToken,
        RefreshToken = tokenResponse.RefreshToken,
        ExpiresIn = tokenResponse.ExpiresIn
    });
})
.WithName("SpotifyTokenExchange")
.WithOpenApi();

app.Run();
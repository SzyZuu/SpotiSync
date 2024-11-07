using System;
using System.Windows.Input;
using ReactiveUI;
using SpotiSync.Models;
using SpotiSync.Services;

namespace SpotiSync.ViewModels;

public class LoginViewModel : ViewModelBase
{
    private bool _isLoggedIn;
    
    private string? _serverAddress;

    private SpotifyService _spotifyService;
    
    public ICommand LoginCommand { get; }
    public ICommand HostCommand { get; }
    public ICommand JoinCommand { get; }

    public LoginViewModel(SpotifyService spotifyService)
    {
        _spotifyService = spotifyService;

        var canPress = this.WhenAnyValue(x => x.IsLoggedIn);
        
        LoginCommand = ReactiveCommand.Create(Login);
        HostCommand = ReactiveCommand.Create(Host, canPress);
        JoinCommand = ReactiveCommand.Create(Join, canPress);
    }

    public bool IsLoggedIn
    {
        get => _isLoggedIn;
        protected set => this.RaiseAndSetIfChanged(ref _isLoggedIn, value);
    }

    public string? ServerAddress
    {
        get => _serverAddress;
        set => this.RaiseAndSetIfChanged(ref _serverAddress, value);
    }

    private async void Login()
    {
        _spotifyService.OpenSpotifyLogin();
        string authCode = await _spotifyService.WaitForAuthorizationCodeAsync();

        TokenResponse token = await _spotifyService.ExchangeCodeForToken(authCode);
        IsLoggedIn = true;
        Console.WriteLine("Logged in: " + IsLoggedIn);
    }

    private void Host()
    {
        // Host server (WebRTC?)
    }

    private void Join()
    {
        // Pop up to connect to a host
    }
}
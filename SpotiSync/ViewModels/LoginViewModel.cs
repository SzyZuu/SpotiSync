using System;
using System.Windows.Input;
using ReactiveUI;
using SpotiSync.Models;
using SpotiSync.Services;

namespace SpotiSync.ViewModels;

public class LoginViewModel : ViewModelBase
{
    private bool _canContinue;
    private bool _isLoggedIn;
    
    private string? _serverAddress;

    private SpotifyService _spotifyService;
    
    public ICommand LoginCommand { get; }
    public ICommand HostCommand { get; }
    public ICommand JoinCommand { get; }

    public LoginViewModel(SpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
        var canNext = this.WhenAnyValue(x => x.CanContinue);
        this.WhenAnyValue(x => x.ServerAddress).Subscribe(_ => UpdateCanContinue());
        
        LoginCommand = ReactiveCommand.Create(Login, canNext);
        HostCommand = ReactiveCommand.Create(Host, canNext);
        JoinCommand = ReactiveCommand.Create(Join, canNext);
    }
    
    public bool CanContinue
    {
        get { return _canContinue; }
        protected set { this.RaiseAndSetIfChanged(ref _canContinue, value); }
    }

    public bool IsLoggedIn
    {
        get { return _isLoggedIn; }
        protected set { this.RaiseAndSetIfChanged(ref _isLoggedIn, value); }
    }

    public string? ServerAddress
    {
        get { return _serverAddress; }
        set { this.RaiseAndSetIfChanged(ref _serverAddress, value); }
    }

    private async void Login()
    {
        _spotifyService.OpenSpotifyLogin();
        var authCode = await _spotifyService.WaitForAuthorizationCodeAsync();

        TokenResponse token = await _spotifyService.ExchangeCodeForToken(authCode);
        Console.WriteLine("token: ", token);
    }

    private void Host()
    {
        // Host server (WebRTC?)
    }

    private void Join()
    {
        // Pop up to connect to a host
    }
    
    private void UpdateCanContinue()
    {
        CanContinue = !string.IsNullOrWhiteSpace(ServerAddress);
    }
}
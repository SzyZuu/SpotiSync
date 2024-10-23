using System;
using System.Windows.Input;
using ReactiveUI;

namespace SpotiSync.ViewModels;

public class LoginViewModel : ViewModelBase
{
    private bool _canContinue;
    private bool _isLoggedIn;
    
    private string? _serverAddress;

    public ICommand LoginCommand { get; }
    public ICommand HostCommand { get; }
    public ICommand JoinCommand { get; }

    public LoginViewModel()
    {
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

    private void Login()
    {
        // Spotify OAuth
        System.Console.WriteLine("Login pressed");
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
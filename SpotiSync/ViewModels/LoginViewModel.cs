using ReactiveUI;

namespace SpotiSync.ViewModels;

public class LoginViewModel : ViewModelBase
{
    private bool _canContinue;

    private string? _serverAddress;

    public bool CanContinue
    {
        get { return _canContinue; }
        protected set { this.RaiseAndSetIfChanged(ref _canContinue, value); }
    }

    public string? ServerAddress
    {
        get { return _serverAddress; }
        set { this.RaiseAndSetIfChanged(ref _serverAddress, value); }
    }
    
    private void UpdateCanContinue()
    {
        //check if Spotify is logged in and Server connection available
    }
}
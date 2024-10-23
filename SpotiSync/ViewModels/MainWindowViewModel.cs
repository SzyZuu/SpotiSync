using ReactiveUI;
using SpotiSync.Services;

namespace SpotiSync.ViewModels;

public class MainWindowViewModel : ViewModelBase
{
    private readonly SpotifyService _spotifyService;
    private readonly ViewModelBase[] _pages;
    
    public MainWindowViewModel()
    {
        _spotifyService = new SpotifyService();
        _pages = new ViewModelBase[]
        {
            new LoginViewModel(_spotifyService)
        };
        
        _currentPage = _pages[0];
    }

    private ViewModelBase _currentPage;

    public ViewModelBase CurrentPage
    {
        get { return _currentPage; }
        private set { this.RaiseAndSetIfChanged(ref _currentPage, value); }
    }
}
using ReactiveUI;

namespace SpotiSync.ViewModels;

public class MainWindowViewModel : ViewModelBase
{
    public MainWindowViewModel()
    {
        _currentPage = _pages[0];
    }
    public string Greeting => "Mmmm Moosic";

    private readonly ViewModelBase[] _pages =
    {
        new LoginViewModel()
    };

    private ViewModelBase _currentPage;

    public ViewModelBase CurrentPage
    {
        get { return _currentPage; }
        private set { this.RaiseAndSetIfChanged(ref _currentPage, value); }
    }
}
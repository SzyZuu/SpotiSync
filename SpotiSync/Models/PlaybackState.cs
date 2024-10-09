namespace SpotiSync.Models;

public class PlaybackState
{
    public Song CurrentSong { get; set; }
    public int PositionMs { get; set; } // Position in milliseconds
    public bool IsPlaying { get; set; }
}
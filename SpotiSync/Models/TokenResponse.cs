namespace SpotiSync.Models;

public class TokenResponse
{
    public string accessToken { get; set; }
    public string refreshToken { get; set; }
    public int expiresIn { get; set; }
}

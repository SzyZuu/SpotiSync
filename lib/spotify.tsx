export async function getCurrentlyPlaying(accessToken: string){
    try{
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(response.status === 204){    // nothings playing
            return null;
        }

        if(!response.ok){
            throw new Error(`Spotify API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.error("Error fetching currently playing track: ", error)
        return null;
    }
}
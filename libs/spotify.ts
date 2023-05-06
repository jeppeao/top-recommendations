import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
  "playlist-read-private",
  "streaming",
  "user-library-read",
  "user-read-email"
].join(',');

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = 
  "https://accounts.spotify.com/authorize?" +
   queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

export const getSavedTracks = async (token: string) => {
  let tracks: {}[] = [];
  let nextUrl = "https://api.spotify.com/v1/me/tracks?offset=0&limit=50";

  while (nextUrl !== null) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    nextUrl = data.next;
    tracks = tracks.concat(data.items)
    console.log("items: ", tracks.length)
  }
  
  return tracks;
}






export default spotifyApi;

export { LOGIN_URL }
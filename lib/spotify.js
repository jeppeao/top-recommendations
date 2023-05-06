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

export default spotifyApi;

export { LOGIN_URL }
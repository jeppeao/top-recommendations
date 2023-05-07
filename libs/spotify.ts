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

// const getSavedTracks = async (token: string) => {
//   let tracks: {}[] = [];
//   let nextUrl = "https://api.spotify.com/v1/me/tracks?offset=0&limit=50";

//   while (nextUrl !== null) {
//     const response = await fetch(nextUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const data = await response.json();
//     nextUrl = data.next;
//     tracks = tracks.concat(data.items)
//     console.log("items: ", tracks.length)
//   }

//   return tracks;
// }

const getSavedTracks = async (token: string) => {
  let tracks: {}[] = [];
  let limit = 50;
  let offset = 0;
  let total = 0;
  const urls = [];

  const getUrl = (limit: number, offset: number) => {
    return `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`
  }

  const getResponse = async (url: string) => {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`}
    });
    return response;
  }
  try {
    const res = await getResponse(getUrl(limit, offset));
    const firstData = await res.json();
    offset += 50;
    tracks = tracks.concat(firstData.items);
    total = firstData.total;

    while (offset < total) {
      urls.push(getUrl(limit, offset));
      offset +=50;
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const responses = await Promise.all(urls.map((url) => getResponse(url)))
    const errors = responses.filter((res) => !res.ok);

    if (errors.length > 0) {
      throw errors.map((response) => Error(response.statusText));
    }

    const json = responses.map((res) => res.json());
    const data = await Promise.all(json);
    const batches = data.map((b) => b.items);
    tracks = tracks.concat(batches.flat())

  } catch (errors: any) {
    errors.forEach((err: Error) => console.error(err))
  }




  return tracks;
}

export default spotifyApi;

export { LOGIN_URL, getSavedTracks }
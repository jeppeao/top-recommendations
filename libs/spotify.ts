import SpotifyWebApi from "spotify-web-api-node"

interface CountedRecommendation {
  recommendation: any;
  count: number
}

interface CountedRecommendations {
  [key: string] : CountedRecommendation;
}

const scopes = [
  "playlist-read-private",
  "streaming",
  "user-library-read",
  "user-read-email"
].join(',');

const queryParamString = new URLSearchParams({scope: scopes});

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
   queryParamString.toString();
   
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

const getResponse = async (url: string, token: string) => {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`}
  });
  return response;
} 

const getSavedTracks = async (token: string) => {
  let tracks: {}[] = [];
  let limit = 50;
  let offset = 0;
  let total = 0;
  let max_offset = 500;
  const urls = [];

  // Because of api limit of 50 songs per request 
  // first fetch is used to read total number of songs
  // then urls for fetching all saved songs are prepared
  const getUrl = (limit: number, offset: number) => {
    return `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`
  }

  try {
    const res = await getResponse(getUrl(limit, offset), token);
    const firstData = await res.json();
    offset += 50;
    tracks = tracks.concat(firstData.items);
    total = firstData.total;

    while (offset < total && offset <= max_offset) {
      urls.push(getUrl(limit, offset));
      offset +=50;
    }
  } catch (error) {
    console.error(error);
  }

  // Now fetch all songs not in first batch
  try {
    const responses = await Promise.all(urls.map((url) => getResponse(url, token)));
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

const getRecommendations = async (token: string) => {
  const endpoint = "https://api.spotify.com/v1/recommendations"
  const seed_artists = "4NHQUGzhtTLFvgF5SZesLK";
  const seed_genres = "classical%2country";
  const seed_tracks = "0c6xIDDpzE81m2q797ordA";
  const url = [
    `${endpoint}`,
    `?seed_artists=${seed_artists}`,
    // `&seed_genres=${seed_genres}`,
    `&seed_tracks=${seed_tracks}`
  ].join("");

  try {
    const res = await getResponse(url, token);
    const data = await res.json(); 
    return data.tracks;

  } catch (error) {
    console.error(error);
  }
}

const rankRecommendations = (recommendations: any, exclude: any) => {
  const excludeIds = exclude.map((e:any) => e.track.id);
  const countedRecommendations: CountedRecommendations = {};

  for (let rec of recommendations) {
    const id = rec.id;
    if (countedRecommendations[id]) {
      countedRecommendations[id].count += 1;
    }
    else if (!excludeIds.includes(id)) {
      countedRecommendations[id] = {recommendation: rec, count: 1}
    }
  }
  const recList = Object.values(countedRecommendations);
  const rankedRecommendations = recList.sort((a, b) => {
    return b.count - a.count;
  });
  
  return rankedRecommendations;
}

export default spotifyApi;
export { LOGIN_URL, getSavedTracks, getRecommendations, rankRecommendations }
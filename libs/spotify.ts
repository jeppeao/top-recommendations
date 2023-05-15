import SpotifyWebApi from "spotify-web-api-node"

interface CountedRecommendation {
  recommendation: any;
  count: number
}

interface CountedRecommendations {
  [key: string] : CountedRecommendation;
}

const ENDPOINTS = {
  savedTracks: "https://api.spotify.com/v1/me/tracks",
  recommendations: "https://api.spotify.com/v1/recommendations"
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

const atSpotify = async (
  endpoint: string,
  options: {[key:string]: string},
  method: string = "GET", 
) => {
  const path = '/api/spotify/spotify';
  const queryParameters = "?" + new URLSearchParams(options).toString();
  
  const fetchParameters = {
    headers: {
      "spotify-endpoint": `${endpoint}`
    },
    method: method
  } 

  const response = await fetch(path + queryParameters, fetchParameters);
  return response;
}

const spotifyGetLiked = async (options: {[key:string]: string} = {}) => {
  return atSpotify(ENDPOINTS.savedTracks, options);
}

const spotifyGetRecommended = async (options: {[key:string]: string}) => {
  return atSpotify(ENDPOINTS.recommendations, options);
}

const getResponse = async (url: string, token: string) => {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`}
  });
  return response;
} 

const getSavedTracks = async () => {
  let tracks: {}[] = [];
  let total = 0;
  let max_offset = 500;
  const limit = 50;
  let offset = 0;
  let offsets = [];

  // Because of api limit of 50 songs per request 
  // first fetch is used to read total number of songs
  // then urls for fetching all saved songs are prepared

  try {
    const res = await spotifyGetLiked({limit: limit.toString(), offset: offset.toString()});
    const firstData = await res.json();
    offset += 50;
    tracks = tracks.concat(firstData.items);
    total = firstData.total;

    while (offset < total && offset <= max_offset) {
      offsets.push(offset)
      offset +=50;
    }
  } catch (error) {
    console.error(error);
  }

  // Now fetch all songs not in first batch
  try {
    const responses = await Promise.all(offsets.map((off) => spotifyGetLiked(
      { limit: limit.toString(), offset: off.toString() }
    )));
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

const getRecommendations = async (
  token: string,
  trackId: string
) => {
  const endpoint = "https://api.spotify.com/v1/recommendations"
  const url = [
    `${endpoint}`,
    `?seed_tracks=${trackId}`,
    `&limit=100`
  ].join("");

  try {
    const res = await getResponse(url, token);
    const data = await res.json(); 
    return data.tracks;

  } catch (error) {
    console.error(error);
  }
}

const rankRecommendations = (
  recommendations: any, 
  exclude: any,
  maxLength = 200
  ) => {
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
  
  return rankedRecommendations.slice(0, maxLength);
}

const getRankedRecommendations = async (
  tracks: any,
  exclude: any,
) => {
  const url = `/api/spotify/getRecommendations?trackId=${tracks[0].track.id}`;
  const recommendations = await fetch(url)
    .then((res) => res.json());
  const ranked = rankRecommendations(recommendations, exclude);

  return ranked;
}

const getRecommendationsFromMultiple = async (
  tracks: any,
  exclude: any,
) => {
  const path = "/api/spotify/getRecommendations?trackId=";
  const ids = tracks.map((track: any) => track.track.id);
  const urls = ids.map((id:string) => path+id);
  const responses = await Promise.all(urls.map((url:string) => fetch(url)));
  const batches = responses.map((res) => res.json());
  const data = (await Promise.all(batches)).flat();
  
  return data;
}

const delayedPromise = (delay: number, fn: any) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(fn());
    }, delay);
  })
}

const getRecommendationsRateLimited = async (
  tracks: any,
  exclude: any,
  callsPerSecond = 50
) => {
  let offset = 0;
  let delay = 0;
  let batchSize = Math.min(Math.max(1, callsPerSecond), 50);
  let batches = [];
  tracks = tracks.slice(0, 200);
  
   while (offset < tracks.length) {
     let batch = tracks.slice(offset, offset+batchSize);
     const delayed = delayedPromise(
       delay,
       () => getRecommendationsFromMultiple(batch, tracks)
     );
     batches.push(delayed);
     offset += batchSize;
     delay += 1000;
   }
  const responses = await Promise.all(batches);
  return responses.flat();
}

export default spotifyApi;
export { 
  LOGIN_URL, 
  getSavedTracks, 
  getRecommendations, 
  rankRecommendations, 
  getRankedRecommendations,
  getRecommendationsFromMultiple,
  getRecommendationsRateLimited,
  atSpotify,
  spotifyGetLiked
}
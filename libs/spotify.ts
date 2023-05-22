interface CountedRecommendation {
  recommendation: any;
  count: number
}

interface CountedRecommendations {
  [key: string] : CountedRecommendation;
}

interface FetchParameters {
  headers: {[key: string]: string},
  method: string,
  body?: string
}

export interface UserProfile {
  product: string
}

const ENDPOINTS = {
  savedTracks: "https://api.spotify.com/v1/me/tracks",
  recommendations: "https://api.spotify.com/v1/recommendations",
  refresh: "https://accounts.spotify.com/api/token",
  authorize: "https://accounts.spotify.com/authorize",
  play: "https://api.spotify.com/v1/me/player/play",
  devices: "https://api.spotify.com/v1/me/player/devices",
  userProfile: "https://api.spotify.com/v1/me"
}

const scopes = [
  "playlist-read-private",
  "streaming",
  "user-library-read",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "playlist-modify-private",
  "playlist-modify-public"
].join(',');

const queryParamString = new URLSearchParams({scope: scopes});

const LOGIN_URL =
  ENDPOINTS.authorize + "?" +
   queryParamString.toString();
   
const spotifyGet = async (
  endpoint: string,
  options: {[key:string]: string},
  method: string = "GET",
  body?: string,
  headers?: {[key: string]: string},
) => {
  const path = '/api/spotify';
  let queryParameters = "?" + new URLSearchParams(options).toString();
  queryParameters = queryParameters === "?" ? "" : queryParameters;
  
  const fetchParameters: FetchParameters = {
    headers: {
      "spotify-endpoint": `${endpoint}`
    },
    method: method,
  } 

  if (body) {
    fetchParameters.body = body;
  }

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      fetchParameters.headers.key = value;
    }
  }

  const response = await fetch(path + queryParameters, fetchParameters);
  return response;
}

const spotifyPut = async (
  endpoint: string,
  options: {[key:string]: string},
  body?: string,
  headers?: {[key: string]: string},
) => {
  const path = '/api/spotify/play';
  let queryParameters = "?" + new URLSearchParams(options).toString();
  queryParameters = queryParameters === "?" ? "" : queryParameters;
  
  const fetchParameters: FetchParameters = {
    headers: {
      "spotify-endpoint": `${endpoint}`
    },
    method: "PUT",
  } 

  if (body) {
    fetchParameters.body = body;
  }

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      fetchParameters.headers.key = value;
    }
  }

  const response = await fetch(path + queryParameters, fetchParameters);
  return response;
}

const spotifyGetDevices = async () => {
  return spotifyGet(ENDPOINTS.devices, {});
}

const spotifyPlayTrack = async (songId: string) => {
  const headers = {"Content-Type": "application/json"};
  const body =songId
  const devices = await spotifyGetDevices();
  const json = await devices.json()
  const options = { device_id: json.devices[0].id }
  return spotifyPut(ENDPOINTS.play, options, body, headers);
}

const spotifyGetLiked = async (options: {[key:string]: string} = {}) => {
  return spotifyGet(ENDPOINTS.savedTracks, options);
}

const spotifyGetRecommended = async (id: string, options: {[key:string]: string} = {}) => {
  const combinedOptions = {...options, seed_tracks: id};
  return spotifyGet(ENDPOINTS.recommendations, combinedOptions);
}

const getRankedRecommendations = async (tracks: any, exclude: any) => {
  const recommendations = await getRecommendationsRateLimited(tracks);
  return rankRecommendations(recommendations, exclude);
}

const spotifyGetUserProfile = async() => {
  return spotifyGet(ENDPOINTS.userProfile, {})
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

  // Fetch all songs not in first batch
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

const getRecommendations = async (tracks: any) => {
  const options = tracks.map((item: any) => {return {trackId: item.track.id}});
  const responses = await Promise.all(tracks.map(
    (item: any) => spotifyGetRecommended(item.track.id))
  );

  const batches = responses.map((res) => res.json());
  const data = (await Promise.all(batches));
  const recommendations = data.map((item: any) => item.tracks).flat();
  
  return recommendations;
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
       () => getRecommendations(batch)
     );
     batches.push(delayed);
     offset += batchSize;
     delay += 1000;
   }
  const responses = await Promise.all(batches);

  return responses.flat();
}

export { 
  LOGIN_URL, 
  ENDPOINTS,
  getSavedTracks, 
  getRankedRecommendations,
  spotifyPlayTrack,
  spotifyGetUserProfile
}
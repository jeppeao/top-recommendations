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
  id: string,
  product: string
}

const ENDPOINTS = {
  savedTracks: "https://api.spotify.com/v1/me/tracks",
  recommendations: "https://api.spotify.com/v1/recommendations",
  refresh: "https://accounts.spotify.com/api/token",
  authorize: "https://accounts.spotify.com/authorize",
  play: "https://api.spotify.com/v1/me/player/play",
  devices: "https://api.spotify.com/v1/me/player/devices",
  userProfile: "https://api.spotify.com/v1/me",
  modifyLike: "https://api.spotify.com/v1/me/tracks",
  getPlaylists: "https://api.spotify.com/v1/me/playlists",
  getGenres: "https://api.spotify.com/v1/recommendations/available-genre-seeds"
}

const scopes = [
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-library-read",
  "user-library-modify",
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

const spotifyModify = async (
  endpoint: string,
  method: string,
  options: {[key:string]: string},
  body?: string,
  headers?: {[key: string]: string},
) => {
  const path = '/api/spotify/modify';
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

const spotifyGetDevices = async () => {
  return spotifyGet(ENDPOINTS.devices, {});
}

const spotifyPlayTrack = async (songId: string) => {
  const headers = {"Content-Type": "application/json"};
  const body = `{"uris": ["spotify:track:${songId}"]}`;
  const devices = await spotifyGetDevices();
  const json = await devices.json()
  const options = { device_id: json.devices[0].id }
  return spotifyModify(ENDPOINTS.play, "PUT", options, body, headers);
}

const spotifyGetLiked = async (options: {[key:string]: string} = {}) => {
  return spotifyGet(ENDPOINTS.savedTracks, options);
}

const spotifyGetRecommended = async (id: string, options: {[key:string]: string} = {}) => {
  const combinedOptions = {...options, seed_tracks: id};
  return spotifyGet(ENDPOINTS.recommendations, combinedOptions);
}

const getRankedRecommendations = async (
  tracks: any, 
  exclude: any, 
  options: {[key:string]: string} = {}
) => {
  const recommendations = await getRecommendationsRateLimited(tracks, options);
  return rankRecommendations(recommendations, exclude);
}

const spotifyGetUserProfile = async() => {
  return spotifyGet(ENDPOINTS.userProfile, {});
}

const spotifySaveTrack = async (songId: string) => {
  const body = `{"ids": ["${songId}"]}`;
  return spotifyModify(ENDPOINTS.modifyLike, "PUT", {}, body);
}

const spotifyUnSaveTrack = async (songId: string) => {
  const endpoint = ENDPOINTS.modifyLike + `?ids=${songId}`
  return spotifyModify(endpoint, "DELETE", {});
}

const spotifyGetPlaylists = async () => {
  return spotifyGet(ENDPOINTS.getPlaylists, {});
}

const spotifyGetGenres = async () => {
  return spotifyGet(ENDPOINTS.getGenres, {});
}

const spotifyCreatePlaylist = async (userId: string) => {
  const timeString = new Date(Date.now()).toLocaleString();
  const name = "Recommendations " + timeString;
  const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const body = `{"name": "${name}"}`;
  return spotifyModify(endpoint, "POST", {}, body);
}

const spotifyAddToPlaylist = async (
  playlistId: string, 
  tracks: any,
  position: number
) => {
  const dataArray = tracks.map((track: any) => {
    return `"spotify:track:${track.recommendation.id}"`;
  });
  const body = `{"uris" : [${dataArray.toString()}], "position": ${position}}`;
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
  return spotifyModify(endpoint, "POST", {}, body);
}

const spotifyPlaylistFromTracks = async (userId: string, tracks: any) => {
  const playlist = await spotifyCreatePlaylist(userId)
    .then(res => res.json());
  const id = playlist.id;
  const response = await spotifyAddToPlaylist(id, tracks.slice(0,99), 0);
  const secondBatch = tracks.slice(99);
  if (secondBatch.length > 0) {
    const secondResponse = await spotifyAddToPlaylist(id, secondBatch, 99);
  }
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

const getRecommendations = async (tracks: any, options: {[key:string]: string} = {}) => {
  const responses = await Promise.all(tracks.map(
    (item: any) => spotifyGetRecommended(item.track.id, options))
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
  options: {[key:string]: string} = {},
  callsPerSecond = 50,
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
       () => getRecommendations(batch, options)
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
  spotifyGetUserProfile,
  spotifySaveTrack,
  spotifyUnSaveTrack,
  spotifyGetPlaylists,
  spotifyGetGenres,
  spotifyCreatePlaylist,
  spotifyPlaylistFromTracks
}
import SpotifyProvider from "next-auth/providers/spotify";

providers: [
  SpotifyProvider({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    
  })
]

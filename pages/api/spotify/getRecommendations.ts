import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import SpotifyWebApi from "spotify-web-api-node"
import { authOptions } from '../auth/[...nextauth]';
import { getRecommendations } from '@/libs/spotify';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions )
  spotifyApi.setAccessToken(session.user.accessToken);
  
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { trackId } = req.query;

  if (typeof trackId !== 'string') {
    console.log("Bad or missing query parameter trackId");
    return res.status(400).end();
  }

  try {
    const token = spotifyApi.getAccessToken();
    if (token) {
      const data = await getRecommendations(token, trackId);
      return res.status(200).json(data);
    }

    console.log("No access token");
    return res.status(400).end();

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }



}
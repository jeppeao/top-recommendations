import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import SpotifyWebApi from "spotify-web-api-node"
import { authOptions } from '../auth/[...nextauth]';

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

  const query = req.query;
  const { track } = query;
  console.log(track);
  return res.status(200).json({data: track});




}
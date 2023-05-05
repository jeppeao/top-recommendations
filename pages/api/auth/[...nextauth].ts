import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";
import spotifyApi from "../../../lib/spotify";
import NextAuth from "next-auth/next";

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as any,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as any,
      authorization: LOGIN_URL
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET, 
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user}: any) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, 
          provider: account.provider,
        }
      }
      // Return previous token if the access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired
      return await refreshAccessToken(token)
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      session.user.provider = token.provider;

      return session;
    }

  }
};

export default NextAuth(authOptions);

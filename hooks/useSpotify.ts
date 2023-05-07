import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "@/libs/spotify"

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if ((session as any).error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken((session as any).user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify
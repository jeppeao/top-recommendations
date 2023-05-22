import { spotifyGetUserProfile } from "@/libs/spotify";
import { useEffect, useState } from "react"

const useUserProfile = () => {
  const [tracks, setTracks] = useState<{}>({});

  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyGetUserProfile();
      const json = await response.json();
      setTracks(json);
    }  
    getUser();  
  }, [])

  return tracks;
}

export default useUserProfile
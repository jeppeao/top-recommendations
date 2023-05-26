import { spotifyGetPlaylists } from "@/libs/spotify";
import { useEffect, useState } from "react"
import { UserProfile } from "@/libs/spotify";
import { getSession } from "next-auth/react";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<UserProfile>();
  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyGetPlaylists();
      if (response.status === 200) {
        const json = await response.json();
        setPlaylists(json);
      }
    }  
    getUser();  
  }, [])

  return playlists;
}

export default usePlaylists
import { spotifyGetPlaylists } from "@/libs/spotify";
import { useEffect, useState } from "react"
import { UserProfile } from "@/libs/spotify";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<UserProfile>();

  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyGetPlaylists();
      const json = await response.json();
      setPlaylists(json);
    }  
    getUser();  
  }, [])

  return playlists;
}

export default usePlaylists
import { spotifyGetPlaylists } from "@/libs/spotify";
import { useEffect, useState } from "react"
import { UserProfile } from "@/libs/spotify";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<UserProfile>();
  useEffect(() => {
    const getPlaylists = async () => {
      const response = await spotifyGetPlaylists();
      if (response.status === 200) {
        const json = await response.json();
        setPlaylists(json);
      }
    }  
    getPlaylists();  
  }, [])

  return playlists;
}

export default usePlaylists
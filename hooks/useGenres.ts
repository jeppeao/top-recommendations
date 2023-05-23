import { spotifyGetGenres } from "@/libs/spotify";
import { useEffect, useState } from "react"
import { UserProfile } from "@/libs/spotify";

const useGenres = () => {
  const [genres, setGenres] = useState<UserProfile>();

  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyGetGenres();
      const json = await response.json();
      setGenres(json.genres);
    }  
    getUser();  
  }, [])

  return genres;
}

export default useGenres
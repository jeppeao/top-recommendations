import { spotifyGetGenres } from "@/libs/spotify";
import { useEffect, useState } from "react"
import { GenreChoice } from "@/libs/spotify";

const useGenres = () => {
  const [genres, setGenres] = useState<GenreChoice[]>();

  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyGetGenres();
      if (response.status === 200) {
        const json = await response.json();
        const genreChoices =  json.genres.map((genre: string) => {
          return {genre, selected: false}
       });
        setGenres(genreChoices);
      }
    }  
    getUser();  
  }, [])

  return genres;
}

export default useGenres
import { getSavedTracks } from "@/libs/spotify";
import { useEffect, useState } from "react"

const useSavedTracks = () => {
  const [tracks, setTracks] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLiked = async () => {
      const liked = await getSavedTracks();
      setTracks(liked);
      setIsLoading(false);
    }  
    getLiked();  
  }, [])

  return {tracks, isLoading};
}

export default useSavedTracks
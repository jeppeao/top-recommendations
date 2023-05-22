import { getSavedTracks } from "@/libs/spotify";
import { useEffect, useState } from "react"

const useSavedTracks = () => {
  const [tracks, setTracks] = useState<{}[]>([]);

  useEffect(() => {
    const getLiked = async () => {
      const liked = await getSavedTracks();
      setTracks(liked);
    }  
    getLiked();  
  }, [])

  return tracks;
}

export default useSavedTracks
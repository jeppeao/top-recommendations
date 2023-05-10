import useRecommendations from "@/hooks/useRecommendations";
import fetcher from "@/libs/fetcher";

import { likedTracks } from "@/recoilAtoms/likedAtom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const SearchBar = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommendations, setRecommendations] = useState([]);
  const id = useRecommendations();
  console.log("id: ", id)

  if (tracks && tracks.length > 0) {
    const firstId = (tracks[0] as any).track.id;

  }
 

  const loadRecommendations = () => {
    const recommendations = fetch('/api/spotify/getRecommendations?track=tre7')
    .then((res) => res.json())
    .then((res) => console.log(res, typeof res))   
  }

  return (
    <div className="flex flex-col justify-start h-full w-full">
      <button 
        className="text-neutral-400 bg-cyan-400"
        onClick={loadRecommendations}
      >
        
        Get recommendations
      </button>
    </div>
  );
}

export default SearchBar;
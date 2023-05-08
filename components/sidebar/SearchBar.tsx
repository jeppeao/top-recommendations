import useRecommendations from "@/hooks/useRecommendations";
import fetcher from "@/libs/fetcher";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const SearchBar = () => {
  const tracks = useRecoilValue(likedTracks);
  
  if (tracks && tracks.length > 0) {
    const firstId = (tracks[0] as any).track.id;
    const id = useRecommendations();
    console.log("id: ", id)
  }
 



  return (
    <div className="flex justify-center h-full w-full">
      SearchBar works!
    </div>
  );
}

export default SearchBar;
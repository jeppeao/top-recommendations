import useGenres from "@/hooks/useGenres";
import usePlaylists from "@/hooks/usePlaylists";
import useUserProfile from "@/hooks/useUserProfile";
import { getRankedRecommendations, spotifyCreatePlaylist, spotifyPlaylistFromTracks } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DualRangeSlider from "../DualRangeSlider";

const OptionsView = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);
  const [isLoading, setIsLoading] = useState(false);
  const playlists = usePlaylists();
  const genres = useGenres();
  const profile = useUserProfile();


  const onGetRecommendations = async () => {
    setIsLoading(true);
    const ranked = await getRankedRecommendations(tracks.slice(0,10), tracks);
    setRecommended(ranked as any);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-center h-full w-full mt-2">
      <button 
        className="
          border-neutral-600
          border-2
          text-violet-400
          text-xl
          w-4/5
          p-2
          my-2
          rounded-full
          hover:border-neutral-500
          hover:text-violet-300
          "
        onClick={onGetRecommendations}
      >
        {isLoading ? "Loading..." : "Load Suggestions"}
      </button>
      <DualRangeSlider 
        min={0} 
        max={100} 
        labels={{min:"Cold", max:"Hot", label:"Popularity range"}}
        onChange={(min: number, max: number) => console.log(min, max)}
      
      />
    </div>
  );
}

export default OptionsView;
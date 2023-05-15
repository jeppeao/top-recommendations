import { getRankedRecommendations } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const OptionsView = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);
  const [isLoading, setIsLoading] = useState(false);

  const onGetRecommendations = async () => {
    setIsLoading(true);
    const ranked = await getRankedRecommendations(tracks.slice(0,5), tracks);
    setRecommended(ranked as any);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-start items-center h-full w-full mt-2">
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
    </div>
  );
}

export default OptionsView;
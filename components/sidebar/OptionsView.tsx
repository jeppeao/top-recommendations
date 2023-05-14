import { getRecommendationsFromMultiple, getRankedRecommendations, rankRecommendations, getRecommendationsRateLimited } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const OptionsView = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);
  const [isLoading, setIsLoading] = useState(false);

  const onGetRecommendations = async () => {
    setIsLoading(true);
    const recs = await getRecommendationsRateLimited(tracks.slice(0,5), tracks);
    const ranked = rankRecommendations(recs, tracks);
    setRecommended(ranked as any);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-start items-center h-full w-full mt-2">
      <button 
        className="
          bg-gradient-to-b 
          from-violet-900 
          to-indigo-900
          text-neutral-100
          text-xl
          w-4/5
          p-2
          my-2
          rounded-full
          hover:shadow-neutral-600
          hover:shadow-md
          hover:-translate-y-1
          active:shadow-none
          active:translate-y-0
          "
        onClick={onGetRecommendations}
      >
        {isLoading ? "Loading..." : "Load suggestions"}
      </button>
     

    </div>
  );
}

export default OptionsView;
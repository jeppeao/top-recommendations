import { getAllRecommendations, getRankedRecommendations, rankRecommendations } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const OptionsView = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);

  const onGetRecommendations = async () => {
    const ranked = await getAllRecommendations(tracks, tracks)
    setRecommended(ranked as any);
  }
  
  return (
    <div className="flex flex-col justify-start items-center h-full w-full mt-2">
      <button 
        className="text-neutral-100 text-xl bg-violet-800 w-fit p-2 rounded-full hover:bg-violet-700"
        onClick={onGetRecommendations}
      >
        Load Suggestions
      </button>
    </div>
  );
}

export default OptionsView;
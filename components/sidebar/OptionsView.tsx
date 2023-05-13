import { getRankedRecommendations, rankRecommendations } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const OptionsView = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);

  const onGetRecommendations = async () => {
    const ranked = await getRankedRecommendations([tracks[0]], tracks)
    setRecommended(ranked as any);
  }
  
  return (
    <div className="flex flex-col justify-start items-center h-full w-full mt-2">
      <button 
        className="text-neutral-200 text-xl bg-violet-800 w-fit p-2 rounded-full hover:text-neutral-100"
        onClick={onGetRecommendations}
      >
        
        Load Suggestions
      </button>
    </div>
  );
}

export default OptionsView;
import useRecommendations from "@/hooks/useRecommendations";
import { rankRecommendations } from "@/libs/spotify";
import { likedTracks } from "@/recoilAtoms/likedAtom";
import { recommendedTracks } from "@/recoilAtoms/recommendedAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const SearchBar = () => {
  const tracks = useRecoilValue(likedTracks);
  const [recommended, setRecommended] = useRecoilState(recommendedTracks);
  const id = useRecommendations();

  if (tracks && tracks.length > 0) {
    const firstId = (tracks[0] as any).track.id;
  }
 
  const loadRecommendations = async () => {
    const recommendations = await fetch('/api/spotify/getRecommendations?track=tre7')
    .then((res) => res.json());

    return recommendations;
  }

  const onGetRankedClick = async () => {
    const recs = await loadRecommendations();
    let r2 = [...recs, recs[14], recs[3], recs[3]]
    const ranked = rankRecommendations(r2, tracks);
    setRecommended(ranked as any);

  }
  
  return (
    <div className="flex flex-col justify-start h-full w-full">
      <button 
        className="text-neutral-400 bg-cyan-400"
        onClick={onGetRankedClick}
      >
        
        Get recommendations
      </button>
    </div>
  );
}

export default SearchBar;
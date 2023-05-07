import { likedTracks } from "@/recoilAtoms/likedAtom";
import { useRecoilValue } from "recoil";

const SearchBar = () => {
  const tracks = useRecoilValue(likedTracks);
  
  const firstId = (tracks[0] as any).track.id;

  return (
    <div className="flex justify-center h-full w-full">
      SearchBar works!
    </div>
  );
}

export default SearchBar;
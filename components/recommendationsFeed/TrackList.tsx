import useSavedTracks from "@/hooks/useSavedTracks";
import TrackCard from "./TrackCard";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { likedTracks } from "@/recoilAtoms/likedAtom";

const TrackList = () => {
  const { data } = useSavedTracks() || '';
  const [tracks, setTracks] = useRecoilState(likedTracks);

  useEffect(() => {
    setTracks(data);
  }, [data])

  return (
    <div className="py-4 px-4">
      {data && data.map((item: any, i: number) => {
        return <TrackCard track={item.track} key={i} order={i} hits={1}/>
      })}
    </div>
  );
}

export default TrackList
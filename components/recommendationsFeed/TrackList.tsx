import useSavedTracks from "@/hooks/useSavedTracks";
import TrackCard from "./TrackCard";

const TrackList = () => {
  const { data } = useSavedTracks() || '';
  return (
    <div className="py-4 px-4">
      {data && data.map((item: any, i: number) => {
        return <TrackCard track={item.track} key={i} order={i}/>
      })}
    </div>
  );
}

export default TrackList
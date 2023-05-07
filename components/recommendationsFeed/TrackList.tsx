import useSavedTracks from "@/hooks/useSavedTracks";
import TrackCard from "./TrackCard";
import { useState } from "react";

const TrackList = () => {
  const { data } = useSavedTracks() || '';
  console.log("searchbar")
  const [st, setSt] = useState('');
  return (
    <div className="py-4 px-4">
            <button onClick={() => st === '' ? setSt('hello') : setSt('')}
        className="bg-green-900"
      >
        update
      </button>
      {data && data.map((item: any, i: number) => {
        return <TrackCard track={item.track} key={i} order={i}/>
      })}
    </div>
  );
}

export default TrackList
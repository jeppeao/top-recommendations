import useSavedTracks from "@/hooks/useSavedTracks";
import TrackCard from "./TrackCard";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { likedTracks } from "@/recoilAtoms/likedAtom";

const TrackList = (tracks: any) => {
  console.log(tracks)
  return (
    <div className="py-4 px-4">
      {tracks && tracks.tracks.tracks.map((item: any, i: number) => {
        return <TrackCard track={item.track} key={i} order={i} hits={1}/>
      })}
    </div>
  );
}

export default TrackList
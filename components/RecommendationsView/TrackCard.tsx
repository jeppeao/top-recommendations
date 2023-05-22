import { spotifyPlayTrack } from "@/libs/spotify";
import { msToMinutesAndSeconds } from "@/libs/utils";
import { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

interface TrackCardProps {
  track: any;
  order: number;
  hits: number;
}

const TrackCard = ({ track, order, hits }: TrackCardProps) => {
  const [liked, setLiked] = useState(false);

  const onLike = () => {
    setLiked(true);
  }

  const onUnlike = () => {
    setLiked(false)
  }

  return (
    <div
      className="
        grid 
        grid-cols-6
        gap-6
        w-full
        h-16
        hover:bg-zinc-800
        rounded-md
        group
      "
    > 
      <div className="col-span-4 md:col-span-3 flex gap-2 truncate h-full ">
        <div 
          className="
          text-neutral-400
          flex
          shrink-0
          justify-end
          items-center
          w-10
        ">
          
          <span className="group-hover:hidden"> {order + 1} </span>
          <button
            onClick={ () => {
                spotifyPlayTrack(track.id);
              }
            }
            className="hidden group-hover:block -mr-1"
          > {<BsPlayFill size={20} color={"lightgreen"}/>}</button>
        </div>
        
        <div className="flex items-center">
          <img
            className="object-contain h-12 w-12 min-w-fit"
            src={track?.album?.images[2] ? track.album.images[2].url : ''}
            alt="Cover"
          />
        </div>

        <div className="h-full flex flex-col justify-center gap-1 truncate text-neutral-100">
          <div className="text-md text-ellipsis truncate">
            {track.name}
          </div>
          <div className="text-sm text-neutral-400 text-ellipsis truncate">
            {track.artists.map((a: any) => a.name).join(", ")}
          </div>
        </div>
      </div>
      <div 
        className="col-span-1 hidden md:flex md:items-center">
        <div className="truncate text-ellipsis text-neutral-400 text-sm
        ">
          {track.album.name}
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <button>
          {liked ? 
            <TbHeartFilled size={20} color={"lightgreen"} onClick={onUnlike}/> : 
            <TbHeart size={20} onClick={onLike} className="hidden group-hover:block"/>}
        </button>
      </div>
      <div className="flex justify-end items-center pr-8">
        <div className="
          text-neutral-400
          grow
          flex
          justify-end
          lg:justify-start
        ">
          { hits }
        </div>
        <div className="
          hidden
          lg:flex
          justify-end
          items-center
          text-neutral-400
          grow
        ">
          {msToMinutesAndSeconds(track.duration_ms)}
        </div>
      </div>

    </div>
  );
}

export default TrackCard
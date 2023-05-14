import { msToMinutesAndSeconds } from "@/libs/utils";

interface TrackCardProps {
  track: any;
  order: number;
  hits: number;
}

const TrackCard = ({ track, order, hits }: TrackCardProps) => {
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
          {order + 1}
        </div>
        
        <div className="flex items-center">
          <img
            className="object-contain h-12 w-12 min-w-fit"
            src={track?.album?.images[2] ? track.album.images[2].url : ''}
            alt="Cover"
          />
        </div>

        <div className="h-full flex flex-col justify-center gap-1 truncate text-neutral-200">
          <div className="text-md text-ellipsis truncate">
            {track.name}
          </div>
          <div className="text-sm text-neutral-400 text-ellipsis truncate">
            {track.artists.map((a: any) => a.name).join(", ")}
          </div>
        </div>
      </div>
      <div 
        className="col-span-2 hidden md:flex md:items-center">
        <div className="truncate text-ellipsis text-neutral-400 text-sm
        ">
          {track.album.name}
        </div>
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
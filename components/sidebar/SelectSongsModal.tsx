import Modal from "@/components/Modal"
import Tooltip from "../Tooltip";
import { msToMinutesAndSeconds } from "@/libs/utils";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";

interface SelectSongsModalProps {
  isOpen: boolean;
  songChoices: any;
  songs: any;
  onSelect: (song: any) => void;
  onClose: () => void;
  onReset: () => void;
  onClearSongs: () => void;
}

const SelectSongsModal = ({
  isOpen,
  songChoices, 
  onSelect,
  onClose,
  onReset,
  onClearSongs,
  songs
}: SelectSongsModalProps) => {

  const onCloseWrapper = () => {
    if (songChoices.length === 0) {
      onReset();
    }
    onClose();
  }
  
  const bodyContent = (
    <div>
      <div className="
        flex
        gap-2
        items-center
        mx-2
      ">
          <h1 className="
            w-full
            flex
            justify-center
            text-violet-400
            text-4xl
            my-2
          ">
           <Tooltip message="Select songs to use as seeds for recommendations">
              Select &nbsp; <span className="hidden md:block"> Songs</span>
            </Tooltip>
          </h1>
        <button 
          onClick={onClearSongs}
          className="
          whitespace-nowrap
          bg-neutral-700
          rounded-full
          h-fit
          p-2
          text-violet-300
          hover:bg-neutral-600
          hover:text-violet-200
          text-lg
        ">
          Clear Selection
        </button>
        <button 
          onClick={onReset}
          className="
          whitespace-nowrap
          bg-neutral-700
          rounded-full
          h-fit
          p-2
          text-violet-300
          hover:bg-neutral-600
          hover:text-violet-200
          text-lg
        ">
          Reset
        </button>
      </div>

      <div 
        style={{width: "75vw", height: "75vh"}}
        className="
          flex
          flex-col
          gap-2
          overflow-scroll
          overflow-x-hidden
          py-2
          mx-2
      ">
        {
          songs.map((song:any, i: number) => {
            return (
              <div
              key = {i}
                onClick={() => onSelect(song)}
                className="
                  grid 
                  grid-cols-6
                  gap-6
                  w-full
                  h-16
                  hover:bg-zinc-800
                  rounded-md
                  group
              "> 
              <div className="col-span-4 md:col-span-3 xl:col-span-2 flex gap-2 truncate h-full ">
                <div 
                  className="
                  text-neutral-400
                  flex
                  shrink-0
                  justify-end
                  items-center
                  w-10
                ">
                  <span> {i + 1} </span>

                </div>
                
                <div className="flex items-center">
                  <img
                    className="object-contain h-12 w-12 min-w-fit"
                    src={song.track?.album?.images[2] ? song.track.album.images[2].url : ''}
                    alt="Cover"
                  />
                </div>
        
                <div className="h-full flex flex-col justify-center gap-1 truncate text-neutral-100">
                  <div className="text-md text-ellipsis truncate">
                    {song.track.name}
                  </div>
                  <div className="text-sm text-neutral-400 text-ellipsis truncate">
                    {song.track.artists.map((a: any) => a.name).join(", ")}
                  </div>
                </div>
              </div>
              <div 
                className="col-span-1 xl:col-span-2 xl:pl-8 hidden md:flex md:items-center">
                <div className="truncate text-ellipsis text-neutral-400 text-sm
                ">
                  {song.track.album.name}
                </div>
              </div>
              <div className="flex justify-center items-center">
                { 
                  songChoices.some((i: any) => i.track.id === song.track.id) 
                  ? <AiOutlineCheckCircle size={32} color={"lightgreen"}/>
                  : <IoMdRemoveCircleOutline size={32} color={"crimson"}/>
                }
              </div>
              <div className="flex justify-end items-center pr-8">
                  <div className="
                  hidden
                  lg:flex
                  justify-end
                  items-center
                  text-neutral-400
                  grow
                ">
                  {msToMinutesAndSeconds(song.track.duration_ms)}
                </div>
              </div>
        
            </div>
            );
          })
        }
      </div>
    </div>
  )

  return (
    
    <Modal 
      isOpen={isOpen}
      onClose={onCloseWrapper}
      body={bodyContent}
    />
  );
}

export default SelectSongsModal;
import { GenreChoice } from "@/libs/spotify"
import { useState } from "react";
import SelectGenresModal from "./SelectGenresModal";
import SelectSongsModal from "./SelectSongsModal";

interface SongSelectorProps {
  songChoices: any;
  songs: any
  onSelect: (song: any) => void;
  onReset: () => void;
  onClearSongs: () => void;
}

const SongSelector = ({
  songChoices,
  songs,
  onSelect,
  onReset,
  onClearSongs
}: SongSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          w-4/5
          bg-neutral-700
          rounded-full
          text-neutral-400
          h-8
          hover:text-neutral-300
          hover:bg-neutral-600
          truncate
          px-2
          leading none
    ">
      {
        songChoices.length === songs.length 
        ? "All songs"
        : `${songChoices.length} songs`
      }
    </button>
    <SelectSongsModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      songChoices={songChoices}
      onSelect={onSelect}
      songs={songs}
      onReset={onReset}
      onClearSongs={onClearSongs}
    />
   </>
  );
}

export default SongSelector;
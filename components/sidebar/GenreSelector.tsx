import { GenreChoice } from "@/libs/spotify"
import { useState } from "react";
import SelectGenresModal from "./SelectGenresModal";

interface GenreSelectorProps {
  genreChoices: GenreChoice[];
  onSelect: (genreChoice: GenreChoice) => void;
  onRemoveAll: () => void;
}

const GenreSelector = ({
  genreChoices,
  onSelect,
  onRemoveAll
}: GenreSelectorProps) => {
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
    ">
      {
        genreChoices.some((g: GenreChoice) => g.selected === true) 
        ? "Selected genres"
        : "All genres"
      }
    </button>
    <SelectGenresModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      genreChoices={genreChoices}
      onSelect={onSelect}
      onRemoveAll={onRemoveAll}
    />
   </>
  );
}

export default GenreSelector;
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
  const selected = genreChoices.filter((g: GenreChoice)=> g.selected===true);
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
        genreChoices.some((g: GenreChoice) => g.selected === true) 
        ? `${selected.map((g, GenreChoice) => g.genre).join(", ")}`
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
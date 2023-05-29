import { GenreChoice } from "@/libs/spotify";
import Modal from "@/components/Modal"
import Tooltip from "../Tooltip";

interface SelectGenresModalProps {
  isOpen: boolean;
  genreChoices: GenreChoice[];
  onSelect: (genreChoice: GenreChoice) => void;
  onClose: () => void;
  onRemoveAll: () => void;
}

const SelectGenresModal = ({
  isOpen,
  genreChoices, 
  onSelect,
  onClose,
  onRemoveAll
}: SelectGenresModalProps) => {
  const onClick = ((genreChoice: GenreChoice) => {
    onSelect({...genreChoice, selected: !genreChoice.selected});
  });

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
           <Tooltip message="Select up to 4 genre seeds for recommendations">
              Select &nbsp; <span className="hidden md:block"> Genres</span>
            </Tooltip>
          </h1>

        <button 
          onClick={onRemoveAll}
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
          flex-wrap
          justify-center
          gap-2
          overflow-scroll
          overflow-y-hidden
          py-2
          mx-2
      ">
        {genreChoices.map((g: GenreChoice) => 
          <button 
            key={g.genre}
            onClick={() => onClick(g)}
            className={`
            ${g.selected ? "bg-green-800": "bg-neutral-700"}
            ${g.selected ? "hover:bg-green-600": "hover:bg-neutral-600"}
            text-neutral-300
            rounded-full
            px-2
            py-1
          `}>
            {g.genre}
          </button>

        )}
      </div>
    </div>
  )

  return (
    
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default SelectGenresModal;
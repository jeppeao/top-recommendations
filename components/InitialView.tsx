import { BiLeftArrowAlt } from "react-icons/bi";

interface InitialViewProps {
  isLoading: boolean;
  numberOfTracks: number;
}

const InitialView = ({isLoading, numberOfTracks}: InitialViewProps) => {
  return (
    <div className="mt-32">
      <p className="
        text-neutral-400
        text-sm
        md:text-lg
        w-full
        flex
        justify-center"
      >
        {
          isLoading 
          ? "Fetching liked songs from spotify" 
          : `Fetched ${numberOfTracks} liked songs from spotify`
        }
      </p>

      <div className="
        flex
        justify-center
        overflow-hidden
      ">
        <h1 className="
        flex
        items-center
        gap-4
        truncate
        mt-1
        text-violet-400
        md:text-2xl
        lg:text-4xl
        ">
          { isLoading
          ? <span className="truncate">Please wait, the music is on it's way</span>
          : <>
              <span><BiLeftArrowAlt size={48}/></span> 
              <span className="truncate">Load Suggestions to get started</span>
            </>
          }   
        </h1>
          
        
      </div>
    </div>
  )
}

export default InitialView;
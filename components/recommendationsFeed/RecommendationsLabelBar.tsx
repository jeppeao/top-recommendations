import Tooltip from "../Tooltip";
import { BiTime } from "react-icons/bi"
const RecommendationsLabelBar = () => {
   
   return (
    <>
    <div 
      className="
        w-full
        h-32
        bg-gradient-to-b
        from-indigo-950
        to-neutral-900
        px-4
        flex
        items-end        
      ">
      <div className="w-full grid grid-cols-6 pb-1">
        <div className="
          text-neutral-400
          col-span-4
          md:col-span-3
          space-x-4
          px-8
        ">
          <span >#</span>
          <span className="text-sm">Title</span>
        </div>
        <div className="
          text-neutral-400
          text-sm
          hidden
          md:block
          md:col-span-2
          ml-3
        ">
          Album
        </div>
        <div className="
          col-span-1
          w-full
          flex
          justify-end
          pr-7
        ">
          <Tooltip message="duration">
            {<BiTime size={20} className="text-neutral-400"/>}
          </Tooltip>

        </div>
      </div> 
    </div>
    <hr className="h-px bg-stone-800 border-0"/>
    </>
  )
}

export default RecommendationsLabelBar;
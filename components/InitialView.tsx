import { BiLeftArrowAlt } from "react-icons/bi";

const InitialView = () => {
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
        Status: ready
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
          <span><BiLeftArrowAlt size={48}/></span> 
          <span className="truncate">Load Suggestions to get started</span>
        </h1>
      </div>
    </div>
  )
}

export default InitialView;
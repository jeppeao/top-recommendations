import { BsFillLightbulbFill }from 'react-icons/bs'

const RecommendationsHeader = () => {
  return (
    <div 
      className="
        bg-gradient-to-b 
        from-violet-900 
        to-indigo-900 
        w-full 
        h-72
        rounded-t-lg
        flex
        flex-col
        pb-4
    ">
      <div className="h-28"></div>
      <div 
        className="
          grow
          flex
          items-center
      ">
        <div 
          className="
            h-40
            w-40
            bg-white
            mx-4
            md:h-48
            md:w-48
            bg-gradient-to-br
            from-violet-900
            to-stone-400
            flex
            justify-center
            items-center
        ">
          <BsFillLightbulbFill size={64}/>
        </div>
        <div className="
          h-full 
          flex 
          flex-col 
          justify-end 
          gap-3
          lg:gap-0
          lg:justify-between
        ">
          <p className="text-sm font-bold">From liked</p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">Suggestions</h1>
          <p className="text-sm font-bold">From liked</p>
        </div>
      </div>
    </div>

  )
}

export default RecommendationsHeader;
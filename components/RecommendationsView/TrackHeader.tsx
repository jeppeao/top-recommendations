import { BsFillLightbulbFill }from 'react-icons/bs'
import UserInfo from './UserInfo';
import { useRecoilValue } from 'recoil';
import { likedTracks } from '@/recoilAtoms/likedAtom';

const TrackHeader = ({tracks}: any) => {
  const liked = useRecoilValue(likedTracks);
  
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
        pt-2
        pr-4
    ">
      <div className="h-28 flex justify-end">
        <UserInfo />
      </div>
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
          <BsFillLightbulbFill size={64} className='text-neutral-200'/>
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
          <p className="text-sm font-bold text-neutral-200">from playlist Liked Songs ({liked.length} songs)</p>
          <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-neutral-200">Suggestions</h1>
          <p className="text-sm font-bold text-neutral-200"> {tracks.length} recommendations</p>
        </div>
      </div>
    </div>

  )
}

export default TrackHeader;
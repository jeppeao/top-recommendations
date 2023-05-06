import { useSession, signOut } from "next-auth/react";
import { BsSpotify } from "react-icons/bs";
import SpotiButton from "../SpotiButton";
import { AiOutlineLogout } from "react-icons/ai"
import Tooltip from "../Tooltip";

const ConnectionView = () => {
  const { data: session } = useSession();
  const username = session ? session.user?.name : '';

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-4 w-full p-6">
        {
          session ?
          <Tooltip message="open spotify in new tab">
            <a target="_blank" href="https://spotify.com/" rel="noopener noreferrer">
              <SpotiButton 
                onClick={()=> {}} 
                label={`User \xa0 | \xa0 ${username}`} 
                icon={<BsSpotify size={32}/>}
              /> 
            </a>
          </Tooltip> : 
              <SpotiButton 
              onClick={()=> {}} 
              label={"Not signed in"} 
              icon={<BsSpotify size={32}/>}
              disabled={true}
            />
        }
        {
          session ?
            <SpotiButton 
              onClick={signOut} 
              label={"Logout"} 
              icon={<AiOutlineLogout size={32}/>}
            /> : null
        }

 
          


      </div>
    </div>
  )
 
}

export default ConnectionView;


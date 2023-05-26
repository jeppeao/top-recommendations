import { useSession, signOut } from "next-auth/react";
import { BsSpotify } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import SpotiButton from "../SpotiButton";
import { AiOutlineLogout } from "react-icons/ai"
import Tooltip from "../Tooltip";
import { BiLogInCircle } from "react-icons/bi";
import Link from "next/link";

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
              label={"Not connected"} 
              icon={<BsSpotify size={32}/>}
              disabled={true}
            />
        }
        {
          session ?
            <SpotiButton 
              onClick={signOut} 
              label={"Disconnect"} 
              icon={<AiOutlineLogout size={32}/>}
            /> : 
            <Tooltip message="go to login page">
            <Link href="/login">
              <SpotiButton 
                onClick={()=> {}} 
                label={`To login`} 
                icon={<BiLogInCircle size={32}/>}
              /> 
            </Link>
            </Tooltip>
          }

 
          


      </div>
    </div>
  )
 
}

export default ConnectionView;


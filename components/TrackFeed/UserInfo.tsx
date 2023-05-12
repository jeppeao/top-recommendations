import { useSession } from "next-auth/react";
import { RiUserLine } from "react-icons/ri"
import Tooltip from "../Tooltip";

const UserInfo = ( user?: any ) => {
  const { data: session } = useSession();
  
  const imgSrc = session?.user?.image === null ? undefined : session?.user?.image;


  return (
    
    <div className="mx-6 my-6 cursor-pointer">
      <Tooltip message={session?.user?.name || 'unknown'}>
      <div className="w-8 rounded-full hover:opacity-80">
        {imgSrc !== undefined ?
        <img
        className="rounded-full"
          src={imgSrc}
          alt="User"
        />
        :
        <RiUserLine 
          size={34} 
          className="
            text-neutral-100
            border-neutral-800
            bg-neutral-800
            rounded-full
            border-4"
          />
        }
      </div>
      </Tooltip>
    </div>
  );
}

export default UserInfo;
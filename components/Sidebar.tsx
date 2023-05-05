import { useSession } from "next-auth/react";
import ConnectionView from "./sidebar/ConnectionView";

const Sidebar = (props: any) => {
  const { data: session, status } = useSession();

  return (
    <div 
      style = {{ minWidth: '250px' }}
      className="w-1/4 max-w-sm rounded-lg flex flex-col gap-2"
    >
      <div className="bg-neutral-900 w-full h-32 rounded-lg" >
        <ConnectionView />
      </div>
      <div className="bg-neutral-900 w-full grow rounded-lg">

      </div>
    </div>
  )
}

export default Sidebar;


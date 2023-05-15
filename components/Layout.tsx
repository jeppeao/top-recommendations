import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {


  return (
    <div className="h-screen max-h-full h-[100vh] bg-black flex flex-col">
      <div className="flex w-full min-h-full p-2 gap-2 overflow-hidden">

        <Sidebar/> 
        <div className="
          bg-neutral-900
          rounded-lg
          overflow-hidden
          w-full
        ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
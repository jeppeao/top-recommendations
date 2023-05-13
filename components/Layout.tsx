import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen max-h-full bg-black flex flex-col">
      <div className="flex w-full p-2 gap-2 overflow-hidden">

        <Sidebar/> 
        <div className="
          bg-neutral-900
          rounded-lg
          overflow-y-scroll
          overflow-x-hidden
          w-full
        ">
          {children}
        </div>
      </div>
      <div className="h-20 shrink-0">

      </div>
    </div>
  )
}

export default Layout;
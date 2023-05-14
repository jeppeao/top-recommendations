import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const handleScroll = (e: any) => {
    console.log("hello")
  }

  return (
    <div className="h-screen max-h-full h-[100vh] bg-black flex flex-col">
      <div className="flex w-full p-2 gap-2 overflow-hidden">

        <Sidebar/> 
        <div className="
          bg-neutral-900
          rounded-lg
          overflow-hidden
          w-full
        " onScroll={handleScroll}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
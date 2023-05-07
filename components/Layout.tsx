import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen bg-black">
      <div className="flex h-fit w-full p-2 gap-2">

        <Sidebar/> 
        <div className="bg-neutral-900 rounded-lg grow">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
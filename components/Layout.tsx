import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [width, setWidth] = useState('');

  useEffect(() => {
    setWidth(window.location.search)
  }, [])

  return (
    <div className="h-screen bg-black">
      <div className="flex h-full w-full p-2 gap-2">
        {/* <div 
          style = {{ minWidth: '250px' }}
          className="w-1/4 max-w-sm bg-neutral-900 rounded-lg"
        >
          {width}
        </div> */}
        <Sidebar/> 
        <div className="bg-neutral-900 rounded-lg grow">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
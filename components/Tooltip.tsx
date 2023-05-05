import { ReactNode } from "react";

interface TooltipProps {
  message: string,
  children: ReactNode
}

const Tooltip = ({ message, children }: TooltipProps) => {
  return (
  <div className="group relative flex w-fit">
      {children}
      <span 
        className="
          absolute
          opacity-0
          group-hover:opacity-100
          group-hover:delay-200
          transition-opacity
          -top-7
          left-1/2
          -translate-x-1/2
          rounded
          bg-neutral-800
          px-2
          py-1
          text-sm
          text-neutral-100
          w-fit
          whitespace-nowrap
          pointer-events-none
        "
      >{message}</span>
  </div>
  )
}







// const Tooltip = () => {




//   return (
//     <div 
//       className="
//         relative
//         inline

//       ">
//         Tooltip Trigger
//         <div 
//           className="
            
//             opacity-0
//             hover:opacity-100
//             transition:opacity
//             delay-300
//             bg-neutral-800
//             text-center
//             rounded-md
//             w-fit
//             z-1
//             px-2
//             py-1
//             text-neutral-100
//             text-sm
//             absolute
//             -right-1/2
            
//           ">
//             Tooltip Text
//         </div>
//     </div>
// )
// }

export default Tooltip;
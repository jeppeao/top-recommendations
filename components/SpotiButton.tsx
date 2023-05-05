import { ReactNode } from "react";

interface SpotiButtonProps {
  label?: string;
  icon: ReactNode;
  onClick: () => void;
}

const SpotiButton = ({ label, icon, onClick }: SpotiButtonProps) => {
  return (
    <button 
      className="
        text-neutral-400
        font-bold
        flex
        items-center
        gap-4
        hover:text-neutral-200
        max-w-full
      "
      onClick={onClick}
    >
      {icon}
      <span className="truncate">{ label }</span>
    </button>
  );
}

export default SpotiButton;
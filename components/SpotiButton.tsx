import { ReactNode } from "react";

interface SpotiButtonProps {
  label?: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const SpotiButton = ({
  label,
  icon,
  onClick,
  disabled
 }: SpotiButtonProps) => {

  return (
    <button 
      className={`
        ${disabled ? "pointer-events-none" : ""}
        text-neutral-400
        font-bold
        flex
        items-center
        gap-4
        max-w-full
        hover:text-neutral-200
      `}
      onClick={onClick}
    >
      {icon}
      <span className="truncate">{ label }</span>
    </button>
  );
}

export default SpotiButton;
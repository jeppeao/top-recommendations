import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactElement;
}

const Modal = ({ isOpen, onClose, body }: ModalProps ) => {
  return (
    <div className={`
      ${isOpen ? "block" : "hidden"}
      w-screen
      h-screen
      bg-opacity-60
      fixed
      top-0
      left-0
      bg-neutral-700
      flex
      justify-center
      items-center
      z-50
    `}>
      <div className="
        h-fit
        w-fit
        bg-neutral-900
        relative
        rounded-lg
      ">
        <div className="
          flex
          justify-end
          p-1
          mb-1
          bg-neutral-800
          rounded-t-lg
        ">
          <button 
            onClick={onClose}
            className="
            hover:opacity-80
          ">
            <AiOutlineClose size={20} color={"lightgrey"}/>
            
          </button>
        </div>
        {body}  
      </div>
    </div>
  );
}

export default Modal;
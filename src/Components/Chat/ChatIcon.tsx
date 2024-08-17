import React from 'react';
import { FaComments } from 'react-icons/fa';
import { useSelector } from 'react-redux';
interface Props {
    onClick: () => void;
}
const ChatIcon: React.FC<Props> = ({ onClick }) => {
  const {user} = useSelector((state: any) => state.auth);
  if(!user) return null;
  return (
    <div className="fixed bottom-5 right-5">
      <div 
        className="relative bg-primary text-white rounded-full p-3 cursor-pointer flex items-center space-x-2" 
        onClick={onClick}
      >
        <FaComments size={24} />
        <span>Chat</span>
        <div className="absolute top-[-5px] right-0 bg-primary/40 text-xs rounded-full h-6 w-6 flex items-center justify-center">
          0
        </div>
      </div>
    </div>
  );
};

export default ChatIcon;

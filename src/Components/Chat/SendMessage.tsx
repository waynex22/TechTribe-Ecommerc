import React, { KeyboardEvent, useRef } from 'react';
import { useSendMessageMutation } from 'src/redux/rtkQuery/chat';

interface Props {
    user: any;
    roomChat: any;
    newChat: any;
    refecth: () => void
}
const SendMessage: React.FC<Props> = ({ user, roomChat, newChat, refecth }) => {
    const [message, setMessage] = React.useState<string>('');
    const [sendMessage] = useSendMessageMutation();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleSendMessage = () => {
        if (roomChat) {
            const payload = {
                id_room: roomChat?._id,
                id_customer: user?.sub,
                id_shop: newChat?.shopId,
                content: message,
            }
            sendMessage(payload);
            refecth();
        } else {
            const payload = {
                id_customer: user?.sub,
                id_shop: newChat?.shopId,
                content: message,
            }
            sendMessage(payload);
            refecth();
        }
        setMessage('');
    }
    return (
        <>
       
            <textarea
                value={message}
                ref={textareaRef}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className='w-full h-8 text-xs border-0 outline-0 focus:ring-0 resize-none'
                placeholder="Nhập tin nhắn..."
            />
            <div className='flex items-center justify-end p-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className={`size-5 ${message === '' ? 'cursor-not-allowed text-gray-400' : 'text-primary/70 cursor-pointer'}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
            </div>

        </>
    )
};

export default SendMessage;

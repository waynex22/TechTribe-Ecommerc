import React, { KeyboardEvent, useRef, useState } from 'react';
import requestApi from 'src/helper/api';
import { useSendMessageMutation } from 'src/redux/rtkQuery/chat';

interface Props {
    user: any;
    roomChat: any;
    newChat: any;
    refecth: () => void
}
interface MediaPreview {
    preview: string;
    type: string;
}

const SendMessage: React.FC<Props> = ({ user, roomChat, newChat, refecth }) => {
    const [message, setMessage] = useState<string>('');
    const [sendMessage] = useSendMessageMutation();
    const [prevMedia, setPrevMedia] = useState<MediaPreview[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const previewList = Array.from(files).map(file => ({
                preview: URL.createObjectURL(file),
                type: file.type,
                name: file.name
            }));
            setPrevMedia(previewList);
        }
    };
    const handleSendMessage = () => {
        if(prevMedia.length > 0){
            uploadFiles();
            return
        }
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
    const sendmess = (data: any) => {
        if (data) {
            const payload = {
                id_room: roomChat?._id,
                id_customer: user?.sub,
                id_shop: newChat?.shopId,
                content: data
            }
            sendMessage(payload);
            refecth();
        }
    }
    const uploadFiles = async () => {
        const formData = new FormData();
        prevMedia.forEach((file: any) => {
            formData.append('files', file);
        });
        setPrevMedia([])
        requestApi('upload/files', 'POST', formData, 'multipart/form-data')
            .then(file => {
                const thumbnails = file.data.filenames.filter((media: string) => !media.endsWith('.mp4') && !media.endsWith('.webm'));
                thumbnails.map((thumbnail: string) =>
                   sendmess({
                        id_room: roomChat?._id,
                        id_customer: user?.sub,
                        id_shop: newChat?.shopId,
                        thumbnail: thumbnail
                    })
                )
            })
            .catch(errFile => {
                console.log(errFile);
            })
    };    
    return (
        <>
        <div className='flex items-center justify-between gap-2 w-full'>
            <div className='flex items-center gap-2'>
            <label className="flex items-center cursor-pointer border border-solid border-gray-200 rounded-lg">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <svg
                        className="size-10"
                        xmlns="http://www.w3.org/2000/svg"
                        width="96"
                        height="96"
                        fill="none"
                        viewBox="0 0 96 96"
                        id="image-add"
                    >
                        <circle cx="35" cy="31" r="6" stroke="#000" strokeWidth="5"></circle>
                        <path
                            stroke="#000"
                            strokeLinecap="round"
                            strokeWidth="5"
                            d="M68 16L86 16M77 7L77 25M52.5 9H24C15.7157 9 9 15.7157 9 24V71C9 79.2843 15.7157 86 24 86H71C79.2843 86 86 79.2843 86 71V52.5 49.3137C86 47.192 85.1571 45.1571 83.6569 43.6569L79.182 39.182C77.4246 37.4246 74.5754 37.4246 72.818 39.182L51.682 60.318C49.9246 62.0754 47.0754 62.0754 45.318 60.318L39.682 54.682C37.9246 52.9246 35.0754 52.9246 33.318 54.682L11 77"
                        ></path>
                    </svg>
                </label>
                {prevMedia.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {prevMedia.map((media, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={media.preview}
                                    alt={`preview-${index}`}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <button
                                    className="absolute top-1 right-1 bg-gray-200 rounded-full p-1"
                                    onClick={() =>
                                        setPrevMedia(prev => prev.filter((_, i) => i !== index))
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-gray-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            <textarea
                value={message}
                ref={textareaRef}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className='w-full h-8 text-xs border-0 outline-0 focus:ring-0 resize-none'
                placeholder="Nhập tin nhắn..."
            />
            </div>
            <div className="flex items-center justify-end p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-5 ${message === '' && prevMedia.length === 0 ? 'cursor-not-allowed text-gray-400' : 'text-primary/70 cursor-pointer'}`}
                            onClick={(message !== '' || prevMedia.length > 0) ? handleSendMessage : undefined}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                        </svg>
                    </div>
                </div>
                
        </>
    )
};

export default SendMessage;

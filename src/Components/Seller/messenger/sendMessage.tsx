import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import requestApi from '../../../helper/api';
import { IoMdRemoveCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../redux/hook';
import { SelectListRoomChatByShop } from '../../../redux/features/message';
import { SelectShop } from '../../../redux/features/shop';
import ItemSendMessageProduct from './itemSendMessage/product';
import ItemSendMessageThumbnail from './itemSendMessage/thumbnail';
import ItemSendMessageVideo from './itemSendMessage/video';
import ItemSendMessageOrder from './itemSendMessage/order';

const SendMessageComponent = ({ id_customer, idRoomChat }: { id_customer: string, idRoomChat: string }) => {
    const [content, setContent] = useState('');
    const [loadSend, setLoadSend] = useState(false);
    const listRoom = useAppSelector(SelectListRoomChatByShop)
    const shop = useAppSelector(SelectShop)
    const [listFile, setListFile] = useState([] as File[])
    const [prevMedia, setPrevMedia] = useState<{ preview: string, type: string }[]>([]);
    const [showList, setShowList] = useState('')

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(()=>{
        if (textareaRef.current)
            textareaRef.current.focus();
    },[idRoomChat, id_customer, listRoom, shop._id, loadSend, listFile])

    useEffect(() => {
        const room = listRoom.find(item => item._id === idRoomChat)
        if (room)
            if (!room.id_lastMess.isWatched && room.id_lastMess.id_sender !== shop._id)
                requestApi(`messenger/${idRoomChat}`, 'PATCH', {}, 'application/json')
    }, [idRoomChat, id_customer, listRoom, shop._id]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const mediaFiles = Array.from(files).filter(file =>
                file.type.startsWith('image/') || file.type.startsWith('video/')
            );
            const mediaFilesArray = mediaFiles.map(file => ({
                preview: URL.createObjectURL(file),
                type: file.type.startsWith('image/') ? 'image' : 'video'
            }));

            setPrevMedia(prev => [...prev, ...mediaFilesArray]);
            setListFile(prev => [...prev, ...mediaFiles]);
        }
    };

    const deleteFile = (index: number) => {
        const newArrShow = prevMedia.filter((item, i) => i !== index);
        const newArrFile = listFile.filter((item, i) => i !== index);

        setPrevMedia(newArrShow);
        setListFile(newArrFile);
    };

    const handleSubmit = (id_product?: string) => {
        if (content.trim()) {
            const data = { id_customer, content: content.trim() };
            sendMess(data)
        }
        if (listFile.length > 0) {
            uploadFiles()
        }
        if(id_product) {
            const data = { id_customer, id_product };
            sendMess(data)
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent newline
            handleSubmit();
        }
    };

    const sendMess = (data: { id_customer: string, content?: string, thumbnail?: string, video?: string, id_product?: string, id_order?: string }) => {
        setLoadSend(true);
        setContent('');
        requestApi('messenger', 'POST', data, 'application/json')
            .then(() => {
                setLoadSend(false);
            })
            .catch(() => {
                setLoadSend(false);
            });
    }
    const uploadFiles = async () => {
        setLoadSend(true);
        const formData = new FormData();
        listFile.forEach((file: File) => {
            formData.append('files', file);
        });

        setListFile([])
        setPrevMedia([])
        requestApi('upload/files', 'POST', formData, 'multipart/form-data')
            .then(file => {
                const thumbnails = file.data.filenames.filter((media: string) => !media.endsWith('.mp4') && !media.endsWith('.webm'));
                const videos = file.data.filenames.filter((media: string) => media.endsWith('.mp4') || media.endsWith('.webm'));
                videos.map((video: string) =>
                    sendMess({ id_customer, video })
                )
                thumbnails.map((thumbnail: string) =>
                    sendMess({ id_customer, thumbnail })
                )
                setLoadSend(false);
            })
            .catch(errFile => {
                toast.error('Có lỗi khi thêm ảnh')
                console.log(errFile);
                setLoadSend(false);
            })
    };
    const handleListShow = (value: string) =>{
        if(value === showList) 
            setShowList('')
        else 
            setShowList(value)
    }
    return (
        <div className='p-2 bg-white flex-none  border-t'>
            {prevMedia &&
                <div className='overflow-x-auto w-full'>
                    <div className='flex gap-2 py-2 min-w-max'>
                        {prevMedia.map((media, index) => (
                            <div key={index} className="relative">
                                {media.type === 'image' ? (
                                    <img
                                        src={media.preview}
                                        alt="Preview"
                                        className="border rounded object-cover w-20 h-20"
                                    />
                                ) : (
                                    <div className='relative'>
                                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[50px]'>
                                            <IoPlayCircleOutline />
                                        </div>
                                        <video
                                            src={media.preview}
                                            className="border rounded object-cover w-20 h-20"
                                        ></video>
                                    </div>
                                )}

                                <div
                                    onClick={() => deleteFile(index)}
                                    className="absolute -top-2 -right-2 text-xl cursor-pointer"
                                >
                                    <IoMdRemoveCircle />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <textarea
                value={content}
                ref={textareaRef}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className='w-full h-8 text-xs outline-none resize-none'
                placeholder="Nhập tin nhắn..."
            />

            <div className='flex items-center justify-between px-2'>
                <div className='flex gap-4 pt-2 text-gray-500 items-center'>

                   <ItemSendMessageThumbnail onHandleFileChange={handleFileChange} />

                    <ItemSendMessageVideo onHandleFileChange={handleFileChange} />


                    <ItemSendMessageOrder onSendMess={sendMess} id_customer={id_customer} showList={showList} onHandleListShow={handleListShow} />

                    <ItemSendMessageProduct onHandleSubmit={handleSubmit} showList={showList} onHandleListShow={handleListShow} />

                </div>
                <button
                    onClick={()=>handleSubmit()}
                    className={`text-lg ${loadSend ? 'cursor-wait' : ''}`}
                    disabled={loadSend}
                >
                    <LuSendHorizonal />
                </button>
            </div>
        </div>
    );
};

export default SendMessageComponent;

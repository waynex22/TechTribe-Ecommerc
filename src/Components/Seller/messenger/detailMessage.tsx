import React, { useEffect, useRef, useState } from 'react'
import { FaFileImage, FaVideo } from 'react-icons/fa';
import { LuSendHorizonal } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchRoomChatByID, SelectLoadingRoomChat, SelectRoomChatDetail } from '../../../redux/features/message';
import { SelectShop } from '../../../redux/features/shop';
import SendMessageComponent from './sendMessage';
import { BiCheckDouble } from "react-icons/bi";
import UseIntersectionObserver from './useIntersectionObserver';
import ItemDetailMess from './itemDetailMess';
import { typeRoomChat } from '../../../utils/types/roomChat';
import requestApi from '../../../helper/api';

const DetailMessage = ({ idRoomChat, onHandleShowImgae }: { idRoomChat: string, onHandleShowImgae: (image?: string | undefined) => void }) => {
    const dispatch = useAppDispatch();
    const message = useAppSelector(SelectRoomChatDetail);
    const loading = useAppSelector(SelectLoadingRoomChat);
    const shop = useAppSelector(SelectShop);
    const [isLoad, setIsLoad] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const messageStartRef = useRef<HTMLDivElement>(null);
    const [skip, setSkip] = useState(2)
    const [moreMessage, setMoreMessage] = useState({} as typeRoomChat)
    const [loadMoreMess, setLoadMoreMess] = useState(false)
    const [endChat, setEndChat] = useState(false)
    // Fetch room chat data
    useEffect(() => {
        dispatch(fetchRoomChatByID(idRoomChat));
        setIsLoad(true);
    }, [dispatch, idRoomChat]);

    // Reset loading state when loading changes
    useEffect(() => {
        setIsLoad(false);
    }, [loading]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setSkip(2)
        setLoadMoreMess(false)
        setEndChat(false)
        setMoreMessage({} as typeRoomChat)
    }, [message.messenger]);
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({});
        }
    }, [])

    const isVisible = UseIntersectionObserver(messageStartRef, {
        root: null, // Theo dõi trong viewport
        rootMargin: '0px',
        threshold: 1.0 // Đảm bảo phần tử hoàn toàn hiển thị
    });

    useEffect(() => {
        if (isVisible && !loadMoreMess && !endChat) {
            setLoadMoreMess(true)
            console.log('fechapi');
            callApiMess()
            setTimeout(() => {
                setLoadMoreMess(false)
            }, 1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endChat, idRoomChat, isVisible, loadMoreMess, moreMessage, skip]);

    const callApiMess = () => {
        requestApi(`room-chat/detail/${idRoomChat}?skip=${skip}`, 'GET', {}, 'application/json')
            .then((data) => {
                setLoadMoreMess(false)
                setSkip(skip + 1)
                const message = data.data
                let newMess: typeRoomChat = message
                if (message.messenger.length === 0) {
                    setEndChat(true)
                }
                if (moreMessage && Object.keys(moreMessage).length > 0) {
                    newMess = {
                        ...message,
                        messenger: [
                            ...newMess.messenger,
                            ...moreMessage.messenger,
                        ]
                    }
                }

                setMoreMessage(newMess)

            })
    }
    return (
        <>
            {message && message._id && !isLoad && (
                <div className='flex flex-col h-full'>
                    <div className='px-4 py-2 flex gap-2 bg-white items-center border-b flex-none'>
                        <img className='w-7 h-7 rounded-full border' src={message.id_customer.avata} alt="" />
                        <p className='text-sm font-normal'>{message.id_customer.name}</p>
                    </div>

                    <div className='bg-gray-100 p-2 flex-1 overflow-auto flex flex-col gap-2 text-sm'>
                        <div ref={messageStartRef} >
                            {loadMoreMess &&
                                <div role="status" className=' flex justify-center ' >
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                        </div>

                        {moreMessage && moreMessage.messenger && <ItemDetailMess
                            message={moreMessage}
                            shop={shop}
                            onHandleShowImgae={onHandleShowImgae}
                        />}

                        {message && <ItemDetailMess
                            message={message}
                            shop={shop}
                            onHandleShowImgae={onHandleShowImgae}
                        />}

                        <div ref={messageEndRef} className=' ml-auto' >
                            {message.id_lastMess.id_sender === shop._id && (
                                !message.id_lastMess.isWatched ?
                                    <BiCheckDouble /> :
                                    <img className=' w-4 h-4 rounded-full object-cover' src={message.id_customer.avata} alt="" />
                            )}
                        </div>
                    </div>

                    <SendMessageComponent id_customer={message.id_customer._id} idRoomChat={idRoomChat} />
                </div>
            )}
            {loading && isLoad && <LoadComponentDetailMessage />}

        </>
    );
};


const LoadComponentDetailMessage = () => {
    return (
        <div className=' flex flex-col h-full'>
            <div className='px-4 py-2 flex gap-2 bg-white items-center border-b flex-none'>
                <div className='w-7 h-7 rounded-full border bg-gray-200 animate-pulse'></div>
                <div className='w-32 h-5 bg-gray-200 animate-pulse rounded'></div>
            </div>

            {/* Khu vực Tin nhắn Skeleton */}
            <div className='bg-gray-100 p-2 flex-1 space-y-2'>
                <div className=' w-full h-full flex items-center justify-center'>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 "></div>

                </div>
            </div>


            <div className=' p-2 bg-white flex-none'>
                <textarea name="" className=' w-full h-8 text-xs outline-none' id=""></textarea>

                <div className=' flex items-center justify-between px-2'>
                    <div className=' flex gap-4 pt-2 text-gray-500 items-center'>
                        <div className=' group relative'>
                            <p className='w-5 cursor-pointer'><FaFileImage /></p>
                            <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'> Ảnh </p>
                        </div>
                        <div className=' group relative'>
                            <p className='w-5 cursor-pointer'><FaVideo /></p>
                            <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'> Video </p>
                        </div>
                        <div className=' group relative'>
                            <img className='w-5 cursor-pointer' height="" src="https://img.icons8.com/parakeet-line/48/purchase-order.png" alt="purchase-order" />
                            <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'> Order </p>
                        </div>
                        <div className=' group relative'>
                            <img className='w-5 cursor-pointer' height="" src="https://img.icons8.com/?size=100&id=59867&format=png&color=000000" alt="purchase-product" />
                            <p className=' hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'> Sản phẩm </p>
                        </div>
                    </div>
                    <p className=' text-lg'><LuSendHorizonal /></p>
                </div>
            </div>
        </div>
    )
}
export default DetailMessage
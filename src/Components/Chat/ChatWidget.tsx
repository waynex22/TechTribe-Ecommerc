import React from 'react';
import gifChat from './Sending Mail.gif';
import { useGetRoomChatDetailQuery, useGetRoomChatQuery, useSendMessageMutation } from 'src/redux/rtkQuery/chat';
import { useSelector, useDispatch } from 'react-redux';
import { setCloseChat, setShopSelected } from 'src/redux/slices/chatSlice';
import SendMessage from './SendMessage';
import useSocket from 'src/hooks/useSocket';
import DetailMessage from './DetailMessage';


const ChatWidget: React.FC = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const { user } = useSelector((state: any) => state.auth);
    const { shopSelected } = useSelector((state: any) => state.chat);
    const { data: roomChats, refetch: refetchRooms } = useGetRoomChatQuery(user);
    const [roomChat, setRoomChat] = React.useState<any | null>(null);
    const [newChat, setNewChat] = React.useState<any | null>(null);
    const [countMessage, setCountMessage] = React.useState(0)

    const existingRoomChat = React.useMemo(() =>
        roomChats?.find((chat: any) => chat.id_shop._id === shopSelected?.shopId),
        [roomChats, shopSelected]
    );

    const { data: roomChatDetail, refetch } = useGetRoomChatDetailQuery(
        existingRoomChat
            ? { id: existingRoomChat._id, id_customer: user?.sub, id_shop: existingRoomChat.id_shop._id }
            : { id: '', id_customer: user?.sub, id_shop: '' },
        { skip: !existingRoomChat }
    );
    const fecthNewMess = (id_room: string) => {
        refetchRooms();
        if (roomChat?._id === id_room) {
            refetch();
            console.log('fecth rom');
        }
    }
    React.useEffect(()=>{
        const count = roomChats?.filter((room: any) => !room.id_lastMess.isWatched && room.id_lastMess.id_sender === shopSelected?.shopId ).length
        setCountMessage(count);
      },[roomChats, shopSelected])
    React.useEffect(() => {
        if (socket) {
            socket.on('messenger', (data: any) => {
                // console.log('Received message:', data);
                if (data.id_customer === user?.sub || data.id_shop === shopSelected.id_shop)
                    fecthNewMess(data.id_roomChat)
            });
            return () => {
                socket.off('messenger');
            };
        }
    }, [user?.sub, socket, shopSelected, fecthNewMess]);
    React.useEffect(() => {
        if (existingRoomChat) {
            setRoomChat(roomChatDetail);
            setNewChat(null);
            refetch();
        } else {
            setRoomChat(null);
            setNewChat(shopSelected);
        }
    }, [existingRoomChat, refetch, roomChatDetail, shopSelected]);

    const handleChooseShop = (idShop: string, shopName: string) => {
        dispatch(setShopSelected({ shopId: idShop, shopName: shopName }));
    };

    const onClose = () => {
        dispatch(setCloseChat());
    };
    return (
        <div className="fixed bottom-5 transition-all duration-500 right-5 z-[999] rounded-lg bg-white  w-[40%] h-[60%] shadow-xl border border-solid border-gray-200">
            <div className='flex justify-between items-center p-2 bg-slate-100 shadow-md rounded-lg'>
                <div className='flex items-center gap-2'>
                <p className='text-md text-primary'>Chat </p>
                <p className='text-xs text-primary font-light'>({countMessage})</p>
                </div>
                <svg onClick={onClose} className='size-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="down-arrow">
                    <path d="M23,12H9c-0.373,0-0.715,0.208-0.887,0.538c-0.173,0.331-0.146,0.73,0.067,1.035l7,10C15.368,23.841,15.674,24,16,24 s0.632-0.159,0.819-0.427l7-10c0.214-0.305,0.24-0.704,0.067-1.035C23.715,12.208,23.373,12,23,12z M16,21.256L10.921,14h10.158 L16,21.256z"></path>
                    <path d="M16,2C8.28,2,2,8.28,2,16s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z M16,28.133C9.31,28.133,3.866,22.69,3.866,16 S9.31,3.867,16,3.867S28.134,9.31,28.134,16S22.69,28.133,16,28.133z"></path>
                </svg>
            </div>
            <div className='flex w-full h-full'>
                <div className='w-1/3'>
                    <div className="overflow-y-auto">
                        {!roomChats || roomChats.length === 0 ? (
                            <div className='flex items-center justify-center w-full h-full'>
                                <p className='text-xs text-gray-400'>Chưa có tin nhắn nào</p>
                            </div>
                        ) : (
                            <>
                                {roomChats.map((conv: any, index: number) => (
                                    <div key={index} onClick={() => handleChooseShop(conv?.id_shop?._id, conv?.id_shop?.name)} className={`p-4 flex justify-between items-center  cursor-pointer ${conv?.id_shop?._id === shopSelected?.shopId ? 'bg-gray-200/60' : 'hover:bg-gray-200/30'}`}>
                                        <div className='flex gap-1 items-center'>
                                            <img src={conv?.id_shop?.thumbnail} className='w-8 h-8 object-cover rounded-full' alt="" />
                                            <div>
                                                <div className="font-normal text-sm">{conv.id_shop.name}</div>
                                                <div className="font-normal text-[12px] text-gray-400">{conv?.id_lastMess?.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className='w-[70%] bg-gray-200/40 backdrop-blur-0 h-full'>
                    {roomChat || newChat ? (
                        <>
                            {newChat ? (
                                <>
                                    <div className='flex flex-col justify-between w-full h-full'>
                                        <div className='p-2 border border-solid border-gray-100 w-full bg-white'>
                                            <p className='text-xs text-gray-800'>{newChat.shopName}</p>
                                        </div>
                                        <div className='flex-1 p-4'>
                                            
                                        </div>
                                        <div className='p-2 mb-10 bg-white flex items-center border-t border-solid border-gray-200'>
                                            <SendMessage user={user} roomChat={roomChat} newChat={shopSelected} refecth={refetchRooms} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex flex-col justify-between w-full h-full'>
                                        <div className='p-2 border border-solid border-gray-100 w-full bg-white'>
                                            <p className='text-xs text-gray-800'>{roomChat?.id_shop?.name}</p>
                                        </div>
                                        <div className='flex-1 p-4 overflow-y-auto'>
                                            <DetailMessage message={roomChat} shopSelected={shopSelected} />
                                        </div>
                                        <div className='p-2 mb-10 bg-white flex items-center border-t border-solid border-gray-200'>
                                            <SendMessage user={user} roomChat={roomChat} newChat={shopSelected} refecth={refetchRooms} />
                                        </div>
                                    </div>
                                </>
                            )}

                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <img className='w-1/2 h-1/2 object-cover' src={gifChat} alt="" />
                            <p>Chào mừng bạn đến với TechTribe Chat</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;

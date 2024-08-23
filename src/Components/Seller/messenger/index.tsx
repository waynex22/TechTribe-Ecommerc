import React, { useContext, useEffect, useState } from 'react'
import useSocket from '../../../hooks/useSocket';
import { IoCloseOutline } from 'react-icons/io5';
import ListRoomChatComponent from './listRoom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchListRoomByShop, fetchRoomChatByID, SelectListRoomChatByShop } from '../../../redux/features/message';
import DetailMessage from './detailMessage';
import EmptyMess from './emptyMess';
import { getToken } from '../../../utils/localStorage/token';
import { GetInfoUser } from '../../../services/authApi';
import { defaultUser, TypePayload } from '../../../utils/types/customer';
import { SelectShop } from '../../../redux/features/shop';
import Popup from '../../../Page/popup/popup';
import { MessageContex } from '../messageProvider';

const MessengerSellerComponent = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch()
  const { idShowRoomChat, setShowRoomChat } = useContext(MessageContex)
  const listRoom = useAppSelector(SelectListRoomChatByShop)
  const shop = useAppSelector(SelectShop)
  const [idRoomChat, setIdRoomChat] = useState('')
  const [infoUser, setInfoUser] = useState<TypePayload>(defaultUser);
  const token = getToken('access_token');
  const [showImage, setShowImage] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [countMessage, setCountMessage] = useState(0)

  useEffect(()=>{
    if (idShowRoomChat) {
      setShowChat(true)
      setIdRoomChat(idShowRoomChat)
      setShowRoomChat('')
    }
  },[idShowRoomChat, setShowRoomChat])

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        const res = await GetInfoUser();
        setInfoUser(res);
      } else {
        setInfoUser(defaultUser);
      }
    };

    getInfo();
  }, [token]);

  useEffect(() => {
    dispatch(fetchListRoomByShop())
  }, [dispatch])

  useEffect(()=>{
    const count = listRoom.filter((room) => !room.id_lastMess.isWatched && room.id_lastMess.id_sender !== shop._id ).length
    setCountMessage(count);
  },[listRoom, shop._id])

  const handleIdRoomChat = (id: string) => {
    setIdRoomChat(id)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fecthNewMess = (id_room: string) => {
    dispatch(fetchListRoomByShop())
    if (idRoomChat === id_room) {
      dispatch(fetchRoomChatByID(id_room))
      console.log('fecth rom');

    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('messenger', (data) => {
        console.log('Received message:', data);
        if (data.id_sender === infoUser.sub || data.id_shop === shop._id)
          fecthNewMess(data.id_roomChat)
      });

      // Clean up the event listener on component unmount
      return () => {
        socket.off('messenger');
      };
    }
  }, [infoUser.sub, socket, shop, fecthNewMess]);


  const handleShowImgae = (image?: string | undefined) => {
    if (!image) {
      setShowImage('')
    } else {
      setShowImage(image)
    }
  }
  return (
    <>
      <div className='fixed bottom-10 right-10'>
        <div className='flex gap-2'>
          {showChat ? <>
            <div className='bg-white rounded-md shadow-xl border-2'>
              <div className='flex items-center justify-between px-2 py-1 rounded-t-md bg-blue-500 text-white'>
                <p className='font-semibold font-primary text-xl '>
                  Chat <sup className='font-normal'>({listRoom.length || 0})</sup>
                </p>
                <p onClick={() => setShowChat(false)} className='text-xl cursor-pointer'>
                  <IoCloseOutline />
                </p>
              </div>

              <div className='flex h-[450px] border-t'>
                <div className='flex flex-col w-[240px] border-r overflow-y-auto'>
                  <ListRoomChatComponent
                    listRoom={listRoom}
                    idRoomChat={idRoomChat}
                    onHandleIdRoomChat={handleIdRoomChat}
                  />
                </div>
                <div className='relative w-[400px] h-full'>
                  {idRoomChat ? (
                    <DetailMessage
                      onHandleShowImgae={handleShowImgae}
                      idRoomChat={idRoomChat}
                    />
                  ) : (
                    <EmptyMess />
                  )}
                </div>
              </div>
            </div>
          </> :
            <>
              <div className=' relative'>
                <p className=' shadow-md absolute p-1 bg-primary border border-white rounded-full text-sm w-8 h-8 flex items-center justify-center text-white -top-4 -right-4'>
                  {countMessage}
                </p>
                <div onClick={() => setShowChat(true)} className='overflow-hidden flex group items-center bg-primary border p-2 rounded-2xl cursor-pointer shadow-lg transition-all ease-in-out duration-300 w-[44px] hover:w-[100px]'>
                  <img
                    src='https://img.icons8.com/?size=100&id=GFLRBaoZQQqB&format=png&color=FFFFFF'
                    className='w-7 h-7'
                    alt='Chat Icon'
                  />
                  <p className='transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:block hidden px-2 text-white font-semibold'>
                    Chat
                  </p>
                </div>
              </div>
            </>}
        </div>


      </div>

      {showImage && (
        <Popup onHandlePopup={handleShowImgae}>
          <div className='relative top-0 left-0 w-screen h-screen'>
            <div
              onClick={() => handleShowImgae()}
              className={`absolute inset-0 bg-cover bg-center blur-xl w-screen h-screen ${showImage.endsWith('.mp4') || showImage.endsWith('.webm') ? 'bg-black' : ''
                }`}
              style={{ backgroundImage: `url(${showImage})` }}
            ></div>
            <div
              onClick={() => handleShowImgae()}
              className='absolute top-0 left-0 z-50 w-screen h-screen flex items-center justify-center'
            >
              {showImage.endsWith('.mp4') || showImage.endsWith('webm') ? (
                <video
                  className='max-w-[600px] max-h-[600px] rounded-md shadow-md'
                  src={showImage}
                  controls
                  autoPlay
                ></video>
              ) : (
                <img
                  className='max-w-[600px] max-h-[600px] rounded-md shadow-md'
                  src={showImage}
                  alt='Main Content'
                />
              )}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MessengerSellerComponent
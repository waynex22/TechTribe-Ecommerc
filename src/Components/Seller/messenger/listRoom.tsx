import { BsSearch } from 'react-icons/bs';

import { typeRoomChat } from '../../../utils/types/roomChat';
import { useAppSelector } from '../../../redux/hook';
import { SelectShop } from '../../../redux/features/shop';
import { formatTimeAgo } from '../../../utils/fortmartNumberVnd/formartDate';

const ListRoomChatComponent = ({ listRoom, idRoomChat, onHandleIdRoomChat }: {
    listRoom: typeRoomChat[]
    idRoomChat: string
    onHandleIdRoomChat: (id: string) => void
}) => {
    const shop = useAppSelector(SelectShop)
    return (
        <>
            <div className=' px-2 py-1 border-b'>
                <div className=' rounded border flex items-center gap-2 px-2 text-xs text-gray-600'>
                    <p> <BsSearch /> </p>
                    <input type="text" className=' w-full' />
                </div>
            </div>
            {listRoom && listRoom.length > 0 &&
                listRoom.map(room => {
                    const countNewMess = room.messenger.filter(item=> !item.isWatched && item.senderType === 'Customer').length

                    return (
                        <div key={room._id} className={`${room._id === idRoomChat && ' bg-gray-100 '}`}>
                            <div onClick={() => onHandleIdRoomChat(room._id)} className='flex gap-2 rounded p-2 border-b text-sm cursor-pointer '>
                                <div className='flex-none border rounded-full w-10 h-10 overflow-hidden '>
                                    <img src={room.id_customer.avata} alt="" />
                                </div>
                                <div className='flex-grow w-5 cursor-pointer2'>
                                    <p className='font-semibold truncate'> {room.id_customer.name} </p>
                                    <p className={`truncate text-xs ${room.id_lastMess.isWatched || room.id_lastMess.senderType === 'Shop' ? 'text-gray-600 ' : 'font-semibold text-black'}`}>
                                        {room.id_lastMess.senderType === 'Shop' && 'Bạn: '}
                                        {room.id_lastMess.content && room.id_lastMess.content}
                                        {room.id_lastMess.thumbnail && '[Hình ảnh]'}
                                        {room.id_lastMess.video && '[Video]'}
                                        {room.id_lastMess.id_order && '[Đơn hàng]'}
                                        {room.id_lastMess.id_product && '[Sản phẩm]'}
                                    </p>
                                </div>
                                <div className=''>
                                    <p className=' text-xs text-gray-600'> {formatTimeAgo(room.id_lastMess.created_at)} </p>
                                    {countNewMess > 0 &&<p className=' m-auto shadow-md font-normal text-[10px] bg-primary border border-white rounded-full w-6 h-6 flex items-center justify-center text-white '>
                                        {countNewMess < 100 ? countNewMess : <>99 <sup>+</sup></> }
                                    </p>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ListRoomChatComponent
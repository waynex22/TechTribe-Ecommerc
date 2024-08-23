import React, { useEffect, useState } from 'react'
import useSocket from '../../../hooks/useSocket';
import { IoMdNotifications } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchNotification, SelectNotification } from '../../../redux/features/notification';
import { formatShowDate } from '../../../utils/fortmartNumberVnd/formartDate';
import requestApi from '../../../helper/api';
import EmptyBox from '../../../Components/Seller/marketing/discount/create/emptyBox';
import { typeNotification } from '../../../utils/types/notification';
import { TypePayload } from '../../../utils/types/customer';
import { GetInfoUser } from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';

const NotificationComponent = ({ nameShowItem, setShowItem }: {
    nameShowItem: string
    setShowItem: React.Dispatch<React.SetStateAction<string>>
}) => {
    const socket = useSocket();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const notifications = useAppSelector(SelectNotification)
    const [user, setUser] = useState({} as TypePayload)
    useEffect(() => {
        getUser()
    }, [])
    const getUser = async () => {
        const info = await GetInfoUser()
        setUser(info)
    }
    useEffect(() => {
        dispatch(fetchNotification())
    }, [dispatch])
    useEffect(() => {
        if (socket) {
            socket.on('notification', (data) => {
                if (data.customerId === user.sub)
                    dispatch(fetchNotification())
            });

            // Clean up the event listener on component unmount
            return () => {
                socket.off('notification');
            };
        }
    }, [dispatch, socket, user.sub]);

    const handleShowNotification = () => {
        setShowItem((item) => item !== 'notification' ? 'notification' : '')
    }

    const updateAllRead = () => {
        if (notifications.length > 0 && notifications.filter(i => !i.read).length > 0)
            requestApi('notification/shop/read', 'PATCH', {}, 'application/json')
                .then(() => dispatch(fetchNotification()))

    }
    const updateRead = (notificaiton: typeNotification) => {
        if (!notificaiton.read)
            requestApi(`notification/shop/read/${notificaiton._id}`, 'PATCH', {}, 'application/json')
                .then((data) => {
                    console.log(data);
                    dispatch(fetchNotification())
                })
                .catch(err => {
                    console.log(err);
                })

        if (notificaiton.type === 'order') {
            const orderCode = notificaiton.content.split('#')[1].split(' ')[0];
            navigate(`/seller/order/detail/${orderCode}`)
        }
    }
    

    return (
        <div className=" relative group">
            <div onClick={handleShowNotification} className="p-4 hover:bg-gray-100 cursor-pointer">
                {notifications.length > 0 && notifications.filter(i => !i.read).length > 0 &&
                    <p className=' absolute top-1 bg-primary text-white right-1 text-xs w-5 h-5 border rounded-full flex justify-center items-center'> {notifications.filter(i => !i.read).length} </p>}
                <p className=' text-xl'><IoMdNotifications /></p>
            </div>
            {nameShowItem === 'notification' &&
                <div className="absolute  -right-[120px] top-full pt-2">
                    <div className="  bg-white w-[350px] rounded-md shadow-lg border">
                        <div className=" py-2 px-4 flex justify-between text-xs font-normal">
                            <p>Thông báo gần đây</p>
                            <p onClick={updateAllRead} className=' hover:font-semibold cursor-pointer'>Đánh dấu đã đọc</p>
                        </div>
                        <div className=" max-h-[350px] overflow-y-auto border-y flex flex-col">
                            {notifications.length > 0 ?
                                notifications.map(item => {
                                    return (
                                        <div onClick={() => (updateRead(item))} key={item._id} className=" flex gap-2 border-b cursor-pointer px-4 py-2 hover:bg-gray-100">
                                            <img className=" w-10 h-10 rounded-full object-cover" src={item.orderItemsId && item.orderItemsId.items[0].productPriceId.id_product[0].thumbnails[0]} alt="" />
                                            <div className={`${!item.read ? 'font-bold' : 'font-normal text-gray-600'}`}>
                                                <p className=" text-sm text-left"> {item.title} </p>
                                                <p className=" text-left text-xs">
                                                    {item.content}
                                                </p>
                                                <p className="text-left text-xs pt-1"> {formatShowDate(item.createdAt)} </p>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div className=' px-15 text-sm'>
                                    <EmptyBox text='Bạn không có thông báo nào' />
                                </div>
                            }

                        </div>
                        {notifications.length > 10 && <div>
                            <p className=" px-4 text-primary text-center text-sm py-2">Xem tất cả thông báo</p>
                        </div>}
                    </div>
                </div>
            }
        </div>
    )
}

export default NotificationComponent
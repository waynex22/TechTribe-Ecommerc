import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSocket from 'src/hooks/useSocket';
import { useGetNotificationQuery, useReadNotificationMutation } from 'src/redux/rtkQuery/notification';
import { formatDateAndTime } from 'src/utils/formartDate';

interface Props {
    user: any;
}

const NotificationModal: React.FC<Props> = ({ user }) => {
    const socket = useSocket();
    const { data: notifications, refetch } = useGetNotificationQuery(user?.sub);
    const [readNotification] = useReadNotificationMutation();
    const countNotificationUnRead = notifications?.filter((item: any) => item.read === false).length || 0;

    useEffect(() => {
        if (socket) {
            socket.on('notification', (data: any) => {
                refetch();
            })
        }
        return () => {
            socket?.disconnect();
        }
    }, [user?.sub, socket, refetch, notifications])
    const handleReadNotification = async () => {
        if (countNotificationUnRead === 0) return
        await readNotification(user?.sub).unwrap();
        refetch();
    }
    return (
        <div className="relative">
            <div className="flex mx-2 relative group">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-7 relative cursor-pointer text-primary"
                >
                    <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                    <path
                        fillRule="evenodd"
                        d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                        clipRule="evenodd"
                    />
                </svg>
                {countNotificationUnRead > 0 && (
                    <div className="absolute w-[12px] h-[16px] top-[-5px] ml-4 rounded-full bg-red-500 text-white text-[12px]">
                        {countNotificationUnRead}
                    </div>
                )}
                <div onMouseEnter={() => handleReadNotification()} className="absolute right-0 top-full mt-2 w-[420px] bg-primary/10 backdrop-blur-lg shadow-lg rounded-lg p-4 z-10 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-300">
                    <div className='absolute right-0 top-[-15px] w-[200px] bg-transparent p-6'></div>
                    <div className="font-light-bold text-sm mb-2">Thông Báo Mới Nhận</div>
                    {notifications?.slice(0, 5).map((notif: any, index: number) => (
                        <div key={index} className="flex items-start justify-start gap-4 mb-2">
                            <div className="flex items-center justify-center w-[20%]">
                                {notif.type == 'order' ? (
                                    <>
                                        <img src={`http://localhost:8080/uploads/${notif.orderItemsId?.items[0].productPriceId?.id_product[0]?.thumbnails[0]}`} alt="" className='w-[50px] h-[50px] rounded-sm object-cover' />
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                            </div>
                            <div className='w-[70%] flex flex-col items-start justify-start gap-y-2'>
                                <h3 className="text-sm font-normal text-gray-900">{notif.title}</h3>
                                <p className="text-xs text-gray-600 text-start font-light">{notif.content}</p>
                                <p className='text-xs text-gray-600 font-light'>{formatDateAndTime(notif.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                    {notifications?.length > 5 && (
                        <Link to="/me/notification" className="text-primary font-normal text-sm">Xem tất cả</Link>
                    )}
                    {notifications?.length === 0 && (
                        <>
                            <div className='flex items-center justify-center'>
                                <img src="" alt="" />
                                <div className="text-gray-600 text-center">Chưa có thông báo mới</div>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;

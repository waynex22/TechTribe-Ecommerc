import { useSelector } from "react-redux";
import { useGetNotificationQuery } from "src/redux/rtkQuery/notification";
import ItemNotification from "./ItemNotification";
import EmptyNotification from "./EmptyNotification";
const NotificationWallet: React.FC = () => {
    const {user} = useSelector((state: any) => state.auth); 
    const {data: notifications} = useGetNotificationQuery(user?.sub, {
        skip: !user
    });
    const listNotificationWallet = notifications?.filter((item: any) => item.type === 'wallet');
    return (
        <>  
        <h2>Thông báo ví</h2>
        <div className="bg-white rounded-lg min-h-[400px] my-2">
            <div className="flex items-center justify-end px-4 py-2 border-b border-dashed border-gray-200">
                <p className="text-xs font-normal text-gray-500">Đánh dấu xem tất cả</p>
            </div>
           {listNotificationWallet?.length > 0 ? (
            <>
             <div className="flex flex-col items-start justify-start">
            {listNotificationWallet?.map((item: any) => <ItemNotification key={item._id} notification={item} />)} 
            </div>
            </>
           ): (
            <EmptyNotification />
           )}
        </div>
        </>
    )
}

export default NotificationWallet;
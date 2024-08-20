import { Link } from "react-router-dom";
import { formatDateAndTime } from "src/utils/formartDate";
import { Notification } from "src/utils/types/notification";

interface Props {
    notification: Notification
}
const ItemNotification: React.FC<Props> = ( { notification }) => {
    return (
        <>
        <div className="border-b border-dashed border-gray-200 p-4 w-full">
            <div className="flex flex-col items-start">
                <p className="text-xs font-normal text-yellow-300">Thông báo</p>
            </div>
            <div className="my-2 flex items-center justify-between gap-4">
                <div className="flex items-start justify-start gap-4">
                <img src={`http://localhost:8080/uploads/${notification.orderItemsId.items[0].productPriceId.id_product[0].thumbnails[0]}`} className="w-16 h-16 rounded-sm" alt="" />
                <div className="w-[80%] flex flex-col items-start justify-start">
                    <h3 className="text-sm text-gray-600 font-normal">{notification.title}</h3>
                    <p className="text-xs font-normal text-gray-500">{notification.content}</p>
                    <p className="text-xs font-normal text-gray-500">{formatDateAndTime(notification.createdAt)}</p>
                </div>
                </div>
                <Link to={`/me/purchase/order/${notification.orderItemsId._id}`} className="text-xs font-normal hover:text-primary/40 text-gray-500">Xem chi tiết</Link>
            </div>
        </div>
        </>
    )
}

export default ItemNotification;
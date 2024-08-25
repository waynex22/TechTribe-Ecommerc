import { useSelector } from "react-redux";
import { useGetNotificationQuery } from "src/redux/rtkQuery/notification";
import ItemNotification from "./ItemNotification";
import EmptyNotification from "./EmptyNotification";
import SpinLoading from "src/Components/spinner/spinLoading";

const NotificationOrder: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const { data: notifications, isLoading } = useGetNotificationQuery(user?.sub, {
        skip: !user
    });
    const listNotificationOrder = notifications?.filter((item: any) => item.type === 'order');
    return (
        <>
            <h2>Thông báo đơn hàng</h2>
            <div className="bg-white rounded-lg min-h-[400px] my-2">
                {isLoading ? (
                    <>
                    <SpinLoading loading={isLoading} />
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-end px-4 py-2 border-b border-dashed border-gray-200">
                            <p className="text-xs font-normal text-gray-500">Đánh dấu xem tất cả</p>
                        </div>
                        {listNotificationOrder?.length > 0 ? (
                            <>
                                <div className="flex flex-col items-start justify-start">
                                    {listNotificationOrder?.map((item: any) => <ItemNotification key={item._id} notification={item} />)}
                                </div>
                            </>
                        ) : (
                            <EmptyNotification />
                        )}
                    </>
                )}

            </div>
        </>
    )
}

export default NotificationOrder;
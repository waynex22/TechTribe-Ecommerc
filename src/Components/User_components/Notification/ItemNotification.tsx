import { Link } from "react-router-dom";
import { formatDateAndTime } from "src/utils/formartDate";
import { Notification } from "src/utils/types/notification";

interface Props {
    notification: Notification
}
const ItemNotification: React.FC<Props> = ({ notification }) => {
    return (
        <>
            <div className="border-b border-dashed border-gray-200 p-4 w-full">
                <div className="flex flex-col items-start">
                    <p className="text-xs font-normal text-yellow-300">Thông báo</p>
                </div>
                <div className="my-2 flex items-center justify-between gap-4">
                    <div className="flex items-start justify-start gap-4">
                        {notification.type == 'order' ? (
                            <>
                                <img src={`http://localhost:8080/uploads/${notification.orderItemsId.items[0].productPriceId.id_product[0].thumbnails[0]}`} className="w-16 h-16 rounded-sm" alt="" />

                            </>
                        ) : (
                            <>
                                <div className='flex-col flex items-center'>
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="wallet"><linearGradient id="a" x1="30.243" x2="461.117" y1="40.563" y2="471.437" gradientTransform="matrix(1 0 0 -1 0 512)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4eaeff"></stop><stop offset="1" stop-color="#5df5ff"></stop></linearGradient><path fill="url(#a)" d="M413.226,318.026c-34.186,0-62.026-27.841-62.026-62.026c0-34.186,27.84-62.026,62.026-62.026c72.468,0.05,73.746-0.186,78.134,0.107V88.907c0-24.107-19.626-43.786-43.787-43.786H43.787c-24.16,0-43.787,19.68-43.787,43.786v334.187c0,24.107,19.626,43.787,43.787,43.787h403.786c24.16,0,43.787-19.681,43.787-43.787V317.92C488.853,318.087,485.694,317.977,413.226,318.026z M236.2,397.531c0,8.823-7.177,16-16,16H69.334c-8.823,0-16-7.177-16-16V295.672c0-8.823,7.177-16,16-16H220.2c8.823,0,16,7.177,16,16V397.531z M225.534,295.672v101.859c0,2.943-2.393,5.333-5.333,5.333H69.334c-2.94,0-5.333-2.39-5.333-5.333V295.672c0-2.943,2.393-5.333,5.333-5.333H220.2C223.14,290.338,225.534,292.73,225.534,295.672z M488.96,204.64h-75.733c-28.32,0-51.36,23.04-51.36,51.36s23.04,51.36,51.36,51.36h75.733c12.693,0,23.04-10.347,23.04-23.04v-56.64C511.999,214.987,501.653,204.64,488.96,204.64z M416.02,279.443c-12.907,0-23.406-10.5-23.406-23.406c0-12.948,10.5-23.485,23.406-23.485c12.907,0,23.406,10.536,23.406,23.485C439.427,268.943,428.927,279.443,416.02,279.443z M428.761,256.036c0,7.026-5.717,12.739-12.739,12.739c-7.024,0-12.739-5.713-12.739-12.739c0-7.068,5.717-12.817,12.739-12.817C423.044,243.219,428.761,248.969,428.761,256.036z"></path></svg>
                                    <p className='text-xs font-normal'>Techtribe Pay</p>
                                </div>
                            </>
                        )}
                        <div className="w-[70%] flex flex-col items-start justify-start">
                            <h3 className="text-sm text-gray-600 font-normal">{notification.title}</h3>
                            <p className="text-xs font-normal text-gray-500">{notification.content}</p>
                            <p className="text-xs font-normal text-gray-500">{formatDateAndTime(notification.createdAt)}</p>
                        </div>
                    </div>
                    {notification.type == 'order' ? (
                        <>
                            <Link to={`/me/purchase/order/${notification.orderItemsId._id}`} className="text-xs font-normal hover:text-primary/40 text-gray-500">Xem chi tiết</Link>
                        </>
                    ) : (
                        <>
                            <Link to={`/me/wallet`} className="text-xs font-normal hover:text-primary/40 text-gray-500">Xem chi tiết</Link>

                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ItemNotification;
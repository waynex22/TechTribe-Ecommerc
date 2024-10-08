import { useDeliveryFailedMutation, useUpdateItemsOrderMutation } from "src/redux/rtkQuery/order";
import { useUpdateStatusTimeMutation } from "src/redux/rtkQuery/product-review";
import { formatDateAndTime } from "src/utils/formartDate";
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";

interface Props {
    item: any,
    refecth: () => void
}
const ItemShip: React.FC<Props> = ({ item , refecth }) => {
    const [updateOrder] = useUpdateItemsOrderMutation();
    const [updateTime] = useUpdateStatusTimeMutation();
    const [deliveryFailed] = useDeliveryFailedMutation();
    const getKeyUpdateItem = (key: string) => {
        return item?.statusUpdate?.filter((item: any) => item.key === key).map((item: any) => item.value);
    }
    const handleUpdate = async (key: string) => {
        if(item.statusShipping === 'Đã giao hàng') return
        const deliveryTime = new Date();
        await updateOrder({ _id: item?._id, statusShipping: key ,DeliveryTime: deliveryTime.setDate(deliveryTime.getDate() + 7)});
        // await updateTime({ id: item?._id, key: key, value: new Date() });
        refecth();
    }
    const handledeliveryFailed = async () => {
        await deliveryFailed(item?._id);
        refecth();
    }
    return (
        <>
            <tr className="">
                <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    {formatDateAndTime(getKeyUpdateItem('Đã gửi hàng')?.[0])}
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">2TEX{item._id.slice(0, 6)}</td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    <p className="text-[12px] text-gray-400">{item?.orderId?.address?.address}, {item?.orderId?.address?.ward}, {item?.orderId?.address?.district}, {item?.orderId?.address?.province}</p>
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    <p className="text-[12px] text-gray-400">{item?.orderId?.address?.phoneNumber}</p>
                </td>
                <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">{item.orderId?.methodPayment !== 'Techtribe Pay' ? `${formatNumberVnd(item.total)}` : '0'} VND</td>
                <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">{item?.statusShipping === 'Đã giao hàng' ? 'Đã giao hàng' : `${item?.status}`}</td>
                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                   {item?.statusShipping !== 'Đã giao hàng' && item?.status !== 'Hoàn hàng' && item?.status !== 'Đã huỷ' && (
                    <>
                    <div className="flex items-center gap-4">
                    <button onClick={() => handleUpdate('Đã giao hàng')} className="px-2 py-1 bg-red-500 hover:opacity-80 text-white rounded">Xác nhận đã giao</button>
                    <button onClick={() => handledeliveryFailed()} className="px-2 py-1 bg-primary/50 hover:bg-primary/70 text-white rounded">Giao thất bại</button>
                    </div>
                     </>
                   )}
                    { item?.status === 'Đã huỷ' && (
                   <>
                    <p className="text-[12px] text-gray-400">Không liên hệ được người nhận ( hoàn lại hàng )</p>
                    </>
                    )}
                </td>
            </tr>
        </>
    )
}

export default ItemShip;
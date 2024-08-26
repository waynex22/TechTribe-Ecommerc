import { useUpdateReturnOrderMutation } from "src/redux/rtkQuery/order";
import { formatDateAndTime } from "src/utils/formartDate";
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";

interface Props {
    item: any,
    refecth: () => void
}

const ItemReturn: React.FC<Props> = ({ item  , refecth}) => {
    const [updateReturn] = useUpdateReturnOrderMutation();
    const handleConfirm = async () => {
        try {
            await updateReturn({ id: item._id, status: 'Đã gửi hàng lại' }).unwrap();
            refecth();
        } catch (error) {
            console.log('error', error);
        }
    }
    return (
        <>
        <tr className="">
                <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    {formatDateAndTime(item?.returnDate)}
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">2TRF{item._id.slice(0,6)}</td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    <p className="text-[12px] text-gray-400">{item?.itemsOrderId?.orderId?.address?.address}, {item?.itemsOrderId?.orderId?.address?.ward}, {item?.itemsOrderId?.orderId?.address?.district}, {item?.itemsOrderId?.orderId?.address?.province}</p>
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    <p className="text-[12px] text-gray-400">{item?.itemsOrderId?.orderId?.address?.phoneNumber}</p>
                </td>
               
                <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">{item?.status === 'Đã tiếp nhận' ? 'Chưa hoàn shop' : `Đã hoàn lại`}</td>
                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                  {item?.status === 'Đã tiếp nhận' && (
                    <>
                    <button onClick={handleConfirm} className="px-2 py-1 bg-red-500 hover:opacity-80 text-white rounded">Xác nhận hoàn hàng</button>
                    </>
                  )}
                </td> 
            </tr>
        </>
    )
}

export default ItemReturn;
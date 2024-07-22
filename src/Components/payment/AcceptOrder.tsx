import { formatNumberVnd } from "../../utils/fortmartNumberVnd";
import { Order } from "../../utils/types/order";
interface Props {
    subOrder?: Order
}
const AcceptOrder: React.FC<Props> = ({ subOrder }) => {
    if(!subOrder) return <></>
    return (
        <>
            <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between my-1">
                    <p className="text-gray-400 font-normal text-sm">Tạm tính</p>
                    <p className="text-sm">{subOrder?.subTotal ? formatNumberVnd(subOrder?.subTotal) + 'đ': ''}</p>
                </div>
                <div className="flex items-center justify-between my-1">
                    <p className="text-gray-400 font-normal text-sm">Phí vận chuyển</p>
                    <p className="text-sm">{subOrder?.costShipping ? formatNumberVnd(subOrder?.costShipping) : ''}</p>
                </div>
                <div className="flex items-center justify-between my-1">
                    <p className="text-gray-400 font-normal text-sm">Mã giảm phí vận chuyển</p>
                    <p className="text-sm text-green-400">{subOrder?.costShipping ? '-' + formatNumberVnd(25000) : ''}</p>
                </div>
                <div className="flex items-center justify-between my-1">
                    <p className="text-gray-400 font-normal text-sm">Giảm giá</p>
                    <p className="text-sm text-green-400">{subOrder?.totalDiscount ? '-' + formatNumberVnd(subOrder?.totalDiscount) : ''}</p>
                </div>
                <div className="w-full h-[1px] bg-gray-300 my-2"></div>
                <div className="flex items-start justify-between mt-4">
                    <p className="text-gray-800 font-normal text-sm">Tổng tiền</p>
                    <div className="w-[70%] flex flex-col justify-end items-end">
                        <p className="text-lg text-red-600">{formatNumberVnd(subOrder?.total)} đ</p>
                        <p className="text-[12px] text-gray-400 font-light">(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)</p>
                    </div>

                </div>
                <div className="mt-4">
                <div className="bg-red-500 rounded-md mt-5 p-4 text-center cursor-pointer">
                  <span className="text-white text-md font-light-bold">Đặt hàng</span>
                </div>
                </div>
            </div>
        </>
    )
}
export default AcceptOrder;
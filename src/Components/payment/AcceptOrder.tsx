import React from "react";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd";
import { Order } from "../../utils/types/order";
import { useCreateOrderMutation } from "src/redux/rtkQuery/order";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { removeIdOrderNotComplete } from "src/utils/localStorage/token";
import { useGetCartMeQuery } from "src/redux/rtkQuery/cart";
import { useSelector } from "react-redux";
interface Props {
    subOrder?: Order,
    items?: any
}
const AcceptOrder: React.FC<Props> = ({ subOrder, items }) => {
    const history = useNavigate();
    const { user } = useSelector((state: any) => state.auth);
    const [modal, setModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { refetch } = useGetCartMeQuery(user?.sub, { skip: !user });
    const [createOrder] = useCreateOrderMutation();

    const handleBackToCart = () => {
        setModal(false);
        history('/checkout/cart');
        removeIdOrderNotComplete();
    }
    const handleCreateOrder = async () => {
        setLoading(true);
        const payload = {
            customerId: subOrder?.customerId._id,
            address: subOrder?.address._id,
            totalDiscountShop: subOrder?.totalDiscountShop,
            voucher2t: subOrder?.voucher2t?._id,
            coin: subOrder?.coin,
            coinRefunt: subOrder?.coinRefunt,
            voucherShipping: subOrder?.voucherShipping?._id,
            costShipping: subOrder?.costShipping,
            methodPayment: subOrder?.methodPayment,
            subTotal: subOrder?.subTotal,
            totalDiscount: subOrder?.totalDisCount,
            total: subOrder?.total - subOrder?.totalDisCount,
            items: items,
            subOrderId: subOrder?._id
        }
        try {
            const data = await createOrder(payload).unwrap();
            if (data.status === 200) {
                removeIdOrderNotComplete();
                refetch();
                history(`/checkout/payment/success`);
            } else {
                setModal(true);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    if (!subOrder) return <></>
    return (
        <>
            <Spinner loading={loading} />
            {modal && (
                <>
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative rounded-lg overflow-hidden flex items-center justify-center transform transition-all max-w-lg w-full">
                            <div className="bg-white rounded-lg p-4">
                                <p>Đã có lỗi xảy ra vui lòng thử lại</p>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleBackToCart()}>Quay lại giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between my-1">
                    <p className="text-gray-400 font-normal text-sm">Tạm tính</p>
                    <p className="text-sm">{subOrder?.subTotal ? formatNumberVnd(subOrder?.subTotal) + ' đ' : ''}</p>
                </div>
                <div className="flex items-center justify-between my-1">
                    <p className="text-gray-400 font-normal text-sm">Phí vận chuyển</p>
                    <p className="text-sm">{subOrder?.costShipping ? formatNumberVnd(subOrder?.costShipping) + ' đ' : ''}</p>
                </div>
                {subOrder?.totalDisCount > 0 && (
                    <>
                        <div className="flex items-center justify-between my-1">
                            <p className="text-gray-400 font-normal text-sm">Voucher từ 2T</p>
                            <p className="text-sm text-green-400">-{formatNumberVnd(subOrder?.totalDisCount)} đ</p>
                        </div>
                    </>
                )}
                {subOrder.coin !== 0 && (
                    <div className="flex items-center justify-between my-1">
                        <p className="text-gray-400 font-normal text-sm">Xu sử dụng</p>
                        <p className="text-sm text-green-400">-{subOrder?.coin} xu</p>
                    </div>
                )}
                {subOrder?.coinRefunt !== 0 && (
                    <div className="flex items-center justify-between my-1">
                        <p className="text-gray-400 font-normal text-sm">Hoàn xu</p>
                        <p className="text-sm text-green-400">{formatNumberVnd(subOrder?.coinRefunt)} xu</p>
                    </div>
                )}
                <div className="w-full h-[1px] bg-gray-300 my-2"></div>
                <div className="flex items-start justify-between mt-4">
                    <p className="text-gray-800 font-normal text-sm">Tổng tiền</p>
                    <div className="w-[70%] flex flex-col justify-end items-end">
                        <p className="text-lg text-red-600">{formatNumberVnd(subOrder?.total - subOrder?.totalDisCount)} đ</p>
                        <p className="text-[12px] text-gray-400 font-light">(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div onClick={handleCreateOrder} className="bg-red-500 rounded-md mt-5 p-4 text-center cursor-pointer">
                        <span className="text-white text-md font-light-bold">Đặt hàng</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AcceptOrder;
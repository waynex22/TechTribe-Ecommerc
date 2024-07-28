import { useSelector } from "react-redux";
import AcceptOrder from "../../Components/payment/AcceptOrder";
import Address from "../../Components/payment/Address";
import Coin2T from "../../Components/payment/Coin2T";
import PaymentMethod from "../../Components/payment/PaymentMethod";
import ProductPayment from "../../Components/payment/ProductPayment";
import Shipping from "../../Components/payment/Shipping";
import Voucher2T from "../../Components/payment/Voucher2T";
import VoucherShop from "../../Components/payment/VoucherShop";
import { useGetSubOrderQuery } from "../../redux/rtkQuery/order";
import { useEffect } from "react";
import Spinner from "../../Components/spinner/Spinner";
const PaymentPage: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const { data: subOrder, isLoading, refetch } = useGetSubOrderQuery(user?.sub, {
        skip: !user
    });
    useEffect(() => {
        if (user) {
            refetch();
        }
    }, [user, refetch]);
    console.log(subOrder);

    if (!subOrder || isLoading) return <Spinner loading={isLoading} />
    return (
        <>
            <div className="container mx-auto">
                <div className="flex items-start justify-between gap-4 mt-4">
                    <div className="w-[75%] h-fit">
                        <div className=" bg-white rounded-lg">
                            <Shipping subOrder={subOrder.subOrder} refecth={refetch} />
                            <div className="p-4">
                                <ProductPayment />
                                <VoucherShop />
                            </div>
                        </div>
                        <div className="mt-4">
                            <PaymentMethod subOrder={subOrder.subOrder} refecth={refetch} />
                        </div>
                    </div>
                    <div className="w-[25%] h-fit">
                        <div className="p-4 bg-white rounded-lg">
                            <Address subOrder={subOrder.subOrder} />
                        </div>
                        <div className="mt-4">
                            <Voucher2T subOrder={subOrder} refecth={refetch} />
                        </div>
                        <div className="mt-4">
                            <Coin2T subOrder={subOrder} refecth={refetch} />
                        </div>
                        <div className="mt-4">
                            <AcceptOrder subOrder={subOrder.subOrder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentPage;
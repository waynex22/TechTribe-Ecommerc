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
const PaymentPage: React.FC = () => {
        const { user } = useSelector((state: any) => state.auth);
        const { data : subOrder , isLoading , refetch} = useGetSubOrderQuery(user?.sub, {
            skip: !user
        });
        useEffect(() => {
            if (user) {
              refetch();
            }
          }, [user, refetch]);
        if(isLoading) return <div>Loading</div>
    return (
        <div className="container mx-auto">
            <h3 className="font-light-normal uppercase text-xl text-primary">Thanh Toán</h3>
            <div className="flex items-start justify-between gap-4 mt-4">
                <div className="w-[75%] h-fit">
                    <div className=" bg-white rounded-lg">
                        <Shipping subOrder={subOrder} refecth={refetch}/>
                        <div className="p-4">
                            <ProductPayment />
                            <VoucherShop />
                        </div>
                    </div>
                    <div className="mt-4">
                        <PaymentMethod subOrder={subOrder} refecth={refetch} />
                    </div>
                </div>
                <div className="w-[25%] h-fit">
                    <div className="p-4 bg-white rounded-lg">
                    <Address subOrder={subOrder}/>
                    </div>
                    <div className="mt-4">
                        <Voucher2T />
                    </div>
                    <div className="mt-4">
                        <Coin2T />
                    </div>
                    <div className="mt-4">
                        <AcceptOrder subOrder={subOrder} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaymentPage;
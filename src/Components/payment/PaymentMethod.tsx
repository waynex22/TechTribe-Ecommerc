import { useState } from "react";
import { useUpdateSubOrderDtoMutation } from "../../redux/rtkQuery/order";
import { Order } from "../../utils/types/order";
import Spinner from "../spinner/Spinner";
interface Props {
    subOrder?: Order,
    refecth: () => void
}
const PaymentMethod: React.FC<Props> = ({ subOrder , refecth }) => {
    const [loading, setLoading] = useState(false);
    const [update] = useUpdateSubOrderDtoMutation();
    const paymentMethods = [
        { id: 'cash', name: 'Thanh toán tiền mặt', logo: 'https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png' },
        { id: 'viettelMoney', name: 'Viettel Money', logo: 'https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png' },
        { id: 'momo', name: 'Ví Momo', logo: 'https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg' },
        { id: 'zalopay', name: 'Ví ZaloPay', logo: 'https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png' },
        { id: 'vnpay', name: 'VNPAY', logo: 'https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png' },
    ];
    const handleSelectPayment = async (method: string) => {
        setLoading(true);
        const payload = {
            id: subOrder?._id,
            methodPayment: method
        }
        try {
            await update(payload);
            refecth();
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    }
    return (
        <>
        <Spinner loading={loading} />
            <div className="bg-white p-4 h-fit rounded-lg">
                <h2>Chọn hình thức thanh toán</h2>
                <div className="space-y-8 my-4">
                    {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center">
                            <input
                                type="radio"
                                id={method.id}
                                name="paymentMethod"
                                value={method.id}
                                checked={method.name === subOrder?.methodPayment}
                                onClick={() => handleSelectPayment(method.name)}
                                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                            />
                            <label htmlFor={method.id} className="ml-3 block text-sm font-medium text-gray-700">
                                <img src={method.logo} alt={method.name} className="inline-block h-8 mr-2" />
                                {method.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default PaymentMethod;
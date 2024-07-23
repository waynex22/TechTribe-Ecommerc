import { useState } from "react";
import { useUpdateSubOrderDtoMutation } from "../../redux/rtkQuery/order";
import { Order } from "../../utils/types/order";
import Spinner from "../spinner/Spinner";
interface Props {
    subOrder?: Order,
    refecth: () => void
}
const Shipping: React.FC<Props> = ({ subOrder, refecth }) => {
    const [loading, setLoading] = useState(false);  
    const [ update] = useUpdateSubOrderDtoMutation();
    const handleSelectShiping = async (typeShipping: string) => {
        if(subOrder?.costShipping) return
        const payload = {
            id: subOrder?._id,
            shipping: typeShipping,
            costShipping : 37000
        }
        setLoading(true);
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
            <div className="p-4">
                <h2>Chọn hình thức giao hàng</h2>
                <div className="mt-4">
                    <div className="flex items-center justify-start">
                        <div className="flex items-center gap-4 border border-blue-300 bg-blue-200/70 backdrop-blur-0 px-4 w-[50%] py-6 rounded-lg">
                            <input checked={subOrder?.shipping === "Giao hàng nhanh"} onChange={() => handleSelectShiping("Giao hàng nhanh")} type="radio" name="shipping" id="home" />
                            <label htmlFor="home" className="font-light text-[14px]">Giao hàng nhanh</label>
                            <span className="text-green-500 bg-white rounded-sm px-2">-25K</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Shipping;
import { useState } from "react";
import { useUpdateSubOrderDtoMutation } from "../../redux/rtkQuery/order";
import Spinner from "../spinner/Spinner";
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";
interface Props {
    subOrder?: any,
    refecth: () => void
}
const Coin2T: React.FC<Props> = ({ subOrder, refecth }) => {
    const [loading, setLoading] = useState(false);
    const [updateSubOrder] = useUpdateSubOrderDtoMutation();

    const handleUseCoin = async () => {
        if(subOrder?.customerReward?.coin === 0) return;
        setLoading(true);
        try {
            if(subOrder?.customerReward?.coin !== 0 && subOrder?.subOrder?.coin === 0) {
                const payload = {
                    id: subOrder?.subOrder._id,
                    coin: subOrder?.customerReward?.coin 
                }
                await updateSubOrder(payload);
                refecth();
            }else if(subOrder.coin !== 0) {
                const payload = {
                    id: subOrder?.subOrder._id,
                    coin: 0,
                    total: subOrder?.subOrder?.total + subOrder?.customerReward?.coin
                }
                await updateSubOrder(payload);
                refecth();
            }
        } catch(error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
        
    }
    
    return (
        <>
            <Spinner loading={loading} />
            <div className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                        <img src="https://salt.tikicdn.com/ts/upload/2e/d0/67/6ea978a46f650dcd267445000840659a.png" className="w-6" alt="" />
                        <div>
                            <p className="text-gray-900 font-nomal text-sm">Sử dụng số coin tích điểm</p>
                            <div className="flex items-center gap-2">
                            <p className="text-[12px] text-gray-400">Bạn đang có</p>
                            <p className="text-[12px] text-green-400">{formatNumberVnd(subOrder?.customerReward?.coin)} xu</p>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={handleUseCoin}
                        className={`${subOrder.subOrder?.coin !== 0 ? 'bg-green-400' : 'bg-gray-300'
                            } relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-300`}
                    >
                        <div
                            className={`${subOrder.subOrder?.coin !== 0 ? 'translate-x-6' : 'translate-x-1'
                                } absolute top-[2px] left-[-2px] bg-white w-5 h-5 rounded-full transition-transform duration-300`}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Coin2T;
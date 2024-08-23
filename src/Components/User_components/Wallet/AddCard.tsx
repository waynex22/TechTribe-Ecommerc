import { Link, useNavigate } from "react-router-dom";
import CreditCard from "./Card";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddCardMutation, useGetWalletByCustomerQuery } from "src/redux/rtkQuery/wallet";
import { ToastProps } from "src/Type";
import Toast from "src/Components/toast/Toast";
import Spinner from "src/Components/spinner/Spinner";
interface CardData {
    cardNumber?: string;
    cardHolderName?: string;
    cvv?: number;
    expiryDate?: string;
  }
const AddCard: React.FC = () => {
    const [dataCard , setDataCard] = useState<CardData>({
    });
    const [toast , setToast] = useState<ToastProps | null>(null);
    const [loading , setLoading] = useState(false);
    const [addCard] = useAddCardMutation();
    const history = useNavigate();
    const {user} = useSelector((state: any) => state.auth);
    const {data: wallet} = useGetWalletByCustomerQuery(user?.sub , {
        skip: !user
    });
    const handleSetToast = (toast: any) => {
        setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
      }
    const handleAddCard = async () => {
        setLoading(true);
        const data = {
            walletId: wallet?._id,
            ...dataCard,
        }
        try {
            const res = await addCard(data).unwrap();
            if(res?.status === 290){
                handleSetToast({
                    type: 'error',
                    message: res.message
                })
                setLoading(false);
                return
            }
            handleSetToast({
                type: 'success',
                message: 'Thêm thẻ thành công',
            })
            setTimeout(() => {
                history('/me/wallet')
            }, 1500)
            setLoading(false);
        } catch (error: any) {
            handleSetToast({
                type: 'error',
                message: 'Thẻ bị từ chối'
            })
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }
    return (
        <>
        <h2 className="font-normal">Liên kết thẻ</h2>
        <Spinner loading={loading} />
        {toast && <Toast {...toast} />}
        <div className="flex items-center justify-between border-b border-dashed p-4 mt-2 bg-white rounded-lg">
                <Link to="/me/wallet" className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <p>Trở lại</p>
                </Link>
            </div>
        <div className="bg-white rounded-md border-b border-dashed border-gray-200">
        <CreditCard setDataCard={setDataCard} />
        <div className="flex items-center justify-center mb-4">
                <button onClick={handleAddCard} className="bg-primary/40 p-2 rounded-md backdrop-blur-sm flex items-center text-white gap-2 cursor-pointer hover:bg-primary/70">Liên kết ngay</button>
        </div>
        </div>
        </>
    )
}

export default AddCard;
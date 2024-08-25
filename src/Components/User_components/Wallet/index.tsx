import { useEffect } from "react";
import { useSelector } from "react-redux";
import SpinLoading from "src/Components/spinner/spinLoading";
import { useGetWalletByCustomerQuery } from "src/redux/rtkQuery/wallet";
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";
import BalanceFluctuation from "./BalanceFluctuation";

const Wallet: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const { data: wallet, isLoading , refetch} = useGetWalletByCustomerQuery(user?.sub, {
        skip: !user
    });
    useEffect(() => {
        if(user) {
            refetch();
        }
        console.log("user-wallet:", wallet);
        
    }, [user, refetch, wallet]);
    return (
        <>
            <h2 className="font-normal">Techtribe Pay</h2>
            <div className="bg-white rounded-md mt-2 min-h-[400px]">
                {isLoading ? (
                    <>
                        <SpinLoading loading={isLoading} />
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between gap-4 p-4 border-b border-dashed border-gray-200">
                            <div className="bg-primary/40 p-2 rounded-md backdrop-blur-sm flex items-center gap-2">
                                <p className="text-white text-sm font-normal">Số dư ví:</p>
                                <p className="text-white text-sm font-normal">{wallet?.balance ? formatNumberVnd(wallet?.balance) : 0} VND</p>
                            </div>
                            <div className="flex items-center gap-2">
                                    <div className="bg-primary/40 p-2 rounded-md backdrop-blur-sm flex items-center gap-2 cursor-pointer hover:bg-primary/70"> 
                                        <p className="text-white text-sm font-normal">Nạp tiền</p>
                                    </div>
                                    <div className="bg-primary/40 p-2 rounded-md backdrop-blur-sm flex items-center gap-2 cursor-pointer hover:bg-primary/70"> 
                                        <p className="text-white text-sm font-normal">Liên kết thẻ</p>
                                    </div>
                            </div>
                        </div>
                    </>
                )}
            <BalanceFluctuation id={wallet?._id} />
            </div>
        </>
    )
}

export default Wallet;
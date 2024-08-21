import { formatDateAndTime } from "src/utils/formartDate";
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";

interface transaction {
    _id: string,
    walletId: string,
    amount: number,
    type: string,
    description: string,
    created_At: string
}
interface Props {
    transaction: transaction
}
const ItemBalanceFluctuation: React.FC<Props> = ({ transaction }) => {
    console.log(transaction);
    
    return (
        <>
        <div className="flex items-start gap-2 border-b border-dashed border-gray-200 py-2">
        <svg className="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="withdrawal"><g><rect width="21.5" height="11.5" x="1.25" y="2.25" fill="#29b3ff" rx="2.75"></rect><path fill="#ffc545" d="M18.5,7.25H5.5A.75.75,0,0,0,4.75,8V19A2.752,2.752,0,0,0,7.5,21.75h9A2.752,2.752,0,0,0,19.25,19V8A.75.75,0,0,0,18.5,7.25Z"></path><path fill="#fff" d="M12,18.75a.744.744,0,0,1-.53-.22l-3-3a.75.75,0,0,1,1.06-1.06L12,16.939l2.47-2.469a.75.75,0,0,1,1.06,1.06l-3,3A.744.744,0,0,1,12,18.75Z"></path><path fill="#fff" d="M12,18.75a.75.75,0,0,1-.75-.75V11a.75.75,0,0,1,1.5,0v7A.75.75,0,0,1,12,18.75Z"></path><path d="M20,13.75H18.5a.75.75,0,0,1,0-1.5H20A1.252,1.252,0,0,0,21.25,11V5A1.252,1.252,0,0,0,20,3.75H4A1.252,1.252,0,0,0,2.75,5v6A1.252,1.252,0,0,0,4,12.25H5.5a.75.75,0,0,1,0,1.5H4A2.752,2.752,0,0,1,1.25,11V5A2.752,2.752,0,0,1,4,2.25H20A2.752,2.752,0,0,1,22.75,5v6A2.752,2.752,0,0,1,20,13.75Z"></path><path d="M16.5,21.75h-9A2.752,2.752,0,0,1,4.75,19V7a.75.75,0,0,1,.75-.75h13a.75.75,0,0,1,.75.75V19A2.752,2.752,0,0,1,16.5,21.75ZM6.25,7.75V19A1.252,1.252,0,0,0,7.5,20.25h9A1.252,1.252,0,0,0,17.75,19V7.75Z"></path><path d="M19.5,7.75H4.5a.75.75,0,0,1,0-1.5h15a.75.75,0,0,1,0,1.5Z"></path></g></svg> 
        <div className="flex flex-col items-start">
            <p className="font-normal text-xs">Mã giao dịch: {`TP${transaction._id.slice(-6)}`}</p>
            <p className="font-normal text-xs">{transaction.type === 'withdraw' ? `-${formatNumberVnd(transaction.amount)}VND` : `+${formatNumberVnd(transaction.amount)}VND`}</p>
            <p className="font-normal text-xs">Nội dung: {transaction.description}</p>
            <p className="font-normal text-xs text-gray-500">{formatDateAndTime(transaction.created_At)}</p>
        </div>
        </div>
        </>
    )
}

export default ItemBalanceFluctuation;
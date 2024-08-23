import SpinLoading from "src/Components/spinner/spinLoading";
import { useGetTransactionsQuery } from "src/redux/rtkQuery/wallet";
import EmptyFluctuation from "./EmptyFluctuation";
import ItemBalanceFluctuation from "./ItemBalanceFluctuation";
import { useEffect } from "react";

interface Props {
    id: string
}
const BalanceFluctuation: React.FC<Props> = ({ id }) => {
    const { data: transactions, isLoading, refetch } = useGetTransactionsQuery(id, {
        skip: !id
    });
    useEffect(() => {
        if(!id) return
        refetch();
    }, [id, refetch])
    return (
        <>
            <div className="p-4 border-b border-dashed border-gray-200 mt-2">
                <h2 className="font-normal">Biến động số dư</h2>
                {isLoading ? (
                    <SpinLoading loading={isLoading} />
                ) : (
                    <>
                        {transactions?.length === 0 ? (
                            <div className="flex items-center justify-center">
                            <EmptyFluctuation />
                            </div>
                        ) : (
                            <>
                            {transactions?.map((transaction: any, index: number) => (
                                <ItemBalanceFluctuation
                                    key={index}
                                    transaction={transaction}
                                />
                            ))}
                            </>)}
                    </>
                )}
            </div>
        </>
    )
}
export default BalanceFluctuation;
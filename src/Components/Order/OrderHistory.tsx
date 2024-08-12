import TabOrder from "./TabOrder";

const OrderHistory: React.FC = () => {
    return (
        <div className="container mx-auto">
            <h2>Đơn hàng của tôi</h2>
            <div className="p-4">
                <TabOrder />
            </div>
        </div>
    )
}   

export default OrderHistory;
import React, { useEffect } from "react";
import TabOrder from "./tabOrder";
import { useGetOrderByUserIdQuery } from "src/redux/rtkQuery/order";
import { useSelector } from "react-redux";
import OrderItem from "./orderItem";

const ComponentUserPurchase: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data: orders, refetch } = useGetOrderByUserIdQuery(user?.sub);
  const [tab, setTab] = React.useState('all');
  const [filter, setFilter] = React.useState<any>([]);
  const handleSetTab = (tab: string) => {
    setTab(tab);
  }
  useEffect(() => {
    const filterOrder = tab === 'all' ? orders : orders?.filter((item: any) => item.status === tab);
    setFilter(filterOrder);
  }, [tab, orders]);
  
  return (
    <>
      <h2>Đơn hàng của tôi</h2>
      <TabOrder handleSetTab={handleSetTab} tab={tab} />
      <div className="bg-white rounded-lg">
        {filter && filter?.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center ">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" className="w-1/4 rounded-full" alt="" />
              <h2>Chưa có đơn hàng</h2>
            </div>
          </>
        ) : <>
          {filter?.map((item: any) => (
            <OrderItem key={item._id} order={item} />
          ))}
        </>}
      </div>
    </>
  );
};

export default ComponentUserPurchase;

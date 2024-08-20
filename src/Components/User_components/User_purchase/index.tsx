import React, { useEffect } from "react";
import TabOrder from "./tabOrder";
import { useSelector } from "react-redux";
import OrderItem from "./orderItem";
import requestApi from "src/helper/api";
import Spinner from "src/Components/spinner/Spinner";
import { useGetOrderByUserIdQuery } from "src/redux/rtkQuery/order";

const ComponentUserPurchase: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [tab, setTab] = React.useState(0);
  const {data: listItemsOrder } = useGetOrderByUserIdQuery(user?.sub);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState<any>([]);
  const handleSetTab = (tab: number) => {
    setTab(tab);
  }
  useEffect(() => {
    setLoading(true);
    requestApi(`items-order/query/${user?.sub}/${tab}`, 'GET', {}, 'application/json').then ((res: any) => {
      setFilter(res?.data)
    })
    setLoading(false);
  }, [tab , user?.sub]);
  return (
    <>
      <h2>Đơn hàng của tôi</h2>
      <Spinner loading={loading} />
      <TabOrder handleSetTab={handleSetTab} tab={tab} />
      <div className="bg-white rounded-lg min-h-[400px]">
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

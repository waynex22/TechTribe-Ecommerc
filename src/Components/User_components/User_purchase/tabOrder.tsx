import { useState } from "react";
import { Link } from "react-router-dom";
interface Props {
    handleSetTab: (tab: number) => void;
    tab: number;
}
const TabOrder: React.FC<Props> = ({ handleSetTab, tab }) => {

  return (
      <div className="border-b bg-white p-4 border-gray-200 border-dashed my-2 rounded-lg">
        <nav className="flex space-x-4 items-center justify-around">
          <Link to={'/me/purchase?type=0'}
            className={`pb-2 text-sm font-normal ${tab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab(0)}
          >
            Tất cả đơn
          </Link>
          <Link to={'/me/purchase?type=1'}
            className={`pb-2 text-sm font-normal ${tab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab(1)}
          >
            Đang xử lý
          </Link>
          <Link to={'/me/purchase?type=2'}
            className={`pb-2 text-sm font-normal ${tab === 2 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab(2)}
          >
            Đang vận chuyển
          </Link>
          <Link to={'/me/purchase?type=3'}
            className={`pb-2 text-sm font-normal ${tab === 3 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab(3)}
          >
            Hoàn thành
          </Link>
          <Link to={'/me/purchase?type=4'}
            className={`pb-2 text-sm font-normal ${tab === 4 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab(4)}
          >
            Đơn hủy
          </Link>
          <Link to={'/me/purchase?type=5'}
            className={`pb-2 text-sm font-normal ${tab === 5 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab(5)}
          >
            Trả hàng
          </Link>
        </nav>
      </div>
  );
};
export default TabOrder;
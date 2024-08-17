import { useState } from "react";
interface Props {
    handleSetTab: (tab: string) => void;
    tab: string;
}
const TabOrder: React.FC<Props> = ({ handleSetTab, tab }) => {

  return (
      <div className="border-b bg-white p-4 border-gray-200 border-dashed my-2 rounded-lg">
        <nav className="flex space-x-4 items-center justify-around">
          <button
            className={`pb-2 text-sm font-normal ${tab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab('all')}
          >
            Tất cả đơn
          </button>
          <button
            className={`pb-2 text-sm font-normal ${tab === 'Chờ xác nhận' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab('Chờ xác nhận')}
          >
            Đang xử lý
          </button>
          <button
            className={`pb-2 text-sm font-normal ${tab === 'Đang giao hàng' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab('Đang giao hàng')}
          >
            Đang vận chuyển
          </button>
          <button
            className={`pb-2 text-sm font-normal ${tab === 'Hoàn thành' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab('Hoàn thành')}
          >
            Hoàn thành
          </button>
          <button
            className={`pb-2 text-sm font-normal ${tab === 'Huỷ đơn hàng' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab('Huỷ đơn hàng')}
          >
            Đơn hủy
          </button>
          <button
            className={`pb-2 text-sm font-normal ${tab === 'Hoàn hàng' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleSetTab('Hoàn hàng')}
          >
            Trả hàng
          </button>
        </nav>
      </div>
  );
};
export default TabOrder;
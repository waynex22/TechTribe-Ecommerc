import { useState } from "react";

const TabOrder: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

  return (
      <div className="border-b mb-4">
        <nav className="flex space-x-4">
          <button
            className={`pb-2 ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('all')}
          >
            Tất cả đơn
          </button>
          <button
            className={`pb-2 ${activeTab === 'waiting_payment' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('waiting_payment')}
          >
            Chờ thanh toán
          </button>
          <button
            className={`pb-2 ${activeTab === 'processing' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('processing')}
          >
            Đang xử lý
          </button>
          <button
            className={`pb-2 ${activeTab === 'shipping' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('shipping')}
          >
            Đang vận chuyển
          </button>
          <button
            className={`pb-2 ${activeTab === 'delivered' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('delivered')}
          >
            Đã giao
          </button>
          <button
            className={`pb-2 ${activeTab === 'canceled' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('canceled')}
          >
            Đã hủy
          </button>
        </nav>
      </div>
  );
};
export default TabOrder;
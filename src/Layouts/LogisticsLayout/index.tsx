import React from 'react';
import { Link } from 'react-router-dom';
const LogisticsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className="bg-white h-fit p-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/"><img src="https://i.imgur.com/1rzy8ne.png" className="w-[60px] h-[60px]" alt="" /></Link>
            <h3 className="font-light-normal uppercase text-xl text-primary">Giao hàng</h3>
          </div>
        </div>
      </div>
      <main className='flex-grow my-10 w-[80%] mx-auto'>
        {children}
      </main>
      <footer className="bg-gray-100 text-gray-500 py-4 text-[12px]">
            <div className="container mx-auto px-4">
                <p className="mb-2">Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch chung:</p>
                <div className="flex flex-wrap justify-center space-x-4 mb-4">
                    <a href="#" className="hover:text-gray-900">Quy chế hoạt động</a>
                    <span>|</span>
                    <a href="#" className="hover:text-gray-900">Chính sách giải quyết khiếu nại</a>
                    <span>|</span>
                    <a href="#" className="hover:text-gray-900">Chính sách bảo hành</a>
                    <span>|</span>
                    <a href="#" className="hover:text-gray-900">Chính sách bảo mật thanh toán</a>
                    <span>|</span>
                    <a href="#" className="hover:text-gray-900">Chính sách bảo mật thông tin cá nhân</a>
                </div>
                <p className="text-center text-primary">© 2024 - Bản quyền của Công Ty Cổ Phần TECHTRIBE - TECHTRIBE.vn</p>
            </div>
        </footer>
    </div>
  );
};

export default LogisticsLayout;

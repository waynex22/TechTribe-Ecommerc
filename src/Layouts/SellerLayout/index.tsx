import React from 'react';
import HeaderSeller from './headerSeller';
import AsideLayout from './aside';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderProvider from '../../Components/Seller/loading';

const SellerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <LoaderProvider>
      <div className=' bg-gray-100 min-w-[1200px] min-h-screen '>
        <ToastContainer />
        <HeaderSeller />
        <div className='flex gap-1'>
          <AsideLayout />
          <main className=' pt-16 w-full'>
            <div className=' p-4'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </LoaderProvider>

  );
};

export default SellerLayout;

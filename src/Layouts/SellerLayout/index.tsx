import React from 'react';
import HeaderSeller from './headerSeller';
import AsideLayout from './aside';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderProvider from '../../Components/Seller/loading';
import MessengerSellerComponent from '../../Components/Seller/messenger';
import { matchPath, useLocation } from 'react-router-dom';
import { noMessengerRoutes } from '../../Routes/seller';

const SellerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Define the routes where MessengerSellerComponent should not appear
  const shouldHideMessenger = noMessengerRoutes.some(route => 
    matchPath(route, location.pathname)
  );
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
      {!shouldHideMessenger && <MessengerSellerComponent />}
    </LoaderProvider>

  );
};

export default SellerLayout;

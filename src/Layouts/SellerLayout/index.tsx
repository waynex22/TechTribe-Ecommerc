import React from 'react';
import HeaderSeller from './headerSeller';
import AsideLayout from './aside';

const SellerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=' bg-gray-100 min-w-[1200px] min-h-screen '>
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
  );
};

export default SellerLayout;

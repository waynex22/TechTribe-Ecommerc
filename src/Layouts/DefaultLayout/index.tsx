import React from 'react';
import Header from './header';
import Footer from './footer';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow my-20'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

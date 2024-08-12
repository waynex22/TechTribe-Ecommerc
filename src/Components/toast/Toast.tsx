import React, { useEffect, useState, useCallback } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose : () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type , onClose }) => {
  const toastClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        onClose(); 
    }, 2000);
    return () => clearTimeout(timer);
}, [onClose]);
  return (
    <div className={`fixed top-[80%] left-1/2 -translate-x-1/2 p-3 min-w-[500px] rounded-md text-white text-center text-sm font-light bg-gray-800/50 backdrop-blur-lg  z-[9999]`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;

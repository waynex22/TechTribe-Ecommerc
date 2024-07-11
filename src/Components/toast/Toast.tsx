
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info'; 
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
  const toastClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  if (!show) return null;
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md text-white ${toastClasses[type]} shadow-lg`}>
      {message}
    </div>
  );
};

export default Toast;

import React, { useEffect, useState, useCallback } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [show, setShow] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(message);

  const onClose = useCallback(() => {
    setShow(false);
    setCurrentMessage(null);
  }, []);

  const toastClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setShow(true);
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!show || !currentMessage) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md text-white ${toastClasses[type]} shadow-lg z-[9999]`}>
      {currentMessage}
    </div>
  );
};

export default Toast;

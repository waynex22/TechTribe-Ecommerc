import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalAccept: React.FC<ConfirmModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className='bg-gray-800/20 backdrop-blur-0 rounded-lg p-4 text-white min-h-12 min-w-19 flex flex-col items-center justify-center'>
        <p>{message}</p>
        <div className='mt-4'>
          <div className='flex items-center justify-end gap-7'>
            <button
              className="border border-white text-white font-light py-1 px-3 rounded"
              onClick={onConfirm}
            >
              Có
            </button>
            <button
              className="border border-white text-white font-light py-1 px-3 rounded"
              onClick={onCancel}
            >
              Không
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ModalAccept;

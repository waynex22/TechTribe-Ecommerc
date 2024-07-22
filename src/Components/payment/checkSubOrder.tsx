import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIdOrderNotComplete, removeIdOrderNotComplete } from '../../utils/localStorage/token';
import ModalAccept from '../modal/ModalAccept';
import { useDeleteSubOrderMutation } from '../../redux/rtkQuery/order';


const CheckSubOrder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSubOrder] = useDeleteSubOrderMutation();
  const [orderId, setOrderId] = useState<any>(null);
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const idSubOrderNotComplete = getIdOrderNotComplete();
    if (idSubOrderNotComplete && !location.pathname.includes('/checkout/payment')) {
      setOrderId(idSubOrderNotComplete);
      setShowModal(true);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleContinue = () => {
    handleClose();
    history('/checkout/payment');
  };

  const handleDelete = async () => {
    removeIdOrderNotComplete();
    await deleteSubOrder(orderId).unwrap();
    handleClose();
  };

  return (
    <div>
      <ModalAccept
      isOpen={showModal} 
      message="Bạn đang có đơn hàng chưa hoàn thành , bạn có muốn tiếp tục?" 
      onConfirm={handleContinue} 
      onCancel={handleDelete}
       />
    </div>
  );
};

export default CheckSubOrder;

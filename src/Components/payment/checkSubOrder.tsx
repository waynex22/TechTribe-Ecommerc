import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIdOrderNotComplete, removeIdOrderNotComplete } from '../../utils/localStorage/token';
import ModalAccept from '../modal/ModalAccept';
import { useDeleteSubOrderMutation, useGetSubOrderQuery } from '../../redux/rtkQuery/order';
import { useSelector } from 'react-redux';


const CheckSubOrder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSubOrder] = useDeleteSubOrderMutation();
  const [orderId, setOrderId] = useState<any>(null);
  const { user } = useSelector((state: any) => state.auth);
  const {data: order , refetch} = useGetSubOrderQuery(user?.sub, {
    skip: !user,
  })
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const idSubOrderNotComplete = getIdOrderNotComplete();
    if (idSubOrderNotComplete && location.pathname.includes('/checkout/cart')) {
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
    if(order.subOrder) {
      await deleteSubOrder(order?.subOrder?._id).unwrap();
      handleClose();
    }else {
      await deleteSubOrder(orderId).unwrap();
      handleClose();
    }
    refetch();
  };
// console.log(order);

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

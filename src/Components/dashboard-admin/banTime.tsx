import React from 'react';

const BanTimeDisplay = ( remainingBanTime: any ) => {
  const days = Math.floor(parseInt(remainingBanTime) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingBanTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingBanTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingBanTime % (1000 * 60)) / 1000);

  return (
    <div>
      Cửa hàng bị cấm trong: {days} ngày, {hours} giờ, {minutes} phút, {seconds} giây.
    </div>
  );
};

export default BanTimeDisplay;
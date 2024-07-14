import React, { useEffect, useState } from "react";

interface CountDownProps {
  endTime: string;
}

const CountDown: React.FC<CountDownProps> = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };
  return (
    <>
      <div className="flex gap-1 items-center justify-center">
        {Object.keys(timeLeft).length > 0 ? (
          <>
            <div className="bg-red-500 text-white p-1 rounded-lg">
              {formatTime(timeLeft.hours)}
            </div>
            <span>:</span>
            <div className="bg-red-500 text-white p-1 rounded-lg">
              {formatTime(timeLeft.minutes)}
            </div>
            <span>:</span>
            <div className="bg-red-500 text-white p-1 rounded-lg">
              {formatTime(timeLeft.seconds)}
            </div>
          </>
        ) : (
          <>
          <div className="bg-red-500 text-white p-1 rounded-lg">
            
            </div>
            <span>:</span>
            <div className="bg-red-500 text-white p-1 rounded-lg">
             
            </div>
            <span>:</span>
            <div className="bg-red-500 text-white p-1 rounded-lg">
              
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default CountDown;
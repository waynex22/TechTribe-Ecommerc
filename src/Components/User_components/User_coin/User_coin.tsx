import React from "react";
import { useSelector } from "react-redux";
import SpinLoading from "src/Components/spinner/spinLoading";
import { useGetcustomerRewardQuery } from "src/redux/rtkQuery/customerReward";

const ComponentUserCoin: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data: customerReward, isLoading } = useGetcustomerRewardQuery(user?.sub, {
    skip: !user
  });
  return (
    <>
      <h2 className="">Xu</h2>
      <div className="bg-white rounded-md min-h-[400px] mt-2">
        {isLoading ? (
          <>
            <SpinLoading loading={isLoading} />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between px-4 py-2 border-b border-dashed border-gray-200">
              
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default ComponentUserCoin;

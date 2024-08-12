import React from 'react';

const CartLoading: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-8 gap-5">
                <div className="col-span-6 h-fit">
                    <div className="w-full h-8 bg-gray-200 animate-pulse rounded-lg">
                    </div>
                    <div className="w-full mt-4 h-8 bg-gray-200 animate-pulse rounded-lg">
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="rounded-md bg-gray-200 animate-pulse h-24 w-full">
                        
                    </div>
                    <div className="rounded-md bg-gray-200 animate-pulse h-24 w-full mt-5  ">
                        
                    </div>
                    <div className="rounded-md mt-5 p-4 w-full bg-gray-200 animate-pulse h-14">
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartLoading;

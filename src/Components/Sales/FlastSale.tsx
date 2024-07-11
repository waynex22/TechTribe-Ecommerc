import React from "react";
import CountDown from "../Clock/CountDown";

const FlastSale = () => {
  
  
  return (
    <>
      <div className="my-5 h-fit bg-white p-4  rounded-lg mx-auto">
        <div className=" flex items-center justify-start gap-x-5">
          <div className="flex items-center justify-start text-primary font-bold text-2xl">
            <span>F</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
            </svg>
            <span>A</span>
            <span>S</span>
            <span>H</span>
            <div className="ml-2">
              <span className="">SALE</span>
            </div>
          </div>
          <CountDown endTime="2024-7-25 23:00:00" />
        </div>
        <div className="flex">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mx-auto relative">
              <div className="absolute top-4 left-0 bg-red-200 rounded-md">
                  <span className="text-[12px] text-red-400">-28%</span>
              </div>
              <div className="rounded-lg p-2">
                <img
                  src="https://salt.tikicdn.com/cache/100x100/ts/product/b8/35/6c/64b6451608ce3d908cf00da0d9ef9f49.jpg.webp"
                  className=" object-cover"
                  alt=""
                />
                <div className="flex items-center text-red-500 justify-center my-2 relative">
                  <span className="text-md w-fit font-bold">
                    21.670.000
                  </span>
                  <div className="text-sm font-light-bold absolute right-[-2px] top-[-6px]">
                    đ
                  </div>
                </div>
                <div className="w-full rounded-lg bg-red-300">
                  <div className="flex items-center justify-between gap-2">
                    <div className="bg-red-400 w-5 h-5 rounded-full">
                    </div>
                    <span className="text-white text-[10px] mr-4">Top bán chạy</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlastSale;

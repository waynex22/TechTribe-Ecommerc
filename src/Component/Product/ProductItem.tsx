import React from "react";

const ProductItem = () => {
  return (
    <div className="col-span-1 rounded-lg border-solid border-[1px] border-gray-200 p-2">
      <img
        src="https://salt.tikicdn.com/cache/100x100/ts/product/b8/35/6c/64b6451608ce3d908cf00da0d9ef9f49.jpg.webp"
        className="w-full h-full object-cover"
        alt=""
      />
      <span className="text-sm my-2 font-light">iPhone 14 Pro</span>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            color="#FFC400"
            className="w-3 h-3 font-bold"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        ))}
      </div>
      <div className="flex items-center text-gray-900 justify-start relative w-fit">
        <span className=" text-sm w-fit font-light-bold">21.670.000</span>
        <div className="text-sm font-light-bold absolute right-[-12px] top-[-6px]">
          đ
        </div>
      </div>
    </div>
  );
};
export default ProductItem;

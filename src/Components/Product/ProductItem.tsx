import React from "react";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../redux/rtkQuery/product";

const ProductItem = () => {
  const isMall = true;
  const isNew = true;
  const { data: products, error, isLoading } = useGetProductQuery()
  console.log(products);
  
  return (
    <div className="col-span-1 rounded-lg border-solid border-[1px] border-gray-200 p-2">
      <div className="w-[181px] h-[231px]">
        <img
          src="	https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/fdfa5d8b5920a74b650a9d9400df83f4.png.webp"
          className="w-[181px] h-[181px] object-cover"
          alt=""
        />
        <div className="w-[50%]">
          {isMall && (
            <>
              <div className="flex my-1 items-center justify-between bg-red-500/10 w-fit rounded-lg backdrop-blur-0 text-red-500 py-[1px] px-[2px] gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
                </svg>

                <span className="text-[10px] font-bold">Hot</span>
              </div>
            </>
          )}
          {isNew && (
            <>
              <div className="flex items-center justify-between bg-primary/10 w-fit rounded-lg backdrop-blur-0 text-primary py-[1px] px-[2px] gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8c0 .982-.472 1.854-1.202 2.402a2.995 2.995 0 0 1-.848 2.547 2.995 2.995 0 0 1-2.548.849A2.996 2.996 0 0 1 8 15a2.996 2.996 0 0 1-2.402-1.202 2.995 2.995 0 0 1-2.547-.848 2.995 2.995 0 0 1-.849-2.548A2.996 2.996 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a2.995 2.995 0 0 1 .848-2.547 2.995 2.995 0 0 1 2.548-.849A2.995 2.995 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a2.995 2.995 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A2.996 2.996 0 0 1 15 8Zm-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832 3.7-4.789a.75.75 0 0 1 1.052-.134Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[10px] font-bold">Chính hãng</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="my-2 h-[50px]">
          <Link to={`/product/1`} className="text-sm font-light">iPhone 14 Pro ( 256 GB chính hãng giá sốc )</Link>
      </div>
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
      <div className="flex items-center text-red-500 justify-start relative w-fit">
        <span className=" text-md w-fit font-bold">21.670.000</span>
        <div className="text-sm font-light-bold absolute right-[-12px] top-[-6px]">
          đ
        </div>
      </div>
    </div>
  );
};
export default ProductItem;

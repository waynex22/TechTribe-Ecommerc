import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd/index";
const ProductDetail: React.FC = (Product: any) => {
  const colors = [
    {
      name: "Trắng",
      image:
        "	https://salt.tikicdn.com/cache/100x100/ts/product/40/5e/eb/4dcee6ceebbea004a14f212db4182b18.png.webp",
    },
    {
      name: "Tím",
      image:
        "	https://salt.tikicdn.com/cache/100x100/ts/product/40/5e/eb/4dcee6ceebbea004a14f212db4182b18.png.webp",
    },
    {
      name: "Xanh",
      image:
        "	https://salt.tikicdn.com/cache/100x100/ts/product/40/5e/eb/4dcee6ceebbea004a14f212db4182b18.png.webp",
    },
  ];

  const sizes = ["128GB", "256GB", "512GB"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const price = 25300000;
  const subtotal = quantity * price;
  return (
    <>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-7 md:grid-col-2 gap-6">
          <div className="col-span-2 ">
            <div className=" bg-white h-fit rounded-xl">
              <div className="p-4 ">
                <img
                  src="	https://salt.tikicdn.com/cache/750x750/ts/product/9c/23/ef/b0c544a466ae947a8d8ca79acddcef74.jpg.webp"
                  alt=""
                  className="border-solid border-[1px] border-gray-200 rounded-xl w-[368px] h-[368px] object-cover"
                />
                <div className="flex space-x-2 mt-2">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div className="border-solid border-[1px] border-gray-200 rounded-sm p-1">
                        <img
                          key={index}
                          src="https://via.placeholder.com/50"
                          alt={`Thumbnail ${index + 1}`}
                          className="w-12 h-12 object-cover "
                        />
                      </div>
                    ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">Đặc điểm nổi bật</h3>
                  <div className="my-2 flex">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                      className="w-6 h-6 object-cover"
                      alt=""
                    />
                    <span className="ml-3 font-light text-sm">
                      Màn hình Super Retina XDR 6.1 inch với chế độ Điện Ảnh,
                      tạo độ sâu trường ảnh nông và tự động thay đổi tiêu cự
                      trong video.
                    </span>
                  </div>
                  <div className="my-2 flex">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                      className="w-6 h-6 object-cover"
                      alt=""
                    />
                    <span className="ml-3 font-light text-sm">
                      Hệ thống camera kép tiên tiến với camera Wide và Ultra
                      Wide 12MP, hỗ trợ nhiều chế độ chụp ảnh và quay video chất
                      lượng cao.
                    </span>
                  </div>
                  <div className="my-2 flex">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                      className="w-6 h-6 object-cover"
                      alt=""
                    />
                    <span className="ml-3 font-light text-sm">
                      Chip A15 Bionic cho hiệu năng thần tốc, xử lý tác vụ mượt
                      mà và nhanh chóng.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <div className="p-4  bg-white h-fit rounded-xl">
              <div className="flex items-center justify-start gap-4">
                <img
                  src="https://salt.tikicdn.com/ts/upload/94/36/e7/c5297f3fad0a83fb56f98be877904467.png"
                  className="w-[94px] h-[20px] object-cover"
                  alt=""
                />
                <img
                  src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                  className="w-[94px] h-[20px] object-cover"
                  alt=""
                />
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[14px]">Thương hiệu : </p>
                  <span className="text-blue-500 text-sm font-light">
                    Apple
                  </span>
                </div>
              </div>
              <div className="my-4">
                <h3 className="font-light-bold text-lg">
                  Apple iPhone 14 Plus
                </h3>
              </div>
              <div className="my-4 flex items-center justify-start gap-2">
                <p className="font-semibold text-sm">5.0</p>
                <div className="flex items-center gap-1">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="#FFC400"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="#FFC400"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="#FFC400"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="#FFC400"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="#FFC400"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">(341)</p>
                <div className="w-[1px] h-5 bg-gray-300"></div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-light text-sm text-gray-400">Đã bán : </p>
                  <span className="text-blue-400 text-sm font-light">485</span>
                </div>
              </div>
              <div className="my-4 text-red-500 gap-2">
                <div className="flex items-center justify-start relative w-fit">
                  <span className=" text-[24px] w-fit font-bold">
                    {formatNumberVnd(25300000)}
                  </span>
                  <div className="text-lg absolute right-[-16px] top-[-6px]">
                    đ
                  </div>
                  <div className="absolute text-gray-700 font-light-bold text-sm bg-gray-200 p-1 rounded-3xl right-[-70px]">
                    -31%
                  </div>
                </div>
              </div>
              {colors ? (
                <div className="mb-4">
                  <p className="font-semibold text-sm text-gray-700">Màu sắc</p>
                  <div className="flex gap-2 mt-2 ">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`p-1 border rounded-lg cursor-pointer relative w-[100px] flex items-center justify-around ${
                          selectedColor.name === color.name
                            ? "border-blue-600 border-2"
                            : "border-gray-200"
                        }`}
                      >
                        {selectedColor.name === color.name && (
                          <div className="absolute top-[-1px] right-0">
                            <img
                              src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                              alt="Selected"
                              className="w-[13px] h-[13px]"
                            />
                          </div>
                        )}
                        <img
                          src={color.image}
                          alt={color.name}
                          className="w-8 h-8 mb-1"
                        />
                        <p className="text-sm">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {sizes ? (
                <div>
                  <p className="font-semibold text-sm text-gray-800">Kích cỡ</p>
                  <div className="mt-2 flex items-center gap-4">
                    {sizes.map((size: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={` border rounded-lg cursor-pointer relative py-2 px-3  ${
                          selectedSize === size
                            ? "border-blue-600 border-2"
                            : "border-gray-200"
                        }`}
                      >
                        {selectedSize === size && (
                          <div className="absolute top-[-1px] right-0">
                            <img
                              src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                              alt="Selected"
                              className="w-[13px] h-[13px]"
                            />
                          </div>
                        )}
                        <p className="text-sm">{size}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-4 mt-4 bg-white rounded-xl">
              <h3>Vận chuyển</h3>
              <div className="flex items-center gap-2 my-2">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-light">Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/baa823ac1c58392c2031.svg"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-light my-2">Vận chuyển tới</span>
                <span className="text-sm font-light my-2 text-primary">
                  Thanh Khê , Đà Nẵng
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-light my-2">Phí vận chuyển</span>
                <div className="flex items-center text-gray-600 underline justify-start relative w-fit">
                  <span className=" text-sm w-fit  font-light">0</span>
                  <div className="text-sm font-light absolute right-[-12px] top-[-6px]">
                    đ
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-xl">
              <h3>Chính sách mua hàng</h3>
              <div className="flex items-center justify-start gap-4 my-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-thin">
                  Được đồng kiểm khi nhận hàng
                </span>
              </div>
              <div className="flex items-center justify-start gap-4 my-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-thin">
                  Được hoàn tiền lên tới 200% khi hàng giả
                </span>
              </div>
              <div className="flex items-center justify-start gap-4 my-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-thin">
                  Chính sách đổi trả hàng trong 30 ngày !
                </span>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-xl">
              <h3>Sản phẩm tương tự</h3>
              <div className="grid grid-cols-4 gap-4 items-center mt-2">
                {Array.from({ length: 6 }).map((_, index: number) => (
                  <ProductItem key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white h-fit rounded-xl">
            <div className="p-4">
              <div className="flex gap-4 ">
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:100:100/q:90/plain/https://cellphones.com.vn/media/wysiwyg/HI.gif"
                  alt=""
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div className="flex flex-col ">
                  <h4 className="font-light-bold">CellPhone S</h4>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png.webp"
                      className="object-cover h-4 w-14"
                      alt=""
                    />
                    <div className="w-[1px] py-2 bg-gray-200"></div>

                    <span className="text-sm">4.8</span>
                    <span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        color="#FFC400"
                        className="w-4 h-4 font-bold"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-light">Sản phẩm : </span>
                      <span className="text-sm font-light-bold text-primary">
                        58
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="flex items-center justify-start gap-4">
                      <div className="w-[100px] cursor-pointer h-[30px] bg-transparent border-2 flex items-center border-primary rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mx-2 w-4 h-4 text-primary"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                        <p className="text-[12px] font-light-bold text-primary">
                          Chat Ngay
                        </p>
                      </div>
                      <Link
                        to="/"
                        className="w-[100px] h-[30px] bg-transparent border-2 flex items-center border-gray-400 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4 mx-2 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                          />
                        </svg>

                        <p className="text-[12px] font-light-bold text-gray-400">
                          Xem Shop
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[0.1px] bg-gray-200 my-2"></div>
              <div className="flex items-center gap-4">
                <img
                  className="w-14 h-14 object-cover"
                  src="https://salt.tikicdn.com/cache/750x750/ts/product/9c/23/ef/b0c544a466ae947a8d8ca79acddcef74.jpg.webp"
                  alt=""
                />
                <span className="text-md font-light-bold">iPhone 14 Plus</span>
              </div>
              <div className="my-2">
                <p className="font-semibold text-sm text-gray-900">Số lượng</p>
                <div className="flex items-center space-x-2 my-2 mb-4">
                  <button
                    onClick={decrement}
                    className={`px-3 py-1 text-center border rounded ${
                      quantity <= 1 ? "border-gray-200 text-gray-300" : "border-gray-500 text-gray-500"
                    }`}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-10 py-1 text-center border border-gray-500 rounded"
                  />
                  <button
                    onClick={increment}
                    className="px-3 py-1 border  border-gray-500 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-600">Tạm tính</div>
                <div className="my-2 text-black gap-2">
                  <div className="flex items-center justify-start relative w-fit">
                    <span className=" text-[24px] w-fit font-bold">
                      {formatNumberVnd(subtotal)}
                    </span>
                    <div className="text-lg absolute right-[-16px] top-[-6px]">
                      đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;

import React, { useEffect, useState } from "react";
import CarouselSale from "../../Components/Carousel/CarouselSale";
import Modal from "../../Components/modal/Modal";
import FlastSale from "../../Components/Sales/FlastSale";
import ProductItem from "../../Components/Product/ProductItem";
import Catelog from "../../Components/Catelog/Catelog";
import HotProduct from "src/Components/ProductHot/HotProduct";
const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const isFirstTimeUser = sessionStorage.getItem("isFirstTimeUser") === null;
    if (isFirstTimeUser) {
      setShowModal(true);
    }
  }, []);
  const handleClose = () => {
    setShowModal(false);
    sessionStorage.setItem("isFirstTimeUser", "false");
  };
  return (
    <div className="container md:container md:mx-auto mx-auto">
      <div className="flex items-start justify-between gap-6">
        <div className="w-full">
          <CarouselSale />
          <div className="my-5 flex items-center justify-around gap-5 bg-white p-6 rounded-lg mx-auto">
            <div className="flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transform transition-all">
              <img
                src="https://salt.tikicdn.com/ts/upload/12/59/f8/b373e84ea401f63cef51ec385bbb9369.png"
                alt=""
                className="object-cover w-16 h-16 p-1 rounded-2xl border border-gray-300"
              />
              <span className="text-sm mt-2 font-semibold">HOT</span>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transform transition-all">
              <img
                src="https://salt.tikicdn.com/ts/upload/18/ec/0b/7f09f2ec4d8d5ceb81b8c043dbc747d0.png"
                alt=""
                className="object-cover w-16 h-16 p-1 rounded-2xl border border-gray-300"
              />
              <span className="text-sm mt-2 font-semibold">Chính hãng</span>
            </div>

            <div className="flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transform transition-all">
              <img
                src="	https://salt.tikicdn.com/ts/upload/b1/5f/5e/501a9b0ed0c1735d3e3872bad6e587df.png"
                alt=""
                className="object-cover w-16 h-16 p-1 rounded-2xl border border-gray-300"
              />
              <span className="text-sm mt-2 font-semibold">Sản phẩm mới</span>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transform transition-all">
              <img
                src="	https://salt.tikicdn.com/cache/w100/ts/ta/70/b9/49/43f25c0f4ee6b7a0d918f047e37e8c87.png.webp"
                alt=""
                className="object-cover w-16 h-16 p-1 rounded-2xl border border-gray-300"
              />
              <span className="text-sm mt-2 font-semibold">Yêu thích</span>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transform transition-all">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/ta/a3/2e/66/05032c91d5d30f4171b2642b635c1ef6.png.webp"
                alt=""
                className="object-cover w-16 h-16 p-1 rounded-2xl border border-gray-300"
              />
              <span className="text-sm mt-2 font-semibold">Gia dụng</span>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer hover:translate-y-[-5px] transform transition-all">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/ta/f0/db/cd/dc286242f00373007d79073074384f45.png.webp"
                alt=""
                className="object-cover w-16 h-16 p-1 rounded-2xl border border-gray-300"
              />
              <span className="text-sm mt-2 font-semibold">Thể thao</span>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <img
          src="https://salt.tikicdn.com/ts/tikimsp/dd/2b/c9/bbdc6ae7fa135b0ac74e7743a9cc481e.png"
          alt="" className="w-[70%] h-[70%] mx-auto"
        />
      </Modal>
      {/* <FlastSale /> */}
      <div className="my-5 h-fit bg-white p-4 rounded-lg mx-auto">
        <div className="flex gap-2 items-center justify-start">
          <img
            src="https://salt.tikicdn.com/ts/upload/f8/77/0b/0923990ed377f50c3796f9e6ce0dddde.png"
            className="w-52 h-9 object-fill"
            alt=""
          />
          {/* <h3>Sản phẩm Hot</h3> */}
        </div>
        <HotProduct />
      </div>
      <div className="my-5 h-fit bg-white p-4 rounded-lg mx-auto">
        <div className="flex gap-2 items-center justify-start">
          <img
            src="	https://salt.tikicdn.com/cache/w100/ts/ta/70/b9/49/43f25c0f4ee6b7a0d918f047e37e8c87.png.webp"
            className="w-12 h-12 object-fill"
            alt=""
          />
          <h3>Gợi ý cho bạn hôm nay </h3>
        </div>
        <Catelog />
      </div>
      
    </div>
  );
};

export default HomePage;

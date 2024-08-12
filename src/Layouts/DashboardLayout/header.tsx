import React, { useEffect, useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";

const HeaderAdmin: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [infoUserFormToken, setInfoUserFormToken] = useState<{
    [key: string]: any;
  } | null>(null);

  useEffect(() => {
    const getAccessToken = localStorage.getItem("access_token");
    if (getAccessToken !== null) {
      setAccessToken(getAccessToken);
    }
  }, [infoUserFormToken]);

  const decodeToken = () => {
    if (accessToken !== "") {
      const decodeToken = jwtDecode(accessToken) as { [key: string]: any };
      setInfoUserFormToken(decodeToken);
    }
  };

  useEffect(() => {
    decodeToken();
  }, [accessToken]);

  return (
    <div className="">
      <div className=" fixed flex justify-between w-screen shadow-sm px-10 border-b bg-white z-50">
        <div className="flex justify-center items-center">
          <div className=" ">
            <img className=" w-16 " src="https://i.imgur.com/1rzy8ne.png" alt="" />
          </div>
          <div className=" font-normal text-lg font-mono uppercase text-gray-700">
            TechTribe-Ecommerce
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <div className=" px-2 flex gap-1 items-center text-xl border-r">
            <div className="  relative group">
              <div className="p-4 hover:bg-gray-100 cursor-pointer">
                <TfiMoreAlt />
              </div>
            </div>
            <div className=" relative group">
              <div className="p-4 hover:bg-gray-100 cursor-pointer">
                <IoMdNotifications />
              </div>
              <div className="group-hover:block absolute hidden -right-[120px] top-full pt-2">
                <div className="  bg-white w-[350px] rounded-md shadow-lg">
                  <div className=" py-2 px-4 flex justify-between text-xs font-normal">
                    <p>Thông báo gần đây</p>
                    <p>Đánh dấu đã đọc</p>
                  </div>
                  <div className=" max-h-[350px] overflow-y-auto px-4 py-2 border-y flex flex-col gap-2">
                    <div className=" flex gap-2">
                      <img
                        className=" w-10 h-10 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s"
                        alt=""
                      />
                      <div className=" hover:text-primary cursor-pointer">
                        <p className=" text-base text-left">Tittle</p>
                        <p className=" font-normal text-left text-sm">
                          description description description description
                          descriptiondescription
                        </p>
                        <p className="font-normal text-left text-xs">
                          12:00 20/22/2024
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      <img
                        className=" w-10 h-10 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s"
                        alt=""
                      />
                      <div className=" hover:text-primary cursor-pointer">
                        <p className=" text-base text-left">Tittle</p>
                        <p className=" font-normal text-left text-sm">
                          description description description description
                          descriptiondescription
                        </p>
                        <p className="font-normal text-left text-xs">
                          12:00 20/22/2024
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      <img
                        className=" w-10 h-10 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s"
                        alt=""
                      />
                      <div className=" hover:text-primary cursor-pointer">
                        <p className=" text-base text-left">Tittle</p>
                        <p className=" font-normal text-left text-sm">
                          description description description description
                          descriptiondescription
                        </p>
                        <p className="font-normal text-left text-xs">
                          12:00 20/22/2024
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      <img
                        className=" w-10 h-10 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s"
                        alt=""
                      />
                      <div className=" hover:text-primary cursor-pointer">
                        <p className=" text-base text-left">Tittle</p>
                        <p className=" font-normal text-left text-sm">
                          description description description description
                          descriptiondescription
                        </p>
                        <p className="font-normal text-left text-xs">
                          12:00 20/22/2024
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      <img
                        className=" w-10 h-10 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vvbFR_-UXTv9XI91T-9x6oEgqNtwRAwrjg&s"
                        alt=""
                      />
                      <div className=" hover:text-primary cursor-pointer">
                        <p className=" text-base text-left">Tittle</p>
                        <p className=" font-normal text-left text-sm">
                          description description description description
                          descriptiondescription
                        </p>
                        <p className="font-normal text-left text-xs">
                          12:00 20/22/2024
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className=" text-primary text-base py-2">
                      Xem tất cả thông báo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" relative group">
            <div className="flex gap-2 items-center cursor-pointer">
              <img
                className=" w-7 h-7 rounded-full object-cover"
                src={infoUserFormToken?.avata}
                alt=""
              />
              <p> {infoUserFormToken?.username} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;

import React, { useEffect, useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

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
      <div className=" fixed flex justify-between w-screen shadow-sm ps-4 pe-8 border-b bg-white z-50">
        <Link to='/' className="flex justify-center items-center">
          <div className=" ">
            <img className=" w-16 " src="https://i.imgur.com/1rzy8ne.png" alt="" />
          </div>
          <div className=" font-normal text-lg font-mono uppercase text-gray-700">
            TechTribe-Ecommerce
          </div>
        </Link>
        <div className=" flex gap-2 items-center">
          <div className=" px-2 flex gap-1 items-center text-xl border-r">
            <div className="  relative group">
              <div className="p-4 hover:bg-gray-100 cursor-pointer">
                <TfiMoreAlt />
              </div>
            </div>
            <div className=" relative group">
              <div className="p-4 hover:bg-gray-100 cursor-pointer">
              <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="notification"><path fill="#4b6373" d="M11 54a7.009 7.009 0 0 1-7-7 1 1 0 0 1 2 0 5.006 5.006 0 0 0 5 5 1 1 0 0 1 0 2zm41.779-32a1 1 0 0 1-.989-.858A19.926 19.926 0 0 0 40.5 5.905a1 1 0 1 1 .855-1.805 21.919 21.919 0 0 1 12.416 16.758A1 1 0 0 1 52.779 22zM59 46a1 1 0 0 1-1-1 5.006 5.006 0 0 0-5-5 1 1 0 0 1 0-2 7.009 7.009 0 0 1 7 7 1 1 0 0 1-1 1zM11 28a1 1 0 0 1-1-1v-3a21.813 21.813 0 0 1 3.28-11.528 1 1 0 1 1 1.7 1.056A19.806 19.806 0 0 0 12 24v3a1 1 0 0 1-1 1z"></path><circle cx="32" cy="54" r="4" fill="#4b6373"></circle><path fill="#4b6373" d="M53 44a5.006 5.006 0 0 1-5-5V24a16 16 0 0 0-32 0v15a5.006 5.006 0 0 1-5 5 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h42a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM40.577 26.552 38.6 29.176l.7 4.377A2.105 2.105 0 0 1 37.234 36a2.109 2.109 0 0 1-.692-.117l-4.51-1.554-4.572 1.554a2.1 2.1 0 0 1-2.76-2.328l.719-4.308-1.993-2.695a2.1 2.1 0 0 1 1.269-3.319l3.322-.663 2.183-3.553A2.091 2.091 0 0 1 32 18a2.087 2.087 0 0 1 1.8 1.019l2.111 3.5 3.394.71a2.1 2.1 0 0 1 1.269 3.319Z"></path><path fill="#ff8900" d="M35.593 24.531a2.106 2.106 0 0 1-1.392-.975L32.09 20.05A.092.092 0 0 0 32 20a.1.1 0 0 0-.091.051L29.8 23.557a2.107 2.107 0 0 1-1.391.974l-3.321.663-.062.155L27 27.972a2.1 2.1 0 0 1 .393 1.606l-.719 4.307c.079.128.122.115.137.107l4.5-1.553a2.13 2.13 0 0 1 1.372 0l4.511 1.555a.1.1 0 0 0 .1-.019l-.69-4.394A2.1 2.1 0 0 1 37 27.973l1.978-2.625-.062-.154Z"></path></svg>
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

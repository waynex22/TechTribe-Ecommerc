import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useGetUserMutation } from "src/redux/rtkQuery/user_customers";
import { FaHome, FaList, FaShopify, FaShoppingBag } from "react-icons/fa";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoList } from "react-icons/io5";

const AsideAdmin: React.FC = () => {
  const [getUser] = useGetUserMutation();
  const [accessToken, setAccessToken] = useState<string>("");
  const [infoUserFormToken, setInfoUserFormToken] = useState<{
    [key: string]: any;
  } | null>(null);
  const [infoUser, setInfoUser] = useState<{ [key: string]: any } | null>(null);

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
    <aside
      className=" w-72 max-h-screen overflow-y-hidden hover:overflow-y-auto mt-[64px] border-r bg-slate-400"
      aria-label="Sidebar"
    >
      <div className="flex flex-col justify-between items-left">
          <Link to="/dashboard" className="flex justify-left items-center p-3 active:bg-gray-200 rounded-lg duration-300 bg-opacity-90 ">
            <div className=" p-2 bg-slate-50 rounded-xl active:bg-blue-500 w-8 h-8 me-2" >
              <FaHome className="text-blue-500 text-base active:text-slate-50 flex my-0 mx-auto z-10"/>
            </div>
            <p className="text-gray-700">Dashboard</p>
          </Link>
          <Link to="/dashboard/shop" className="flex justify-left items-center p-3 active:bg-gray-200 rounded-lg duration-300 bg-opacity-90 ">
            <div className=" p-2 bg-slate-50 rounded-xl active:bg-blue-500 w-8 h-8 me-2" >
              <FaShoppingBag className="text-blue-500 text-base active:text-slate-50 flex my-0 mx-auto z-10"/>
            </div>
            <p className="text-gray-700 items-start">Shop</p>
          </Link>
          <Link to="/dashboard/voucher" className="flex justify-left items-center p-3 active:bg-gray-200 rounded-lg duration-300 bg-opacity-90 ">
            <div className=" p-2 bg-slate-50 rounded-xl active:bg-blue-500 w-8 h-8 me-2" >
              <RiCoupon3Fill className="text-blue-500 text-base active:text-slate-50 flex my-0 mx-auto z-10"/>
            </div>
            <p className="text-gray-700 items-start">Voucher</p>
          </Link>
          <Link to="/dashboard/category" className="flex justify-left items-center p-3 active:bg-gray-200 rounded-lg duration-300 bg-opacity-90 ">
            <div className=" p-2 bg-slate-50 rounded-xl active:bg-blue-500 w-8 h-8 me-2" >
              <FaList className="text-blue-500 text-base active:text-slate-50 flex my-0 mx-auto z-10"/>
            </div>
            <p className="text-gray-700 items-start">Category</p>
          </Link>
      </div>
    </aside>
  );
};

export default AsideAdmin;

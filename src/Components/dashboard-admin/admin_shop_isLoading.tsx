import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllShopQuery, useGetBanShopQuery } from "src/redux/rtkQuery/admin";

const AdminShopComponentIsLoading: React.FC = () => {
  const [openFormBanShop, setOpenFormBanShop] = useState(false);
  const handleOpen = () => setOpenFormBanShop(true);
  const handleClose = () => setOpenFormBanShop(false);
  const [idShop, setIdShop] = useState<string>('')
  const {
    data: shops,
  } = useGetAllShopQuery();

  const {
    data: banshops,
    error,
    isLoading,
  } = useGetBanShopQuery();

  const conbinedData = [ ...(shops || []), ...(banshops || [])]

  console.log(shops);
  

  return (
    <div>
      <div className="flex items-center mb-4 text-gray-100">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700 animate__animated h-7 animate-pulse bg-gray-200 w-full mx-2"></div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-700 border-b">
            <th className="px-4 py-2 animate__animated h-16 rounder-lg animate-pulse bg-gray-200 w-40 mx-2"></th>
            <th className="px-4 py-2 animate__animated h-16 rounder-lg animate-pulse bg-gray-200 w-40 mx-2"></th>
            <th className="px-4 py-2 animate__animated h-16 rounder-lg animate-pulse bg-gray-200 w-40 mx-2"></th>
            <th className="px-4 py-2 animate__animated h-16 rounder-lg animate-pulse bg-gray-200 w-40 mx-2"></th>
            <th className="px-4 py-2 animate__animated h-16 rounder-lg animate-pulse bg-gray-200 w-40 mx-2"></th>
          </tr>
        </thead>
        <tbody>
        {Array.from({ length: 10 }).map((_, index: number) => (
            <tr key={index} className="border-b text-gray-700 my-2">
              <td className="px-4 py-2 flex justify-start items-center">
                <div className=" overflow-hidden me-2 ">
                  <img className=" rounded-full object-cover border animate__animated h-16 animate-pulse bg-gray-200 w-full mx-2"
                    src=''
                    alt=""
                  />
                </div>
                <p className="items-start animate__animated h-16 rounded-lg animate-pulse bg-gray-200 w-full mx-2"></p>
              </td>
              <td className="px-4 py-2 text-center animate__animated h-16 rounded-lg animate-pulse bg-gray-200 w-20 mx-2"> </td>
              <td className="px-4 py-2 text-center animate__animated h-16 rounded-lg animate-pulse bg-gray-200 w-20 mx-2"> </td>
              <td className="px-4 py-2 text-center animate__animated h-16 rounded-lg animate-pulse bg-gray-200 w-20 mx-2"></td>
              <td className="px-4 py-2 text-center animate__animated h-16 rounded-lg animate-pulse bg-gray-200 w-20 mx-2">
                <button className="rounded min-w-16 text-amber-500 bg-amber-200 bg-opacity-80 hover:text-amber-600 hover:bg-amber-400 text-sm cursor-pointe duration-200 ms-2 py-1">
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminShopComponentIsLoading;

import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllShopQuery, useGetBanShopQuery } from "src/redux/rtkQuery/admin";
import AdminFormBanShopComponent from "./modal_banshop";
import AdminShopComponentIsLoading from "./admin_shop_isLoading";

const AdminShopComponent: React.FC = () => {
  const [openFormBanShop, setOpenFormBanShop] = useState(false);
  const handleOpen = () => setOpenFormBanShop(true);
  const handleClose = () => setOpenFormBanShop(false);
  const [idShop, setIdShop] = useState<string>('')
  const {
    data: shops,
    isLoading,
    refetch
  } = useGetAllShopQuery(undefined,{ refetchOnMountOrArgChange: true,refetchOnReconnect: true});

  // const {
  //   data: banshops,
  //   error,
  //   refetch
  // } = useGetBanShopQuery();

  console.log(shops);
  useEffect(() => {
    refetch()
  },[])

  if(isLoading) return <AdminShopComponentIsLoading/>
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className=" ms-2 mt-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700">Shop</div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className="px-4 py-2">Tên Shop</th>
            <th className="px-4 py-2">Số lượng theo dõi</th>
            <th className="px-4 py-2">Mô tả</th>
            <th className="px-4 py-2">Số sao</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {shops?.map(shop => (
            <tr key={shop._id} className="border-b text-gray-700 text-left font-mono">
              <td className="px-4 py-2 flex justify-start items-center">
                <div className=" overflow-hidden me-2 ">
                  <img className=" w-16 h-16 rounded-full object-cover border"
                    src={shop.thumbnail}
                    alt=""
                  />
                </div>
                <p className="items-start font-bold">{shop.name}</p>
              </td>
              <td className="px-4 py-2 font-light"> {shop.countFollower}</td>
              <td className="px-4 py-2 font-light"> {shop.description}</td>
              <td className="px-4 py-2 font-light">{shop.start}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => (handleOpen(), setIdShop(shop._id))} className="rounded min-w-16 text-amber-500 bg-amber-200 bg-opacity-80 hover:text-amber-600 hover:bg-amber-400 text-sm cursor-pointe duration-200 ms-2 py-1">
                  Ban
                </button>
              </td>
            </tr>
          ))}
          <AdminFormBanShopComponent openFormBanShop={openFormBanShop} id_shop= {idShop} handleClose={handleClose}   />
        </tbody>
      </table>
    </div>
  );
};

export default AdminShopComponent;
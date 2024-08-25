import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "src/redux/rtkQuery/product";
import AdminShopComponentIsLoading from "../shop/admin_shop_isLoading";

const AdminProductComponent: React.FC = () => {
  const {
    data: products,
    isLoading,
    refetch
  } = useGetProductQuery();

  // const {
  //   data: banshops,
  //   error,
  //   refetch
  // } = useGetBanShopQuery();

  useEffect(() => {
    refetch()
    console.log("products",products);
    
  },[])

  if(isLoading) return <AdminShopComponentIsLoading/>
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className=" ms-2 mt-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700">User</div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className="px-4 py-2">Tên sản phẩm</th>
            <th className="px-4 py-2">Tên cửa hàng</th>
            <th className="px-4 py-2">Mô tả</th>
            <th className="px-4 py-2">Giá</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(prod => (
            <tr key={prod._id} className="border-b text-gray-700 text-left font-mono">
              <td className="px-4 py-2 flex justify-start items-center">
                <div className=" overflow-hidden me-2 ">
                  <img className=" w-16 h-16 rounded-full object-cover border"
                    src={prod.thumbnails[0]}
                    alt=""
                  />
                </div>
                <p className="items-start font-bold max-w-40">{prod.name}</p>
              </td>
              <td className="px-4 py-2 font-light max-w-2xl">{prod.id_shop[0]?.name}</td>
              <td className="px-4 py-2 font-light max-w-2xl">{prod.description}</td>
              <td className="px-4 py-2 font-light">{prod.product_price[0].price}đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductComponent;

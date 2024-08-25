import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllShopQuery, useGetBanShopQuery } from "src/redux/rtkQuery/admin";
import { useGetAllUserQuery } from "src/redux/rtkQuery/user_customers";
import UserList from "./search_user";
// import AdminUserComponentIsLoading from "./admin_shop_isLoading";

const AdminUserComponent: React.FC = () => {
  const {
    data: users,
    isLoading,
    refetch
  } = useGetAllUserQuery();

  // const {
  //   data: banshops,
  //   error,
  //   refetch
  // } = useGetBanShopQuery();

  useEffect(() => {
    refetch()
  },[])

//   if(isLoading) return <AdminShopComponentIsLoading/>
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className=" ms-2 mt-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
        <div className="text-gray-700">/</div>
        <div className="ms-2 text-gray-700">User</div>
      </div>
      <UserList users={users}/>
      {/* <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-400 text-sm font-light border-b text-left font-mono">
            <th className="px-4 py-2">Tên user</th>
            <th className="px-4 py-2">Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user._id} className="border-b text-gray-700 text-left font-mono">
              <td className="px-4 py-2 flex justify-start items-center">
                <div className=" overflow-hidden me-2 ">
                  <img className=" w-16 h-16 rounded-full object-cover border"
                    src={`http://localhost:8080/uploads/${user.avata}`}
                    alt=""
                  />
                </div>
                <p className="items-start font-bold">{user.name}</p>
              </td>
              <td className="px-4 py-2 font-light">{user.phone}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => (handleOpen(), setIdShop(shop._id))} className="rounded min-w-16 text-amber-500 bg-amber-200 bg-opacity-80 hover:text-amber-600 hover:bg-amber-400 text-sm cursor-pointe duration-200 ms-2 py-1">
                  Ban
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table> */}
    </div>
  );
};

export default AdminUserComponent;

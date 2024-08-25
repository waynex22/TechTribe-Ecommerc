import React, { useEffect, useState } from "react";

const AdminUserComponentIsLoading: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-4 text-gray-100">
        <div className="ms-2 text-gray-700 animate__animated h-7 animate-pulse bg-gray-200 w-20 m-2"></div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-700 border-b">
            <th className=" rounder-sm ">
              <div className="rounded-full object-cover border animate__animated h-12 animate-pulse bg-gray-200 w-40 mx-2"></div>
            </th>
            <th className=" rounder-sm">
              <div className="rounded-full object-cover border animate__animated h-12 animate-pulse bg-gray-200 w-40 mx-2"></div>
            </th>
            <th className=" rounder-sm">
              <div className="rounded-full object-cover border animate__animated h-12 animate-pulse bg-gray-200 w-40 mx-2"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, index: number) => (
            <tr key={index} className="border-b text-gray-700">
              <td className="px-4 py-2 flex justify-start items-center">
                <div className=" overflow-hidden me-2 ">
                  <div className="rounded-full object-cover border animate__animated h-16 animate-pulse bg-gray-200 w-20 mx-2"></div>
                </div>
                <p className="items-center animate__animated h-10 rounded-lg animate-pulse bg-gray-200 w-40 mx-2"></p>
              </td>
              <td className="text-center animate__animated rounded-lg">
                <p className="items-center animate__animated h-10 rounded-lg animate-pulse bg-gray-200 w-40 mx-2"></p>
              </td>
              <td className="text-center animate__animated rounded-lg">
                <p className="items-center animate__animated h-10 rounded-lg animate-pulse bg-gray-200 w-40 mx-2"></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserComponentIsLoading;

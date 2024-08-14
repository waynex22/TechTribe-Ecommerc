import React from "react";
import HeaderSeller from "../SellerLayout/headerSeller";
import AsideLayout from "../SellerLayout/aside";
import DefaultAdminComponent from "src/Components/dashboard-admin/defaultAdminComponent";
import { Dashboard } from "@mui/icons-material";
import HeaderAdmin from "./header";
import AsideAdmin from "./aside";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=" min-w-[1440px] min-h-screen bg-gray-100 bg-opacity-85">
      <HeaderAdmin />
      <div className="flex gap-1">
        <AsideAdmin />
        <main className=' pt-16 w-full'>
          <div className=' p-4'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

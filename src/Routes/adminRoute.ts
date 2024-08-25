import AdminDashboardComponent from "src/Components/dashboard-admin/dashboard/admin_dashboard_component";
import { DefaultLayout, AdminLayout } from "../Layouts";
import { Route } from "../Type";
import AdminComponent from "src/Components/dashboard-admin/defaultAdminComponent";
import AdminShopComponent from "src/Components/dashboard-admin/shop/admin_shop_component";
import AdminVoucherComponent from "src/Components/dashboard-admin/voucher/voucher_component";
import AdminShopComponentIsLoading from "src/Components/dashboard-admin/shop/admin_shop_isLoading";
import AdminCategoryComponent from "src/Components/dashboard-admin/category";
import AdminCategory1Component from "src/Components/dashboard-admin/category/index1";
import AdminSpectificationComponent from "src/Components/dashboard-admin/specification";
import AdminUserComponent from "src/Components/dashboard-admin/user";
import AdminProductComponent from "src/Components/dashboard-admin/product";
import AdminWallet from "src/Components/dashboard-admin/wallet";

const adminRoute : Route[]= [
    {
        path: "/dashboard",
        component: AdminComponent,
        layout: AdminLayout,
        children:[
            {
                path: "",
                component: AdminDashboardComponent,
                layout: null,
            },
            {
                path: "shop",
                component: AdminShopComponent,
                layout: null,
            },
            {
                path: "voucher",
                component: AdminVoucherComponent,
                layout: null,
            },
            {
                path: "category",
                component: AdminCategoryComponent,
                layout: null,
            },
            {
                path: "spectification",
                component: AdminSpectificationComponent,
                layout: null,
            },
            {
                path: "isloading",
                component: AdminShopComponentIsLoading,
                layout: null,
            },
            {
                path: "user",
                component: AdminUserComponent,
                layout: null,
            },
            {
                path: "product",
                component: AdminProductComponent,
                layout: null,
            },
            {
                path: "wallet",
                component: AdminWallet,
                layout: null,
            },

        ]    
    }
]

export {adminRoute}
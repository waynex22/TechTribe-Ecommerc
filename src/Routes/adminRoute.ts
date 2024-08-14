import AdminDashboardComponent from "src/Components/dashboard-admin/admin_dashboard_component";
import { DefaultLayout, AdminLayout } from "../Layouts";
import { Route } from "../Type";
import AdminComponent from "src/Components/dashboard-admin/defaultAdminComponent";
import AdminShopComponent from "src/Components/dashboard-admin/admin_shop_component";
import AdminVoucherComponent from "src/Components/dashboard-admin/voucher/voucher_component";
import AdminShopComponentIsLoading from "src/Components/dashboard-admin/admin_shop_isLoading";

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
                path: "isloading",
                component: AdminShopComponentIsLoading,
                layout: null,
            },

        ]    
    }
]

export {adminRoute}
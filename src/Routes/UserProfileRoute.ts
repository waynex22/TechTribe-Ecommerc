import OrderDetail from "src/Components/User_components/OrderDetail/OrderDetail";
import LayoutUserComponent from "../Components/User_components/layout_user_component";
import ComponentUserAccountProfile from "../Components/User_components/User_account/User_account_profile_component";
import ComponentUserAddress from "../Components/User_components/User_account/User_address";
import ComponentUserChangePassword from "../Components/User_components/User_account/User_changepassword";
import ComponentUserCoin from "../Components/User_components/User_coin/User_coin";
import ComponentUserPurchase from "../Components/User_components/User_purchase";
import ComponentUserVoucher from "../Components/User_components/User_voucher";
import { DefaultLayout } from "../Layouts";
import { Route } from "../Type";
import NotificationOrder from "src/Components/User_components/Notification/NotificationOrder";
import NotificationWallet from "src/Components/User_components/Notification/NotificationWallet";

const userProfileRouter: Route[] = [
    {
        path: "/me",
        component: LayoutUserComponent,
        layout: DefaultLayout,
        children: [
            {
                path: "",
                component: ComponentUserAccountProfile,
                layout: null,
            },
            {
                path: "info",
                component: ComponentUserAccountProfile,
                layout: null,
            },
            {
                path: "address",
                component: ComponentUserAddress,
                layout: null,
            },
            {
                path: "password",
                component: ComponentUserChangePassword,
                layout: null,
            },
            {
                path: "purchase",
                component: ComponentUserPurchase,
                layout: null,
            },
            {
                path: "purchase/order/:slug",
                component: OrderDetail,
                layout: null,
            },
            {
                path:'notification/order',
                component: NotificationOrder,
                layout: null,
            },
            {
                path: "notification/wallet",
                component: NotificationWallet,
                layout: null,
            },
            {
                path: "voucher",
                component: ComponentUserVoucher,
                layout: null,
            },
            {
                path: "coin",
                component: ComponentUserCoin,
                layout: null,
            },
        ]
    }
]

export { userProfileRouter }
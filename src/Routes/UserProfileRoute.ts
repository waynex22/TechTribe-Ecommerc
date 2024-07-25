import LayoutUserComponent from "../Components/User_components/layout_user_component";
import ComponentUserAccountProfile from "../Components/User_components/User_account/User_account_profile_component";
import ComponentUserAddress from "../Components/User_components/User_account/User_address";
import ComponentUserChangePassword from "../Components/User_components/User_account/User_changepassword";
import ComponentUserCoin from "../Components/User_components/User_coin/User_coin";
import ComponentUserAccountNotify from "../Components/User_components/User_notification/user_account_notify_component";
import ComponentUserPurchase from "../Components/User_components/User_purchase";
import ComponentUserVoucher from "../Components/User_components/User_voucher";
import { DefaultLayout } from "../Layouts";
import { Route } from "../Type";

const userProfileRouter : Route[]= [
    {
        path: "/profile",
        component: LayoutUserComponent,
        layout: DefaultLayout,
        children:[
            {
                path: "",
                component: ComponentUserAccountProfile,
                layout: null,
            },
            {
                path: "account",
                component: ComponentUserAccountProfile,
                layout: null,
            },
            {
                path: "account/address",
                component: ComponentUserAddress,
                layout: null,
            },
            {
                path: "account/password",
                component: ComponentUserChangePassword,
                layout: null,
            },
            {
                path: "purchase",
                component: ComponentUserPurchase,
                layout: null,
            },
            {
                path: "notification/order",
                component: ComponentUserAccountNotify,
                layout: null,
            },
            {
                path: "voucher-wallet",
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

export {userProfileRouter}
import ProductDetail from "../Components/Product/DetailProduct";
import HomePageComponent from "../Page/Home";
import LayoutUserComponent from "../Components/User_components/layout_user_component";
import { Route } from "../Type";
import ComponentUserAccount from "../Components/User_components/User_account/User_account_component";
import ComponentUserAccountProfile from "../Components/User_components/User_account/User_account_profile_component";
import { DefaultLayout } from "../Layouts";
import ComponentUserAccountNotify from "../Components/User_components/User_notification/user_account_notify_component";
import ComponentUserPurchase from "../Components/User_components/User_purchase";
import ComponentUserVoucher from "../Components/User_components/User_voucher";
import ComponentUserCoin from "../Components/User_components/User_coin/User_coin";
const publicRoutes: Route[]  = [
    {
        path: '/',
        component: HomePageComponent,
        layout: DefaultLayout,
    },
    {
        path: "/user",
        component: LayoutUserComponent,
        layout: DefaultLayout,
        children:[
            {
                path: "account",
                component: ComponentUserAccount,
                layout: null,
            },
            {
                path: "account/profile",
                component: ComponentUserAccountProfile,
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
    ,
    {
        path: '/product/:slug',
        component: ProductDetail,
        layout: null,
    },

]
export { publicRoutes };
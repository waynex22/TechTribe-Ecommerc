import ProductDetail from "../Components/Product/DetailProduct";
import HomePage from "../Page/Home";
import LayoutUserComponent from "../Components/User_components/layout_user_component";
import { Route } from "../Type";
import ComponentUserAccount from "../Components/User_components/User_account/User_account_component";
import ComponentUserAccountProfile from "../Components/User_components/User_account/User_account_profile_component";
import { DefaultLayout, PaymentLayout } from "../Layouts";
import ComponentUserAccountNotify from "../Components/User_components/User_notification/user_account_notify_component";
import ComponentUserPurchase from "../Components/User_components/User_purchase";
import ComponentUserVoucher from "../Components/User_components/User_voucher";
import ComponentUserCoin from "../Components/User_components/User_coin/User_coin";
import ComponentUserAddress from "../Components/User_components/User_account/User_address";
import ComponentUserChangePassword from "../Components/User_components/User_account/User_changepassword";
import CartPage from "../Page/Cart";
import PaymentPage from "../Page/Payment";
import QueryProductPage from "../Page/QueryProduct";
const publicRoutes: Route[]  = [
    {
        path: '/',
        component: HomePage,
        layout: DefaultLayout,
    },
    {
        path: "/checkout/cart",
        component: CartPage,
        layout: DefaultLayout,
    },
    {
        path: "/checkout/payment",
        component: PaymentPage,
        layout: PaymentLayout,
    },
    {
        path: "/search",
        component: QueryProductPage,
        layout: DefaultLayout,
    },
    {
        path: "/profile",
        component: LayoutUserComponent,
        layout: DefaultLayout,
        children:[
            {
                path: "",
                component: ComponentUserAccount,
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
    ,
    {
        path: '/product/:slug',
        component: ProductDetail,
        layout: DefaultLayout,
    },

]
export { publicRoutes };
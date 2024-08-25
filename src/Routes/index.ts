import ProductDetail from "../Components/Product/DetailProduct";
import HomePage from "../Page/Home";
import { Route } from "../Type";
import { DefaultLayout, PaymentLayout } from "../Layouts";
import CartPage from "../Page/Cart";
import PaymentPage from "../Page/Payment";
import QueryProductPage from "../Page/QueryProduct";
import ShopPage from "src/Page/Shop";
import OrderSuccessPage from "src/Page/OrderSuccess";
import CheckOutAddress from "src/Page/Address";
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
        path: "/shop/:id",
        component: ShopPage,
        layout: DefaultLayout,
        needChat: true
    },
    {
        path: "/checkout/payment",
        component: PaymentPage,
        layout: PaymentLayout,
    },
    {
        path: "/checkout/payment/success",
        component: OrderSuccessPage,
        layout: PaymentLayout,
    },
    {
        path: "/checkout/address",
        component: CheckOutAddress,
        layout: PaymentLayout,
    },
    {
        path: "/search",
        component: QueryProductPage,
        layout: DefaultLayout,
    },
    {
        path: '/product/:slug',
        component: ProductDetail,
        layout: DefaultLayout,
        needChat: true
    },
]
export { publicRoutes };
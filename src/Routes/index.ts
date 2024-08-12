import ProductDetail from "../Components/Product/DetailProduct";
import HomePage from "../Page/Home";
import { Route } from "../Type";
import { DefaultLayout, PaymentLayout } from "../Layouts";
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
        path: '/product/:slug',
        component: ProductDetail,
        layout: DefaultLayout,
    },

]
export { publicRoutes };
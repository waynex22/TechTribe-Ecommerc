import ProductDetail from "../Component/Product/DetailProduct";
import HomePageComponent from "../Page/Home";
import { Route } from "../Type";
const publicRoutes: Route[]  = [
    {
        path: '/',
        component: HomePageComponent,
        layout: null,
    },

    {
        path: '/product/:slug',
        component: ProductDetail,
        layout: null,
    },

]
export { publicRoutes };
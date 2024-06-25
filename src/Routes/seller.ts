import SellerLayout from "../Layouts/SellerLayout";
import SellerComponent from "../Page/Seller/inedex";
import AddProduct from "../Page/Seller/product/add/index";
import AddVoucher from "../Page/Seller/voucher/add";
import { Route } from "../Type";
const sellerRoutes: Route[] = [
    {
        path: '/seller/*',
        component: SellerComponent,
        layout: SellerLayout,
        children: [
            { path: '', component: AddProduct },
            { path: 'product/new', component: AddProduct },
            { path: 'voucher', component: AddVoucher },
        ],
    },

]
export { sellerRoutes };
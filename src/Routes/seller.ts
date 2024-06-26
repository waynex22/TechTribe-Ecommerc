import SellerComponent from "../Components/Seller/inedex";
import AddProduct from "../Components/Seller/product/add";
import AddVoucher from "../Components/Seller/voucher/add";
import SellerLayout from "../Layouts/SellerLayout";
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
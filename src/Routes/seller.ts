import SellerComponent from "../Component/Seller/inedex";
import AddProduct from "../Component/Seller/product/add";
import GetIdEditProduct from "../Component/Seller/product/edit";
import ListProduct from "../Component/Seller/product/listProduct";
import AddVoucher from "../Component/Seller/voucher/add";
import SellerLayout from "../Layouts/SellerLayout";
import { Route } from "../Type";
const sellerRoutes: Route[] = [
    {
        path: '/seller/*',
        component: SellerComponent,
        layout: SellerLayout,
        children: [
            { path: '', component: ListProduct },
            { path: 'product/new', component: AddProduct },
            { path: 'product/list', component: ListProduct },
            { path: 'product/edit/:idProduct', component: GetIdEditProduct },
            { path: 'voucher', component: AddVoucher },
        ],
    },

]
export { sellerRoutes };
import SellerComponent from "../Components/Seller/inedex";
import ManageProfileShop from "../Components/Seller/manageShop/settings";
import EditIdentityInformation from "../Components/Seller/manageShop/settings/editIdentityInformation";
import DiscountComponet from "../Components/Seller/marketing/discount";
import CreateDiscountProgram from "../Components/Seller/marketing/discount/create/createProgram";
import DetailDiscountCheckID from "../Components/Seller/marketing/discount/detail";
import FlashSaleComponet from "../Components/Seller/marketing/flashSale";
import VoucherComponet from "../Components/Seller/marketing/voucher";
import CreateVoucherComponent from "../Components/Seller/marketing/voucher/create/createVoucher";
import Detailvoucher from "../Components/Seller/marketing/voucher/detail/detailvoucher";
import AddProduct from "../Components/Seller/product/add";
import GetIdEditProduct from "../Components/Seller/product/edit";
import ListProduct from "../Components/Seller/product/listProduct";
import SellerLayout from "../Layouts/SellerLayout";
import LayouSellertNotAside from "../Layouts/SellerLayout/layoutNotAside";
import { Route } from "../Type";

const sellerRoutes: Route[] = [
    {
        path: '/seller/*',
        component: SellerComponent,
        layout: SellerLayout,
        children: [
            { path: 'settings/profile', component: ManageProfileShop },

            { path: 'product', component: ListProduct },
            { path: 'product/new', component: AddProduct },
            { path: 'product/edit/:idProduct', component: GetIdEditProduct },
            { path: 'product/list', component: ListProduct },
            
            { path: 'marketing/discount', component: DiscountComponet },
            { path: 'marketing/discount/create-program', component: CreateDiscountProgram },
            { path: 'marketing/discount/:idDiscount', component: DetailDiscountCheckID },
            
            { path: 'marketing/flash-sale', component: FlashSaleComponet },
            { path: 'marketing/vouchers', component: VoucherComponet },
            { path: 'marketing/vouchers/:idVoucher', component: Detailvoucher },
            { path: 'marketing/vouchers/new', component: CreateVoucherComponent },

            { path: '', component: ListProduct },
            { path: '*', component: ManageProfileShop },
        ],
    },
    { path: '/seller/settings/profile/identity-information', component: EditIdentityInformation, layout: LayouSellertNotAside },
];

export { sellerRoutes };
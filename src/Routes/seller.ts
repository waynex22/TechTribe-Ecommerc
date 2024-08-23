import AnalysisComponent from "../Components/Seller/analysis";
import ChatManagamentComponent from "../Components/Seller/customerService/chatManagament";
import AutoReplyComponent from "../Components/Seller/customerService/chatManagament/autoReply/autoReply";
import CreateMessageShortCut from "../Components/Seller/customerService/chatManagament/shortCut/create";
import EditMessageShortCut from "../Components/Seller/customerService/chatManagament/shortCut/edit/edit";
import MessageShortCut from "../Components/Seller/customerService/chatManagament/shortCut/messageShortCut";
import ReviewManagamentComponent from "../Components/Seller/customerService/reviewManagament";
import BalanceCompenent from "../Components/Seller/finace/blance";
import IncomeComponent from "../Components/Seller/finace/income";
import SellerComponent from "../Components/Seller/inedex";
import ManageProfileShop from "../Components/Seller/manageShop/settings";
import EditIdentityInformation from "../Components/Seller/manageShop/settings/editIdentityInformation";
import DiscountComponet from "../Components/Seller/marketing/discount";
import CreateDiscountProgram from "../Components/Seller/marketing/discount/create/createProgram";
import DetailDiscountCheckID from "../Components/Seller/marketing/discount/detail";
import FlashSaleComponet from "../Components/Seller/marketing/flashSale";
import CreateFlashSale from "../Components/Seller/marketing/flashSale/create/createFlashSale";
import DetailFlashSaleCheckID from "../Components/Seller/marketing/flashSale/detail";
import VoucherComponet from "../Components/Seller/marketing/voucher";
import CreateVoucherComponent from "../Components/Seller/marketing/voucher/create/createVoucher";
import Detailvoucher from "../Components/Seller/marketing/voucher/detail/detailvoucher";
import OrderComponent from "../Components/Seller/order";
import OrderDetail from "../Components/Seller/order/detail/index";
import OrderReturnComponent from "../Components/Seller/order/return";
import AddProduct from "../Components/Seller/product/add";
import GetIdEditProduct from "../Components/Seller/product/edit";
import ListProduct from "../Components/Seller/product/listProduct";
import SellerLayout from "../Layouts/SellerLayout";
import LayouSellertNotAside from "../Layouts/SellerLayout/layoutNotAside";
import { Route } from "../Type";

const sellerRoutes: Route[] = [
  {
    path: "/seller/*",
    component: SellerComponent,
    layout: SellerLayout,
    children: [
      { path: "settings/profile", component: ManageProfileShop },

      { path: "product", component: ListProduct },
      { path: "product/new", component: AddProduct },
      { path: "product/edit/:idProduct", component: GetIdEditProduct },
      { path: "product/list", component: ListProduct },

      { path: "marketing/discount", component: DiscountComponet },
      {
        path: "marketing/discount/create-program",
        component: CreateDiscountProgram,
      },
      {
        path: "marketing/discount/:idDiscount",
        component: DetailDiscountCheckID,
      },

      { path: "marketing/flash-sale", component: FlashSaleComponet },
      { path: "marketing/flash-sale/new", component: CreateFlashSale },
      {
        path: "marketing/flash-sale/:idFlashSale",
        component: DetailFlashSaleCheckID,
      },

      { path: "marketing/vouchers", component: VoucherComponet },
      { path: "marketing/vouchers/:idVoucher", component: Detailvoucher },
      { path: "marketing/vouchers/new", component: CreateVoucherComponent },

      { path: "order", component: OrderComponent },
      { path: "order/detail/:id", component: OrderDetail },
      { path: "order/return", component: OrderReturnComponent },

      { path: "chat-management", component: ChatManagamentComponent },
      { path: "chat-management/auto-reply", component: AutoReplyComponent },
      { path: "chat-management/message-short-cuts", component: MessageShortCut },
      { path: "chat-management/message-short-cuts/create", component: CreateMessageShortCut },
      { path: "chat-management/message-short-cuts/edit/:id", component: EditMessageShortCut },
      { path: "rating-management", component: ReviewManagamentComponent },

      { path: "income", component: IncomeComponent },
      { path: "wallet", component: BalanceCompenent },
      
      { path: "overview", component: AnalysisComponent },

      { path: "", component: ListProduct },
      { path: "*", component: ManageProfileShop },
    ],
  },
  {
    path: "/seller/settings/profile/identity-information/form",
    component: EditIdentityInformation,
    layout: LayouSellertNotAside,
  },
];
const noMessengerRoutes = [
  "/seller/product/new",
  "/seller/product/edit/:idProduct",
  "/seller/marketing/vouchers/new",
  "/seller/marketing/vouchers/:id",
  "/seller/marketing/flash-sale/new",
  "/seller/marketing/discount/create-program",
  "/seller/settings/profile/identity-information",
  "/seller/chat-management/message-short-cuts/create",
  "/seller/chat-management/message-short-cuts/edit/:id",
];
export { sellerRoutes, noMessengerRoutes };

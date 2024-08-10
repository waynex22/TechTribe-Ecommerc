export type Order = {
    _id?: string | any;
    customerId: string | any;
    status?: string;
    address?: string | any;
    shipping?: string;
    voucherShop?: string | any;
    totalDiscountShop?: number | any;
    voucher2t?: string | any;
    coin?: number;
    coinRefunt?: number | any;
    totalDisCount?: number | any;
    costShipping?: number;
    voucherShipping?: string | any;
    methodPayment?: string;
    items: { productPriceId: string; quantity: number }[];
    subTotal?: number | any;
    total?: number | any;
    customerReward?: any;
    listProduct?: any;
}
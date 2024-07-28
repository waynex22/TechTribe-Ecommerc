export type Order = {
    _id?: string | any;
    customerId: string | any;
    status?: string;
    address?: string;
    shipping?: string;
    voucherShop?: string | any;
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
}
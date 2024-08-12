
export const getMinMaxPriceInArr = (arr: any) => {
    const listPrice = arr?.map((item: any) => item.price)
    const min = Math.min(...listPrice)
    const max = Math.max(...listPrice)
    return { min, max }
}
export const getMinMaxPercentInArr = (arr: any) => {
    const listPercent = arr?.map((item: any) => item.percent)
    const minPercent = Math.min(...listPercent)
    const maxPercent = Math.max(...listPercent)
    return { minPercent, maxPercent }
}

export const discountPrice = (price: number, percent: number) => {
    return price - (price * percent) / 100
}
export const getMinMaxPriceAfterDiscount = (productPrices: any, discounts: any): { minPrice: number; maxPrice: number } | null => {
    if (productPrices?.length === 0) return null;

    let minPrice = 0;
    let maxPrice = 0;

    productPrices?.forEach((priceObj: any) => {
       const price = priceObj?.price;
       const check = discounts?.find((item: any) => item?.id_productPrice === priceObj?._id)

       if (check) {
           const percent = check?.percent;
           const newPrice = discountPrice(price, percent);
           if (newPrice < minPrice || minPrice === 0) {
               minPrice = newPrice;
           }
           if (newPrice > maxPrice) {
               maxPrice = newPrice;
           }
       }
    });

    return { minPrice, maxPrice };
};
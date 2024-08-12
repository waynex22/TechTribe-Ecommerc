export const groupByShop = (cartItems: any[]) => {
    return cartItems.reduce((groups: any, item: any) => {
      const shopId = item.productPriceId.id_product[0].id_shop[0]._id;
      if (!groups[shopId]) {
        groups[shopId] = [];
      }
      groups[shopId].push(item);
      return groups;
    }, {});
  };
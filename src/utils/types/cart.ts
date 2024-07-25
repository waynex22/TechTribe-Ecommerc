export type Cart = {
    userId: string;
    cartItems: CartItem[];
  };
export type CartItem = {
    productId: string;
    quantity: number;
  };            

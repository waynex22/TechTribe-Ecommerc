import Cart from "../../Components/Cart/Cart";

const CartPage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto">
        <h3 className="font-light-normal uppercase text-xl">Giỏ hàng</h3>
        <Cart />
      </div>
    </>
  );
};
export default CartPage;

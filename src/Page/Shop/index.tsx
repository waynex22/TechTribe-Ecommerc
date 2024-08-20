import { useState } from "react";
import { useParams } from "react-router-dom";
import InfoShop from "src/Components/Shop/infoShop";
import ProductOfShop from "src/Components/Shop/ProductOfShop";
import { useGetShopQuery } from "src/redux/rtkQuery/shop";

const ShopPage: React.FC = () => {
    const { id } = useParams();
    const { data : shop, refetch } = useGetShopQuery(id?.toString() || "");
    const [countProduct , setCountProduct] = useState(0);
    const handleSetCountProduct = (count: number) => {
        setCountProduct(count);
    }
    return (
        <>
        <div className="container mx-auto">
            <InfoShop shop={shop}  refecth={refetch} countProduct={countProduct}/>
            <ProductOfShop shop={shop}  handleSetCountProduct={handleSetCountProduct}/>
        </div>
        </>
    )
}
export default ShopPage;
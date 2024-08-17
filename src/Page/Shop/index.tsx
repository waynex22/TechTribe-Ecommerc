import { useParams } from "react-router-dom";
import InfoShop from "src/Components/Shop/infoShop";
import ProductOfShop from "src/Components/Shop/ProductOfShop";
import { useGetShopQuery } from "src/redux/rtkQuery/shop";

const ShopPage: React.FC = () => {
    const { id } = useParams();
    const { data : shop } = useGetShopQuery(id?.toString() || "");
    return (
        <>
        <div className="container mx-auto">
            <InfoShop shop={shop} />
            <ProductOfShop shop={shop} />
        </div>
        </>
    )
}
export default ShopPage;
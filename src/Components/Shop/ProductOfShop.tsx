import { useGetProductQuery } from "src/redux/rtkQuery/product"
import ProductItem from "../Product/ProductItem";

interface Props {
    shop: any
}
const ProductOfShop: React.FC<Props> = ({ shop }) => {
    const {data : products , isLoading } = useGetProductQuery();
    const listProductByShop = products?.filter((item: any) => item.id_shop[0]._id === shop?._id);
    console.log(products);
    
    if(isLoading) return <div>Loading</div>;
    return (
       <>
       <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-sm font-normal text-gray-700">Sản phẩm của shop</h2>
                <div className="my-5 grid lg:grid-cols-6 grid-cols-3 sm:grid-cols-1 gap-3">
                    {listProductByShop && listProductByShop.map((item: any) => (
                        <ProductItem key={item._id} product={item} />
                    ))}
                </div>
       </div>
       </>
    )
}

export default ProductOfShop
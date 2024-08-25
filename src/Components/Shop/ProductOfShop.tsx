import { useGetProductQuery } from "src/redux/rtkQuery/product"
import ProductItem from "../Product/ProductItem";
import { useEffect } from "react";
import SpinLoading from "../spinner/spinLoading";

interface Props {
    shop: any,
    handleSetCountProduct: (count: number) => void
}
const ProductOfShop: React.FC<Props> = ({ shop , handleSetCountProduct}) => {
    const {data : products , isLoading } = useGetProductQuery();
    const listProductByShop = products?.filter((item: any) => item.id_shop[0]._id === shop?._id);
    useEffect(() => {
        handleSetCountProduct(listProductByShop?.length || 0)
    },[listProductByShop])
    return (
       <>
       <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-sm font-normal text-gray-700">Sản phẩm của shop</h2>
        {isLoading ? (
            <>
            <SpinLoading loading={isLoading} />
            </>
        ):(
            <>
              <div className="my-5 grid lg:grid-cols-6 grid-cols-3 sm:grid-cols-1 gap-3">
                    {listProductByShop && listProductByShop.map((item: any) => (
                        <ProductItem key={item._id} product={item} />
                    ))}
                </div>
            </>
        )}
       </div>
       </>
    )
}

export default ProductOfShop
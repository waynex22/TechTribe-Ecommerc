import { useGetProductQuery } from "../../redux/rtkQuery/product";
import { product } from "../../utils/types/product";
import ProductItem from "../Product/ProductItem";

const Catelog: React.FC = () => {
    const { data: products, error, isLoading } = useGetProductQuery();
//   console.log(products);
    return (
        <>
        <div className="my-5 grid lg:grid-cols-6 grid-cols-3 sm:grid-cols-1 gap-3">
          {products && products.map((item: product, index: number) => (
            <ProductItem product={item}  />
          ))}
        </div>
        </>
    )
}

export default Catelog;
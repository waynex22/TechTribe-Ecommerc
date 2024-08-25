import { useEffect, useState } from "react";
import { useGetProductQuery } from "../../redux/rtkQuery/product";
import ProductItem from "../Product/ProductItem";

interface Props {
    query: string;
    sort: { priceMinMax?: [number, number]; sortOrder?: 'asc' | 'desc' };
}

const ProductQuery: React.FC<Props> = ({ query, sort }) => {
    const { data: Products, isLoading } = useGetProductQuery();
    const [listProductByQueryAndSort, setListProductByQueryAndSort] = useState<any[]>([]);

    useEffect(() => {
        if (!Products) return;

        let filteredProducts = Products.filter((item: any) =>
            item.id_categoryDetail[0].name === query || item.name.toLowerCase().includes(query.toLowerCase())
        );

        if (sort?.priceMinMax) {
            const [minPrice, maxPrice] = sort.priceMinMax;
            filteredProducts = filteredProducts.filter((item: any) =>
                item.product_price.some((priceItem: any) =>
                    priceItem.price >= minPrice && priceItem.price <= maxPrice
                )
            );
        }

        if (sort?.sortOrder) {
            filteredProducts = filteredProducts.sort((a: any, b: any) => {
                return sort.sortOrder === 'asc'
                    ? b.product_price[0].price - a.product_price[0].price
                    : a.product_price[0].price - b.product_price[0].price;
            });
        }

        setListProductByQueryAndSort(filteredProducts);
    }, [Products, query, sort]);

    if (isLoading) return <div>Loading...</div>;
    if(listProductByQueryAndSort.length === 0) return (<>
    <div className="bg-white p-4 rounded-lg mt-4 flex items-center justify-center">
                <p>Không tìm thấy sản phẩm nào</p>
            </div>
    </>)
    return (
        <div className="bg-white p-4 rounded-lg mt-4">
                <div className="my-5 grid lg:grid-cols-6 grid-cols-3 sm:grid-cols-1 gap-3">
                    {listProductByQueryAndSort && listProductByQueryAndSort.map((item: any) => (
                        <ProductItem key={item._id} product={item} />
                    ))}
                </div>
            </div>
    );
};

export default ProductQuery;

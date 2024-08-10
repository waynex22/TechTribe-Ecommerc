import React, { useState } from 'react';
import { useGetProductQuery } from '../../redux/rtkQuery/product';
import { product } from '../../utils/types/product';
import ProductItem from '../Product/ProductItem';
const HotProduct: React.FC = () => {
    const { data: products, error, isLoading } = useGetProductQuery();
    const listProductsHot = products?.filter((item: product) => item.percent > 0)
    const [visibleProducts, setVisibleProducts] = useState(12);
    const loadMoreProducts = () => {
        setVisibleProducts(prev => prev + 12);
    };
    if (isLoading) return <div>Loading</div>
    return (
        <>
        <div className="my-5 grid lg:grid-cols-6 grid-cols-3 sm:grid-cols-1 gap-3">
        {listProductsHot && listProductsHot.slice(0, visibleProducts).map((item: product, index: number) => (
          <ProductItem product={item} key={index} />
        ))}
      </div>
      {listProductsHot && visibleProducts < listProductsHot.length && (
        <div className="flex justify-center">
          <button
          onClick={loadMoreProducts}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 border border-primary text-primary hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full"
          type="button"
        >
          Xem thêm
        </button>
        </div>
      )}
        </>
    )
}

export default HotProduct;
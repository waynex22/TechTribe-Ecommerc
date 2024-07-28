import { useLocation } from "react-router-dom";
import ProductQuery from "../../Components/ProductQuery/ProductQuery";
import SortQueryProduct from "../../Components/ProductQuery/SortQueryProduct";
import { useState } from "react";

const QueryProductPage: React.FC = () => {
    const [sort , setSort ] = useState<any>(null);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query: any = useQuery().get('q');
    const handleSort = (e: any) => {
        setSort(e)
    }
    if (!query) return <></>;
    return (
        <>
            <div className="container mx-auto">
                <div className="flex items-center gap-2">
                    <p className="text-gray-400 ">Trang chủ</p>
                    <svg className="text-gray-400 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <p className="text-gray-900 text-sm">Kết quả tìm kiếm "{query}"</p>
                </div>
                <SortQueryProduct handleSort={handleSort} />
                <ProductQuery query={query} sort={sort} />
            </div>
        </>
    )
};
export default QueryProductPage;
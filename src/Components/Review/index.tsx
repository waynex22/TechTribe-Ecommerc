import { useGetProductReviewByProductQuery } from "src/redux/rtkQuery/product-review"
import TabFilterReview from "./tabFilterReview";
import { useEffect, useState } from "react";
import ItemReview from "./ItemReview";
import EmptyReview from "./EmptyReview";
interface Props {
    product: any
}
const Review: React.FC<Props> = ({ product }) => {
    const { data: reviews , isLoading } = useGetProductReviewByProductQuery(product?._id);
    const [RateSelected, setRateSelected] = useState<number>(0);
    const [filters, setFilters] = useState<any>([]);

    useEffect(() => {
        const filterOrder = RateSelected === 0 ? reviews : reviews?.filter((item: any) => item.rating === RateSelected);
        setFilters(filterOrder);

    }, [RateSelected, reviews]);
    if(isLoading) return <div>Loading</div>;
    return (
        <>
            <div className="w-full bg-white rounded-lg p-4 mt-4 min-h-[400px]">
                <h2>Đánh giá sản phẩm</h2>
                <TabFilterReview handleSetRate={setRateSelected} tab={RateSelected} product={product} reviews={reviews} />
                {filters && filters.length > 0 ? filters.map((item: any) => <ItemReview key={item._id} review={item} />) : <EmptyReview />}
        </div >
        </>
    )
}

export default Review
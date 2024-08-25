interface Review {
    customerId: any,
    productId: string,
    productPriceId: any,
    rating: number,
    content: string,
    images: string[] | any
}
interface Props {
    review: Review
}
const ItemReview: React.FC<Props> = ({ review }) => {
    return (
        <>
            <div className="w-full border-b border-dashed border-primary/40 my-10">
                <div className="flex items-start gap-2 my-2">
                    <img
                        src="https://salt.tikicdn.com/desktop/img/avatar.png"
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-start w-full">
                        <p className="text-sm">{review?.customerId?.name}</p>
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, index) => {
                                    const rating = review?.rating || 0;
                                    const isHalfStar = rating - index > 0 && rating - index < 1;
                                    return (
                                        <svg
                                            key={index}
                                            stroke="currentColor"
                                            fill={index < Math.floor(rating) ? "#579CEA" : isHalfStar ? "url(#half)" : "#E4E8EE"}
                                            strokeWidth="0"
                                            viewBox="0 0 24 24"
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {isHalfStar && (
                                                <defs>
                                                    <linearGradient id="half">
                                                        <stop offset="50%" stopColor="#579CEA" />
                                                        <stop offset="50%" stopColor="#E4E8EE" />
                                                    </linearGradient>
                                                </defs>
                                            )}
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                        </svg>
                                    );
                                })}
                            </div>
                            <div className="w-[1px] h-3 bg-gray-300">
                            </div>
                            <p className="text-xs text-gray-500 font-normal">Phân loại hàng: ({review?.productPriceId?.id_color[0]?.value} , {review?.productPriceId?.id_size[0] && review?.productPriceId?.id_size[0]?.value})</p>
                        </div>
                        <div className="flex flex-col items-start mt-6 gap-y-4">
                            {review?.content && <p className="text-sm">{review?.content}</p>}
                            <div className="flex items-center gap-1">
                                {review?.images?.map((image: string, index: number) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:8080/uploads/${image}`}
                                        alt=""
                                        className="w-14 h-14 object-cover rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ItemReview;
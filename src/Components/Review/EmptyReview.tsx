const EmptyReview = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[400px]">
            <img
                className="w-32 h-32"
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2.png"
                alt="empty-rate"    
            />
            <p className="text-sm font-normal text-gray-400">Chưa có đánh giá</p>
        </div>
    )
}

export default EmptyReview;
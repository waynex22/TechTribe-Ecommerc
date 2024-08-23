import React, { useEffect, useState } from 'react'
import { typeProductReview } from '../../../../utils/types/productReviewSeller'

const SetShowStar = ({ listReview, onHandleListShowReview }: {
    listReview: typeProductReview[]
    onHandleListShowReview: (listStar: number[]) => void
}) => {
    const stars = [5, 4, 3, 2, 1]
    const [listStarShow, setListStarShow] = useState([] as number[])
    useEffect(() => {
        setListStarShow(stars)
    }, [])
    const handleListStarShow = (star: number | string) => {
        let starChoose = []
        if (typeof star === 'number')
            if (listStarShow.includes(star))
                starChoose = listStarShow.filter(item => item !== star)
            else
                starChoose = [...listStarShow, star]
        else {
            starChoose = listStarShow.length === 5 ? [] : stars
        }
        setListStarShow(starChoose)
        onHandleListShowReview(starChoose)
    }

    return (
        <>
            <div className=' flex gap-6 items-center py-2'>
                <p className=' text-gray-600'> Số sao đánh giá</p>
                <div className=' flex gap-2 items-center'>
                    <input onChange={() => handleListStarShow('all')} type="checkbox" checked={listStarShow.length === 5} name="star" id="star_all" />
                    <label htmlFor="star_all">Tất cả</label>
                </div>
                {stars.map((star) => {
                    return (
                        <div key={star} className='flex gap-2 items-center'>
                            <input
                                onChange={() => handleListStarShow(star)}
                                type="checkbox"
                                checked={listStarShow.includes(star)}
                                name="star"
                                id={`star_${star}`}
                            />
                            <label className=' cursor-pointer' htmlFor={`star_${star}`}> {star} Sao ({listReview.filter(item => item.rating === star).length})</label>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default SetShowStar
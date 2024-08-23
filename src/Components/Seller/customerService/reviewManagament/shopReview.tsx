import React, { useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { typeProductReview } from '../../../../utils/types/productReviewSeller'
import { typeItemOrder } from '../../../../utils/types/orderSeller'

const ShopReviewComponent = ({ listReview, listOrder, onHandleListShowReview }: {
    listReview: typeProductReview[]
    listOrder: typeItemOrder[]
    onHandleListShowReview: (value: number[] | string) => void
}) => {
    const [starShop, setStarShop] = useState(0)
    const [listStar, setListStar] = useState([] as number[])
    const [ratingRatio, setRatingRatio] = useState(0)
    const [newReview, setNewReview] = useState(0)

    useEffect(() => {
        if (listReview.length > 0) {
            const listStar = listReview.flatMap((item) => item.rating)
            setListStar(listStar)
            const star = (
                5 * listStar.filter(item => item === 5).length +
                4 * listStar.filter(item => item === 4).length +
                3 * listStar.filter(item => item === 3).length +
                2 * listStar.filter(item => item === 2).length +
                1 * listStar.filter(item => item === 1).length
            ) / listReview.length
            setStarShop(Math.round(star * 100) / 100)

            setNewReview(
                listReview.filter(
                    (item) =>
                        !item.ProductReviewReply ||
                        item.ProductReviewReply.length === 0 
                ).length
            )
        }
    }, [listReview])

    useEffect(() => {
        if (listOrder.length > 0 && listReview.length > 0) {
            const countOrder = listOrder.filter(item => item.status === 'Hoàn thành').length
            setRatingRatio(countOrder / listReview.length * 100)
        }
    }, [listOrder, listOrder.length, listReview.length])

    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md font-normal'>
                <div className='pb-4'>
                    <h4 className=' text-xl py-1 '>Đánh Giá Shop
                        <span className='pl-2 text-2xl text-primary'> {starShop} </span>
                        <span className=' text-gray-600 text-lg'>/5</span>
                    </h4>
                </div>
                <div className=' w-[770px]'>
                    <div className=' py-4 px-6 grid grid-cols-3 gap-2 border rounded'>
                        <div className=' border-r'>
                            <p className=' text-sm text-gray-600'>Tổng lượt đánh giá</p>
                            <p className=' pt-2 text-xl'> {listReview.length || 0} </p>
                        </div>
                        <div className=' border-r  px-4'>
                            <p className=' text-sm text-gray-600'>Tỷ lệ đánh giá đơn hàng</p>
                            <p className=' pt-2 text-xl'>{ratingRatio.toFixed(2)}%</p>
                        </div>
                        <div className='  px-4'>
                            <p className=' text-sm text-gray-600'>Tỷ lệ đánh giá tốt</p>
                            <p className=' pt-2 text-xl'>
                                {listStar &&
                                    listStar.length > 0 &&
                                    (listStar.filter(star => star > 3).length / listStar.length * 100).toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className=' py-4 px-6 grid grid-cols-2 gap-2 border rounded my-4'>
                        <div className=' border-r'>
                            <p className=' text-sm text-gray-600'>Đánh giá tiêu cực cần phản hồi</p>
                            <p className=' pt-2 text-xl flex items-center gap-2'>
                                {listStar &&
                                    listStar.length > 0 &&
                                    listStar.filter(star => star < 3).length}
                                <span onClick={() => onHandleListShowReview([1, 2])} className=' pl-2 text-primary text-base cursor-pointer flex gap-2 items-center'>
                                    Xem <FaAngleRight />
                                </span>
                            </p>
                        </div>
                        <div className='  px-4'>
                            <p className=' text-sm text-gray-600'>Đánh giá gần đây</p>
                            <p className=' pt-2 text-xl flex items-center gap-2'>
                                {newReview
                                    &&
                                    <>
                                        {newReview}
                                        <span onClick={() => onHandleListShowReview('new')} className=' pl-2 text-primary text-base cursor-pointer flex gap-2 items-center'>
                                            Xem <FaAngleRight />
                                        </span>
                                    </>
                                }

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopReviewComponent
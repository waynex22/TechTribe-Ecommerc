import React from 'react'
import { typeProductReview } from '../../../../utils/types/productReviewSeller'
import ItemReviewComponent from './itemReview'

const ListReviewComponent = ({ listReview }: {
    listReview: typeProductReview[]
}) => {
    return (
        <>
            <div className='my-4 text-sm flex flex-col gap-4'>
                <div className=' bg-gray-100 p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
                    <p className=' text-center'>Thông tin Sản phẩm</p>
                    <p className=' col-span-2 text-center'>Đánh giá của Người mua</p>
                    <p className=' text-center'>Thao tác</p>
                </div>
                {listReview.length > 0 &&
                    listReview.map((item) => {
                        return (
                            <div key={item._id}>
                                <ItemReviewComponent itemReview={item} />
                            </div>
                        )
                    })
                }

            </div>

        </>
    )
}

export default ListReviewComponent
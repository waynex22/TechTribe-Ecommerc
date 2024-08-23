import { IoClose } from 'react-icons/io5'
import { typeProductReview } from '../../../../utils/types/productReviewSeller'
import { ShowStarReview } from './itemReview'
import { formatShowDate } from '../../../../utils/fortmartNumberVnd/formartDate'
import { useContext, useEffect, useState } from 'react'
import requestApi from '../../../../helper/api'
import { LoaderContex } from '../../loadingProvider'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../../redux/hook'
import { fetchListReview } from '../../../../redux/features/productReviewSeller'

const ReplyReviewComponent = ({ review }: { review: typeProductReview }) => {
    const dispatch = useAppDispatch()
    const { setLoader } = useContext(LoaderContex)
    const [valueReply, setValueReply] = useState('')
    const [errValue, setErrValue] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if(isEdit)
            setValueReply(review.ProductReviewReply[0].content)
    },[isEdit, review.ProductReviewReply])
    useEffect(() => {
        if(isSubmit)
            if(!valueReply.trim())
                setErrValue('Bạn vui lòng điền nội dung')
            else
                setErrValue('')
    },[isSubmit, valueReply])

    const sendReplyReview = () =>{
        setIsSubmit(true)
        if (!valueReply.trim()) {
            setErrValue('Bạn vui lòng điền nội dung')
            return
        }
        const data = {
            id_productReview: review._id,
            content: valueReply,
        }
        let endpoin = 'product-review-reply'
        let method = 'POST'
        if (isEdit) {
            endpoin = `${endpoin}/${review.ProductReviewReply[0]._id}`
            method = 'PATCH'
        }
        setLoader(true)
        requestApi(endpoin, method, data,'application/json')
            .then((data) =>{
                setLoader(false)
                if (data.data.status === 409) {
                    toast.error(data.data.message)
                }else {
                    setIsEdit(false)
                    dispatch(fetchListReview())
                    toast.success('Phản hồi thành công')
                }
            })
            .catch((err) =>{
                setLoader(false)
                console.log(err);
                toast.error('Có lỗi, vui lòng thử lại sau')
            })
    }
    console.log(isEdit);
    
    const deleteReplyReview = () =>{
        requestApi(`product-review-reply/${review.ProductReviewReply[0]._id}`, 'DELETE', {},'application/json')
        .then((data) =>{
            setLoader(false)
            if (data.data.status === 409) {
                toast.error(data.data.message)
            }else {
                dispatch(fetchListReview())
                toast.success('Xóa thành công')
            }
        })
        .catch((err) =>{
            setLoader(false)
            console.log(err);
            toast.error('Có lỗi, vui lòng thử lại sau')
        })
    }
    return (
        <div className=' bg-white p-4 px-8 rounded shadow-sm w-[700px] relative'>
            <p className=' py-2 text-lg font-semibold'>Trả lời bình luận</p>
            <div className=' py-2'>
                <div className='  rounded p-2'>
                    <div className=' flex  gap-2 '>
                        <img className=' rounded-full w-12 h-12' src={review.customerId.avata} alt="" />
                        <div className=' flex flex-col gap-1 w-full'>
                            <p className=' font-semibold'> {review.customerId.name} </p>
                            <div className=' text-sm'>
                                <ShowStarReview itemReview={review} />
                            </div>
                            <p className=' text-xs text-gray-600 flex gap-2'>
                                {formatShowDate(review.created)} |
                                <span className=' flex gap-1'>
                                    phân loại:
                                    {review.productPriceId.id_color[0]?.value}
                                    {review.productPriceId.id_color[0] && review.productPriceId.id_size[0] && ', '}
                                    {review.productPriceId.id_size[0]?.value}
                                </span>
                            </p>
                            <p className=' py-1'> {review.content || 'askdh askh'} </p>
                            <div className=' flex gap-2 flex-wrap'>
                                {review.images && review.images.length > 0 &&
                                    review.images.map((image) => {
                                        return <img src={image} className=' w-20 rounded object-cover' key={image} alt="" />
                                    })
                                }
                            </div>
                            <div className=' py-2 w-full'>
                                {review.ProductReviewReply && review.ProductReviewReply.length > 0 && !isEdit 
                                    ? <>
                                        <div className=' border rounded bg-gray-100'>
                                            <p className=' py-2 px-4 border-b '>Phản hồi của bạn:</p>
                                            <div className=' py-2 px-4'>
                                                <p>{review.ProductReviewReply[0].content}</p>
                                                <div className=' flex gap-4 py-2 flex-row-reverse'>
                                                    <p onClick={()=>setIsEdit(true)} className=' cursor-pointer hover:text-green-600'>Sửa</p>
                                                    <p onClick={deleteReplyReview} className=' cursor-pointer hover:text-red-600'>Xóa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </> :
                                    <>
                                        <div className={` border rounded ${errValue && ' border-red-500'}`}>
                                            <p className=' py-2 px-4 border-b bg-gray-100 rounded-t'>Phản hồi của bạn:</p>
                                            <textarea 
                                                onChange={(e)=> setValueReply(e.target.value)}
                                                value={valueReply}
                                                 name="" 
                                                 className=' p-4 w-full h-24 bg-white outline-none' 
                                                 placeholder='Hãy nhập phản hồi của bạn ...' id="">
                                                
                                            </textarea>
                                        </div>
                                        <p className=' text-red-500 pt-1'>{errValue} </p>

                                        <div className=' flex flex-row-reverse pt-4'>
                                            <p onClick={sendReplyReview} className=' px-4 py-2 rounded bg-primary text-white font-semibold cursor-pointer'>Gửi</p>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className=' font-semibold cursor-pointer text-xl absolute top-4 right-4'>
                <IoClose />
            </p>
        </div>
    )
}

export default ReplyReviewComponent
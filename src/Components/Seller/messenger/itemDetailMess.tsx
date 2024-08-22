import React from 'react'
import { typeRoomChat } from '../../../utils/types/roomChat';
import { TypeShop } from '../../../utils/types/shop';
import { formatPriceProduct } from '../product/listProduct/itemProductListCols';
import { formatShowDate } from '../../../utils/fortmartNumberVnd/formartDate';

function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return new Date(date).toLocaleString(undefined, options);
}

const ItemDetailMess = ({message, shop, onHandleShowImgae}: {
    message: typeRoomChat
    shop: TypeShop
    onHandleShowImgae: (item: string| undefined) => void
}) => {
    return (
        <>
            {message.messenger.map((item, index) => {
                const currentTime = new Date(item.created_at);
                const prevTime = index > 0 ? new Date(message.messenger[index - 1].created_at) : null;
                const timeDifference = prevTime ? Math.abs(currentTime.getTime() - prevTime.getTime()) / 36e5 : 0;
                return (
                    (
                        <div key={item._id} >
                            {timeDifference > 1 && (
                                <div className="timestamp text-center text-sm text-gray-500 my-6 flex gap-2 items-center">
                                    <span className=' flex-1 w-full border-2'></span>
                                    <p className=''>{formatDate(item.created_at)}</p>
                                    <span className='  flex-1 w-full border-2'></span>
                                </div>
                            )}

                            <div className={` group w-fit items-center ${shop._id === item.id_sender && 'ml-auto '}`}>
                                {item.content && (
                                    <div className={` max-w-[220px] shadow w-fit p-2 rounded ${shop._id === item.id_sender ? 'ml-auto bg-blue-200' : 'bg-white'}`}>
                                        <p className=''>{item.content}</p>
                                    </div>
                                )}
                                {item.thumbnail && (
                                    <div onClick={() => onHandleShowImgae(item.thumbnail)} className={`w-[150px] shadow ${shop._id === item.id_sender && 'ml-auto '}`}>
                                        <img src={item.thumbnail} className=' w-full rounded' alt="" />
                                    </div>
                                )}
                                {item.video && (
                                    <div onClick={() => onHandleShowImgae(item.video)} className={`w-[150px]  shadow ${shop._id === item.id_sender && 'ml-auto '}`}>
                                        <video src={item.video} controls className=' w-full rounded' />
                                    </div>
                                )}

                                {item.id_product &&
                                    <div className={`w-full p-2 bg-white rounded shadow`}>
                                        <p className=' text-center text-xs font-normal text-gray-600'>
                                            {true ? 'Bạn đang thảo luận với người mua về sản phẩm này' : 'Người bán đang trao đổi với bạn về sản phẩm này'}
                                        </p>
                                        <div className=' flex gap-2 items-center text-sm py-1 font-normal'>
                                            <img className=' w-16 h-16 object-cover rounded' src={item.id_product.thumbnails[0]} alt="" />
                                            <div>
                                                <p className=' font-semibold truncate'> {item.id_product.name} </p>
                                                <p className=' text-red-600'> {formatPriceProduct(item.id_product)} </p>
                                                <div className=' flex justify-between'>
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {item.id_order &&
                                    <div className={`w-full p-2 bg-white rounded shadow`}>
                                        <p className=' text-center text-xs font-normal text-gray-600'>
                                            {shop._id === item.id_sender ? 'Bạn đang thảo luận với người mua về đơn hàng này' : 'Người bán đang trao đổi với bạn về đơn hàng này'}
                                        </p>
                                        <div className=' flex gap-2 items-center text-sm py-1'>
                                            <img className=' w-16 h-16 object-cover rounded' src="https://cf.shopee.vn/file/7d098d5904f2b1814e9f8a42680cee84_tn" alt="" />
                                            <div>
                                                <p>ID đơn hàng: 218937218738921 a</p>
                                                <p>Tổng đơn hàng: 21382 đ</p>
                                                <p>Hoàn tất</p>
                                            </div>
                                        </div>
                                    </div>}

                                <p className={`px-2 mt-1 text-gray-600 font-light text-xs group-hover:flex hidden ${shop._id === item.id_sender && 'ml-auto flex-row-reverse'}`}>
                                    {formatShowDate(item.created_at)}
                                </p>
                            </div>
                        </div>

                    )
                )
            })}
        </>
    )
}

export default ItemDetailMess
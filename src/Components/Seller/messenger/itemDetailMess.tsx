import { typeRoomChat } from '../../../utils/types/roomChat';
import { TypeShop } from '../../../utils/types/shop';
import { formatPriceProduct } from '../product/listProduct/itemProductListCols';
import { formatShowDate } from '../../../utils/fortmartNumberVnd/formartDate';
import { formatNumberVnd } from '../../../utils/fortmartNumberVnd';
import { useState } from 'react';

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

const ItemDetailMess = ({ message, shop, onHandleShowImgae }: {
    message: typeRoomChat
    shop: TypeShop
    onHandleShowImgae: (item: string | undefined) => void
}) => {
    const [showAlertCoppy, setShowAlertCoppy] = useState('')
    const handleCopy = (textToCopy: string | undefined, idMess: string) => {
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setShowAlertCoppy(idMess)
                setTimeout(() => {
                    setShowAlertCoppy('')
                }, 1000);
            })
        }
    };
    
    return (
        <>
            {message.messenger.map((item, index) => {
                const currentTime = new Date(item.created_at);
                const prevTime = index > 0 ? new Date(message.messenger[index - 1].created_at) : null;
                const timeDifference = prevTime ? Math.abs(currentTime.getTime() - prevTime.getTime()) / 36e5 : 0;
                return (
                    (
                        <div key={item._id} className=' relative' >
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
                                                <p className=' font-semibold truncate w-[250px]'> {item.id_product.name} </p>
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
                                        <div className=' w-full flex gap-2 items-center text-sm py-1 font-normal'>
                                            <img className=' w-16 h-16 object-cover rounded' src={item.id_order.items[0].productPriceId.id_product[0].thumbnails[0]} alt="" />
                                            <div>
                                                <div className=' flex gap-1 text-xs'>
                                                    <span className=' '>Id đơn hàng:</span>
                                                    <span onClick={() => handleCopy(item.id_order?._id.toUpperCase(), item._id)} className=' uppercase font-bold cursor-pointer'>{item.id_order._id} </span>
                                                </div>
                                                <p>
                                                    <span className=' text-xs'>Tổng đơn hàng:</span>
                                                    <span className=' text-red-500'>{formatNumberVnd(item.id_order.subTotal - item.id_order.discount)}</span>
                                                </p>
                                                <p> {item.id_order.status} </p>
                                            </div>
                                        </div>
                                        {showAlertCoppy && showAlertCoppy === item._id &&
                                            <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 py-1 text-white bg-opacity-60 rounded '>
                                                Coppy thành công
                                            </div>}
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
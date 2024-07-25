import React, { useEffect, useState } from 'react'
import { formatNumberVnd } from '../../../../../../utils/fortmartNumberVnd'
import ItemSlectLimit from './ItemSlectLimit'
import ItemSwitcher from './itemSwitcher'
import { typeProductPriceResult } from '../../../../../../utils/types/product'
import { typeCreaeteDiscount } from '../../../../../../utils/types/discount'

const ItemProductPriceTable = ({productPrice, fomCreateDiscount, onHandleListCreate, isSubmitForm}: {
    productPrice: typeProductPriceResult,
    fomCreateDiscount: typeCreaeteDiscount
    onHandleListCreate:  (idPrice: string, key: string, value:string | number | boolean) => void
    isSubmitForm: boolean
}) => {
    const [newPrice, setNewPrice] = useState(productPrice.price)
    const [percent, setPercent] = useState(fomCreateDiscount.percent)
    const [err, setError] = useState('')
    useEffect(()=>{
        setNewPrice(productPrice.price - (productPrice.price * percent/100))
        if(percent < 50 && percent > 0)
            setError('')
    },[productPrice.price, percent])
    useEffect(()=>{
        setPercent(fomCreateDiscount.percent)
    },[fomCreateDiscount.percent])
    const handleNewPrice = (value: string) => {
        if(/^\d*$/.test(value)){
            let price = Number(Number(value).toFixed(0))
            if(price < productPrice.price/2) {
                setError('Sản phẩm giám tối đa 50%')
            }else if(price >= productPrice.price) {
                price = productPrice.price
                setError('Giảm ít nhất 1%')
            }else{
                setError('')
            }
            setNewPrice(price)
            const newpercent = (((productPrice.price - price)/ productPrice.price) *100)
            setPercent(newpercent)
            onHandleListCreate(productPrice._id,'percent',newpercent)
        }
    }
    const handlepercent = (value: string) => {
        if(/^\d*$/.test(value)){
            let percent = Number(value)
            if(percent>50) percent = 50
            if(percent <= 0) percent = 1
            if (percent >= 0 && percent <= 50){
                setPercent(percent)
                onHandleListCreate(productPrice._id,'percent',percent)
                setNewPrice(productPrice.price - (productPrice.price * percent/100))
            }
        }
    }
    const handleValueLimit = (key:string, value: number | string) =>{
        onHandleListCreate(productPrice._id, key, value)
    }
    return (
        <div className=' flex gap-4 items-center justify-between'>
            <div className=' w-2 flex items-center'>
            </div>
            <div className=' w-32'>
                <p className=' text-center'>
                    {productPrice.id_color[0]?.value}
                    {productPrice.id_color[0] && productPrice.id_size[0] && ', '}
                    {productPrice.id_size[0]?.value}
                </p>
            </div>
            <div className=' w-32'>
                <p className=' text-center'> {formatNumberVnd(productPrice.price)} </p>
            </div>
            <div className=' w-32'>
                <div className={` w-28 border rounded p-0.5 relative  ${!fomCreateDiscount.status && 'bg-gray-200 cursor-not-allowed'}`}>
                    <input 
                        readOnly={!fomCreateDiscount.status}
                        value={newPrice.toFixed(0)}
                        onChange={(e)=> handleNewPrice(e.target.value)}
                        type="number" 
                        className={` w-24 ${!fomCreateDiscount.status && 'bg-gray-200 cursor-not-allowed'}`} 
                    />
                    <p className=' absolute top-1/2 -translate-y-1/2 right-1'>đ</p>
                </div>
                <p className=' text-red-600 text-xs'>{fomCreateDiscount.status && err}</p>
            </div>
            <div className=' w-32'>
                <div className={`w-[120px] border rounded p-0.5  relative  ${!fomCreateDiscount.status && 'bg-gray-200 cursor-not-allowed'} ${((isSubmitForm && !percent) || percent > 50) &&'border-red-500'}`}>
                    <input 
                        readOnly={!fomCreateDiscount.status}
                        onChange={(e)=> handlepercent(e.target.value)}
                        value={percent.toFixed(0)}
                        type="string" 
                        className={` w-[70px] ${!fomCreateDiscount.status && 'bg-gray-200 cursor-not-allowed'}`} 
                    />
                    <div className={` text-gray-500 border-l pl-2 text-xs absolute right-2 top-1/2 -translate-y-1/2 ${!fomCreateDiscount.status && 'bg-gray-200 cursor-not-allowed'}`}>
                        <p>%GIẢM</p>
                    </div>
                </div>
            </div>
            <div className=' w-12'>
                <p className=' text-center'> {productPrice.stock} </p>
            </div>
            <div className=' w-36'>
                <ItemSlectLimit 
                onHandleSetValue={handleValueLimit} 
                name='limit_product' 
                valueNameSelect={fomCreateDiscount.limit_product}
                status={fomCreateDiscount.status} />
            </div>
            <div className=' w-36'>
                <ItemSlectLimit 
                onHandleSetValue={handleValueLimit} 
                name='limit_customer' 
                valueNameSelect={fomCreateDiscount.limit_customer}
                status={fomCreateDiscount.status}  />
            </div>
            <div className='w-16'>
                <ItemSwitcher 
                fomCreateDiscount={fomCreateDiscount} 
                onHandleListCreate={onHandleListCreate} />
            </div>
            <div className=' w-16'>
            </div>
        </div>
    )
}

export default ItemProductPriceTable
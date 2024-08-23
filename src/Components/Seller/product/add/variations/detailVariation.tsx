import React, { useEffect, useState } from 'react'
import { typeProduct, typeProductPrice, TypeVariation } from '../../../../../utils/types/product'
import { FormErrorsProduct } from '../../../../../utils/validatetor/createproduct'

type typeItemPrice = {key: string, value: string, _id?: string}
const DetailVariation = ({ variation, productPrice, setProductPrice, product, errForm }: {
    variation: TypeVariation
    productPrice: typeProductPrice[]
    setProductPrice: React.Dispatch<React.SetStateAction<typeProductPrice[]>>
    product?: typeProduct
    errForm: FormErrorsProduct
}) => {
    useEffect(() => {
        if (product && product.product_price) {
            const newProductPrice = product.product_price.map(item => {
                return {
                    _id: item._id,
                    price: item.price,
                    stock: item.stock,
                    name_color: item.id_color.length > 0 ? item.id_color[0].value : '',
                    name_size: item.id_size.length > 0 ? item.id_size[0].value : '',
                };
            });
            setProductPrice(newProductPrice);
        }
    }, [product, setProductPrice])
    
    const keys = Object.keys(variation);
    const [valueAllPrice, setValueAllPrice] = useState(0)
    const [valueAllStock, setValueAllStock] = useState(0)
    const [errValue, setErrValue] = useState('')
    useEffect(()=>{
        if(valueAllPrice && valueAllStock) {
            setErrValue('')
        }
    },[valueAllPrice, valueAllStock])
    const handleProductPrice = (
        value1: { key: string, value: string },
        value2: { key: string, value: string },
        name: string,
        value: number,
    ) => {
        const index = findIndexProductPrice(value1, value2)
        if (index < 0) {
            const newPrice = createProductPrice(value1, value2, name, value)
            setProductPrice((prev) => {
                return [
                    ...prev,
                    newPrice
                ]
            });
        } else {
            const updatedProductPrice = productPrice.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            );
            setProductPrice(updatedProductPrice);
        }
    }
    const findIndexProductPrice = (
        value1: { key: string, value: string },
        value2: { key: string, value: string }
    ): number => {
        if (!productPrice)
            return -1;
        const index = productPrice.findIndex((item) =>
            (item.name_size === value1.value && item.name_color === value2.value) ||
            (item.name_size === value2.value && item.name_color === value1.value))
        return index
    }

    const setAllPrice = () => {
        const updatedProductPrices: typeProductPrice[] = [];
        if (!valueAllPrice || !valueAllStock) {
            setErrValue('Không được để trống')
            return;
        }
        
        variation[keys[0]].forEach((itemKey1) => {
            const value1: typeItemPrice = { key: keys[0], value: itemKey1.name };
            if (keys[1] && variation[keys[1]].length > 0) {
                variation[keys[1]].forEach((itemKey2) => {
                    const value2 = { key: keys[1], value: itemKey2.name };
                    updateAllProductPrice(updatedProductPrices, value1, value2)
                });
            } else {
                
                const value2 = { key: 'Size', value: '' };
                
                if (keys[0] === 'Size') {
                    value2.key = 'Màu sắc';
                }
                updateAllProductPrice(updatedProductPrices, value1, value2)
            }
        });
    };

    const updateAllProductPrice = (
        arrPrices: typeProductPrice[], 
        value1:typeItemPrice, 
        value2:{key: string;value: string;}
    ) =>{
        const newProductPrice = createProductPrice(value1, value2, 'price', valueAllPrice);
        newProductPrice.stock = valueAllStock
        if(productPrice) {
            newProductPrice._id = productPrice.find((item)=>{
                if(value1.key === 'Size') {
                    return item.name_size === value1.value && item.name_color === value2.value
                }
                return item.name_color === value1.value && item.name_size === value2.value
            })?._id || ''
        }
        arrPrices.push(newProductPrice);
        setProductPrice(arrPrices);
    }
    const createProductPrice = (
        value1: typeItemPrice,
        value2: { key: string, value: string },
        name: string,
        value: number,
    ) => {
        let product: typeProductPrice = {
            [name]: value,
            name_color: value1.value,
            name_size: value2.value
        };
        if (value1.key === 'Size') {
            product.name_size = value1.value;
            product.name_color = value2.value;
        }
        return product
    }

    return (
        <>
            <div className=' ml-auto flex flex-col gap-2'>
                <div className=' flex gap-4 items-center'>
                    <input type="number" onChange={(e) => setValueAllPrice(Number(e.target.value))} className=' w-full rounded border border-gray-400 py-1' placeholder='Giá sản phẩm' />
                    <input type="number" onChange={(e) => setValueAllStock(Number(e.target.value))} className=' w-full rounded border border-gray-400 py-1' placeholder='Số lượng sản phẩm' />
                    <button onClick={() => setAllPrice()} className=' border w-44 py-2 font-semibold border-primary rounded text-primary hover:bg-primary hover:text-white'>Áp dụng</button>
                </div>
                <p className=' text-red-500 text-right'> {errValue} </p>
            </div>
            <div className=' flex gap-4'>
                <div className=' w-32 text-right pt-1'>
                    <p> Danh sách phân loại hàng</p>

                </div>

                <div className="relative overflow-x-auto flex-auto">
                { errForm.price && <p className=' text-red-600'> {errForm.price} </p> }
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {!keys[1] || variation[keys[1]].length === 0 ?
                                    <th scope="col" className="px-6 py-3 border border-gray-200">
                                        {keys[0]}
                                    </th>
                                    :
                                    Object.keys(variation).map((key, index) => (
                                        <th scope="col" key={index} className="px-6 w-1/4 py-3 border border-gray-200">
                                            {key}
                                        </th>
                                    ))
                                }
                                <th scope="col" className="px-6 py-3 border  w-1/4 border-gray-200">
                                    Giá
                                </th>
                                <th scope="col" className="px-6 py-3 border  w-1/4 border-gray-200">
                                    Kho hàng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!keys[1] || variation[keys[1]].length === 0 ?
                                variation[keys[0]].map((item, index) => {
                                    let product: typeProductPrice = {}
                                    if (productPrice){
                                        const newPrice = productPrice.find((i) => i.name_color === item.name || i.name_size === item.name)
                                        if(newPrice) 
                                            product = newPrice
                                    }
                                    return (
                                        <tr key={index} className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 border border-gray-200 font-medium   dark:text-white">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 border border-gray-200 font-medium   dark:text-white">
                                                <input
                                                    onChange={(e) =>
                                                        handleProductPrice(
                                                            { key: keys[0], value: item.name },
                                                            { key: keys[0] === 'Size' ? 'Màu sắc' : 'Size', value: '' }, 'price', Number(e.target.value))}
                                                    value={product?.price || 0}
                                                    type="number" min={0} className=' w-full rounded border border-gray-400 py-1' />
                                            </td>
                                            <td className="px-6 py-4 border border-gray-200">
                                                <input
                                                    value={product?.stock || 0}
                                                    onChange={(e) =>
                                                        handleProductPrice(
                                                            { key: keys[0], value: item.name },
                                                            { key: keys[0] === 'Size' ? 'Màu sắc' : 'Size', value: '' }, 
                                                            'stock', 
                                                            Number(e.target.value)
                                                        )}
                                                    type="number" min={0} className=' w-full rounded border border-gray-400 py-1' />
                                            </td>
                                        </tr>
                                    )
                                }) :
                                variation[keys[0]].map((itemKey1, index) => (
                                    <>
                                        <tr key={index} className="bg-white dark:bg-gray-800">
                                            <td rowSpan={variation[keys[1]].length + 1} className="px-6 py-4 border border-gray-200 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {itemKey1.name}
                                            </td>
                                        </tr>
                                        {
                                            variation[keys[1]].map((itemKey2, index) => {
                                                let product: typeProductPrice = {}
                                                if (productPrice){
                                                    const newPrice = productPrice.find((i) =>
                                                        (i.name_color === itemKey1.name && i.name_size === itemKey2.name) || (i.name_color === itemKey2.name && i.name_size === itemKey1.name))
                                                    if(newPrice) 
                                                        product = newPrice
                                                }
                                                return (
                                                    <tr key={index} className="bg-white dark:bg-gray-800">
                                                        <td className="px-6 py-4 border border-gray-200 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {itemKey2.name}
                                                        </td>
                                                        <td className="px-6 py-4 border border-gray-200">
                                                            <input
                                                                value={product?.price || 0}
                                                                onChange={(e) =>
                                                                    handleProductPrice(
                                                                        { key: keys[0], value: itemKey1.name },
                                                                        { key: keys[1], value: itemKey2.name }, 'price', Number(e.target.value))}
                                                                name='price'
                                                                type="number" min={0} className=' w-full rounded border border-gray-400 py-1' />
                                                        </td>
                                                        <td className="px-6 py-4 border border-gray-200">
                                                            <input onChange={(e) =>
                                                                handleProductPrice(
                                                                    { key: keys[0], value: itemKey1.name },
                                                                    { key: keys[1], value: itemKey2.name }, 'stock', Number(e.target.value))}
                                                                    value={product?.stock || 0}
                                                                name='stock' type="number" defaultValue={0} min={0} className=' w-full rounded border border-gray-400 py-1' />
                                                        </td>
                                                    </tr>)
                                            })
                                        }
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default DetailVariation
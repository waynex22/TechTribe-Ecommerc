import React, { useEffect, useState } from 'react'
import { typeCreateVoucher } from '../../../../../utils/types/voucher'
import ChooseProductComponent from '../../discount/create/popupChooseProduct'
import { typeProduct } from '../../../../../utils/types/product'
import { IoAdd } from 'react-icons/io5'
import Popup from '../../../../../Page/popup/popup'
import { MdDelete } from 'react-icons/md'
import { formatPriceProduct, formatStockProduct } from '../../../product/listProduct/itemProductListCols'
import { FormErrorsVoucher } from '../../../../../utils/validatetor/createVoucher'
import { FormErrors } from '../../../../../utils/validatetor/index';

const ApplicableVoucherProduct = ({ caseNumber, formCreateVoucher, onHandleFormCrate, listProduct, isExpired , errForm}: {
    caseNumber: string,
    formCreateVoucher: typeCreateVoucher
    onHandleFormCrate: (key: string, value: string | number | Date | string[]) => void
    listProduct?: typeProduct[]
    isExpired?: 'active' | 'finished'
    errForm: FormErrorsVoucher
}) => {
    const [popup, setPopup] = useState(false)
    const [listChoose, setListChoose] = useState([] as typeProduct[])
    const handlePopup = () => {
        setPopup(!popup)
    }
    useEffect(() => {
        if (listProduct)
            setListChoose(listProduct)
    }, [listProduct])
    useEffect(() => {
        const idProduct = listChoose.flatMap((item) => item._id)
        onHandleFormCrate('id_product', idProduct)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listChoose])
    const handleListChoose = (newListChoose: typeProduct[]) => {
        setListChoose((prev) => {
            return [...prev, ...newListChoose]
        })
    }
    const deleteProductChoose = (product: typeProduct) => {
        const newItem = listChoose.filter(item => item !== product)
        setListChoose(newItem)
    }
    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md font-normal'>
                <h4 className=' text-xl py-1'>Các sản phẩm áp dụng</h4>
                <div className=' py-4 flex flex-col gap-6 text-sm'>
                    <div className=' flex gap-4 '>
                        <div className=' w-[200px] text-right '>
                            <p>Sản phẩm được áp dụng:</p>
                        </div>
                        <div className=' w-[600px]'>
                            {caseNumber === '1' &&
                                <p className=' font-semibold'>Tất cả sản phẩm</p>
                            }
                            {caseNumber === '2' &&
                                <>
                                    <div className=' flex justify-between'>
                                        {listChoose.length > 0 && <> <p> {listChoose.length}  sản phẩm được chọn</p> </>}

                                        {
                                            isExpired !== 'finished' &&
                                            <div onClick={() => handlePopup()} className=' cursor-pointer flex gap-2 items-center px-4 py-2 rounded border hover:shadow-md border-primary text-primary font-semibold hover:text-white hover:bg-primary'>
                                                <IoAdd />  Thêm sản phẩm
                                            </div>
                                        }
                                    </div>
                                    {listChoose.length > 0 &&
                                        <div className=' flex flex-col gap-2 w-full py-6'>
                                            <div className=' flex gap-2 items-center p-4 bg-gray-100 rounded'>
                                                <p className=' w-[250px]'>Sản phẩm</p>
                                                <p className=' w-[200px] text-center'>Original Price</p>
                                                <p className=' w-[100px] text-center'>Kho</p>
                                                {isExpired !== 'finished' && <p className=' w-[20px]'></p>}
                                            </div>
                                            {listChoose.map((item) => {
                                                return <div key={item._id}>
                                                    <div className=' flex gap-4 items-center p-4 border rounded'>
                                                        <div className=' w-[250px] flex gap-2 items-center'>
                                                            <img src={item.thumbnails[0]} className='w-10' alt="" />
                                                            <p className=' font-semibold truncate'> {item.name} </p>
                                                        </div>
                                                        <p className=' w-[200px] text-center'> {formatPriceProduct(item)} </p>
                                                        <p className=' w-[100px] text-center'> {formatStockProduct(item)} </p>
                                                        {isExpired !== 'finished' &&
                                                            <p onClick={() => deleteProductChoose(item)} className=' w-[20px] hover:text-red-600 cursor-pointer text-xl'> <MdDelete /> </p>
                                                        }
                                                    </div>
                                                </div>
                                            })}
                                        </div>}
                                </>
                            }
                            <p className=' text-red-600 pt-1 text-xs'> {errForm.id_product} </p>
                        </div>
                    </div>
                </div>
            </div>
            {popup && <Popup onHandlePopup={handlePopup} >
                <ChooseProductComponent onHandlePopup={handlePopup} listChoose={listChoose} onHandleListChoose={handleListChoose} />
            </Popup>}
        </>
    )
}

export default ApplicableVoucherProduct
import React, { useEffect, useState } from 'react'
import { IoAddSharp, IoCloseSharp } from 'react-icons/io5'
import ChooseProductComponent from './popupChooseProduct'
import Popup from '../../../../../Page/popup/popup'
import { typeProduct } from '../../../../../utils/types/product'
import ItemProductTable from './itemTable/itemProductTable'
import { typeCreaeteDiscount } from '../../../../../utils/types/discount'
import ItemSearchProduct from './itemSearchProduct'
import { GoSearch } from "react-icons/go";
import EmptyBox from './emptyBox'
import SetAllValueProductDiscount from './setAllValueProductDiscount'
import { FormErrorsDiscount } from '../../../../../utils/validatetor/validateCreateDiscount'
import { TypeSelectTimeDiscount } from './createProgram'

type typeSetValueAll = {
  percent?: number,
  limit_product: number | 'Không giới hạn',
  limit_customer: number | 'Không giới hạn'
}


const SlectProductDiscount = ({ selectNameTime, errorForm, isSubmitForm, formCreateDiscount, setFormCreateDiscount, listIdDelete, isDeleteProduct, setIsDeleteProduct }: {
  selectNameTime: TypeSelectTimeDiscount
  errorForm: FormErrorsDiscount
  isSubmitForm: boolean
  formCreateDiscount: typeCreaeteDiscount[]
  setFormCreateDiscount: React.Dispatch<React.SetStateAction<typeCreaeteDiscount[]>>
  listIdDelete: string[]
  isDeleteProduct: boolean
  setIsDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [popup, setPopup] = useState(false)
  const handlePopup = () => {
    setPopup(!popup)
  }

  const [listChoose, setListChoose] = useState([] as typeProduct[])
  const [listIdProduct, setListIdProduct] = useState([] as string[])

  // search product
  const [listShow, setListShow] = useState([] as typeProduct[])
  const [nameSearch, setNameSearch] = useState('Tên sản phẩm')
  const [valueSearch, setValueSearch] = useState('')
  useEffect(() => {
    setListShow(listChoose)
  }, [listChoose])

  const handleNameSearch = (value: string) => {
    setNameSearch(value)
  }
  const handleFindListShow = () => {
    setListShow(() => {
      if (nameSearch === 'Tên sản phẩm') {
        return listChoose.filter(item => item.name.includes(valueSearch))
      } else {
        return listChoose.filter(item => item.code === valueSearch)
      }
    })
  }
  const removeFindName = () => {
    setListShow(listChoose)
    setValueSearch('')
  }
  useEffect(()=>{
    if(isDeleteProduct){
      listIdDelete.map(id => deleteProduct(id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isDeleteProduct, listIdDelete])

  const deleteProduct = (id: string) => {
    const listIdPrice = listChoose
      .flatMap(item => item.product_price)
      .filter(item => item.id_product[0] === id)
      .flatMap(item => item._id)
    const newListCreate = formCreateDiscount.filter((item) => {
      const check = listIdPrice.find(id => id === item.id_productPrice)
      return !check && item
    })
    setFormCreateDiscount(newListCreate)
    setListChoose((prev) => {
      return prev.filter((item) => item._id !== id)
    })
    setListIdProduct((prev) => {
      return prev.filter((item) => item !== id)
    })
  }

  const handleListChoose = (newListChoose: typeProduct[]) => {
    const DateNow = new Date()
    const listProductPrice = newListChoose.flatMap(res => res.product_price);
    const newListDiscount = listProductPrice.map(item => {
      const discount: typeCreaeteDiscount = {
        type: '',
        name: '',
        id_productPrice: item._id,
        percent: 0,
        limit_product: "Không giới hạn",
        limit_customer: "Không giới hạn",
        time_start: selectNameTime.time_start ? selectNameTime.time_start : new Date(DateNow.getTime() + 10 * 60 * 1000 ),
        time_end: selectNameTime.time_end ? selectNameTime.time_end : new Date(DateNow.getTime() + 60 * 60 * 1000 + 10 * 60 * 1000),
        status: true,
      }
      return discount
    })
    setListChoose(prev => {
      return [...prev, ...newListChoose]
    })
    setFormCreateDiscount((prev) => {
      return [
        ...prev,
        ...newListDiscount
      ]
    })
  }

  const handleListIdProduct = (status: boolean, id_product: string) => {
    setListIdProduct((prev) => {
      if (status) {
        return [...prev, id_product];
      } else {
        return prev.filter((item) => item !== id_product)
      }
    });
  }
  const chooseFullListIdProduct = (status: boolean) => {
    setListIdProduct((prev) => {
      if (status) {
        const newArr: string[] = listShow.reduce<string[]>((a, b) => { return a.concat(b._id) }, [])
        return newArr
      } else {
        return prev.filter(item => {
          return !listShow.some(itemShow => itemShow._id === item)
        })
      }
    })
  }
  const updateManyItemCreate = (valueAll: typeSetValueAll) => {
    if (valueAll.percent) {
      setFormCreateDiscount((prev) => {
        return prev.map(item => {
          const listProductPriceID = listChoose
            .flatMap(res => res.product_price) // lấy ra tất cả các product_price trong list choose thành 1 mảng
            .filter(item => listIdProduct.includes(item.id_product[0])) // tìm tất cả những product_price có id_product trùng với id trong listIdProduct
            .flatMap(item => item._id); // lấy ra tất cả _id trong product_price 

          // Kiểm tra xem trong list có id_productPrice nào trung với id trong listPorudctPriceId hay không
          if (listProductPriceID.includes(item.id_productPrice) && item.status) {
            return {
              ...item,
              percent: valueAll.percent ? valueAll.percent : 0,
              limit_customer: valueAll.limit_customer ? valueAll.limit_customer : "Không giới hạn",
              limit_product: valueAll.limit_product ? valueAll.limit_product : "Không giới hạn",
            }
          }
          return item
        })
      })
    }
  }
  const handleListCreate = (idPrice: string, key: string, value: string | number | boolean) => {

    setFormCreateDiscount((prev) => {
      return prev.map(item => {
        if (item.id_productPrice === idPrice) {
          return { ...item, [key]: value }; // cập nhật đối tượng nếu id_productPrice trùng khớp
        } else {
          return item; // giữ nguyên đối tượng nếu id_productPrice không trùng khớp
        }
      });
    });
  }

  return (
    <>
      <div className=' my-4 font-normal py-4 px-6 bg-white rounded shadow-md'>
        <div className={`${listChoose.length > 0 && 'flex items-center justify-between'}`}>
          <div>
            <h4 className=" text-xl py-1">Sản phẩm khuyến mãi</h4>
            <p className=" text-gray-600 text-sm">Thêm sản phẩm vào chương trình khuyến mãi và thiết lập giá khuyến mãi.</p>
          </div>
          <div className=" py-4">
            <div onClick={() => handlePopup()} className=" w-[200px] border rounded py-2 border-primary text-primary cursor-pointer hover:bg-primary hover:bg-opacity-10 justify-center flex items-center gap-2">
              <IoAddSharp />
              Thêm sản phẩm
            </div>
          </div>
        </div>
        {listChoose.length > 0 &&
          <>
            <div className=' flex flex-col gap-4 py-6'>
              <div className=' flex '>
                <div className=' flex items-center gap-4 relative'>
                  <ItemSearchProduct onHandleNameSearch={handleNameSearch} onSetValueSearch={setValueSearch} valueSearch={valueSearch} />
                  <p onClick={() => handleFindListShow()} className=' text-xl cursor-pointer'><GoSearch /></p>
                  {valueSearch && <p onClick={() => removeFindName()} className=' absolute p-2 right-10 cursor-pointer text-xl'> <IoCloseSharp /></p>}
                </div>
              </div>

              <div className=' flex flex-col gap-4'>
                <p className=' text-gray-500'>
                  tổng cộng <span className=' text-black'>{listShow.length}</span> sản phẩm
                </p>

                <SetAllValueProductDiscount
                  listIdProduct={listIdProduct}
                  onUpdateManyItemCreate={updateManyItemCreate}
                />
                <p className=" text-sm text-red-600">{errorForm.percent}</p>

                <div className=' bg-gray-100 rounded border p-2 px-4 text-sm text-gray-500'>
                  <div className=' flex gap-4 items-center justify-between'>
                    <div className=' w-2 flex items-center'>
                      <input type="checkbox" onChange={(e) => chooseFullListIdProduct(e.target.checked)} />
                    </div>
                    <div className=' w-32'>
                      <p className=' text-center'>Tên sản phẩm</p>
                    </div>
                    <div className=' w-32'>
                      <p className=' text-center'>Giá gốc</p>
                    </div>
                    <div className=' w-32'>
                      <p className=' text-center'>Giá sau giảm</p>
                    </div>
                    <div className=' w-32'>
                      <p className=' text-center'>Giảm giá</p>
                    </div>
                    <div className=' w-12'>
                      <p className=' text-center'>Kho hàng</p>
                    </div>
                    <div className=' w-36'>
                      <p className=' text-center'>Số lượng sản phẩm khuyến mãi</p>
                    </div>
                    <div className=' w-36'>
                      <p className=' text-center'>Giới hạn đặt hàng mỗi khách</p>
                    </div>
                    <div className='w-16'>
                      <p className=' text-center'>Bật / Tắt</p>
                    </div>
                    <div className=' w-16'>
                      <p className=' text-center'>Thao tác</p>
                    </div>
                  </div>
                </div>

                {listShow.length > 0 ? listShow.map((item) => (
                  <ItemProductTable
                    isSubmitForm={isSubmitForm}
                    key={item._id}
                    listCreate={formCreateDiscount}
                    product={item}
                    handleDeleteProduct={deleteProduct}
                    onHandleListIdProduct={handleListIdProduct}
                    onHandleListCreate={handleListCreate}
                    listIdProduct={listIdProduct}
                  />
                )) :
                  <EmptyBox />}

              </div>
            </div>

          </>
        }

        {popup && <Popup onHandlePopup={handlePopup}>
          <ChooseProductComponent
          selectNameTime={selectNameTime}
            onHandlePopup={handlePopup}
            listChoose={listChoose}
            onHandleListChoose={handleListChoose}
          />
        </Popup>}
      </div>

    </>
  )
}


export default SlectProductDiscount
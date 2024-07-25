import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { fetchProductByIdShop, SelectProductByIdShop } from "../../../../../redux/features/product"
import { useEffect, useState } from "react"
import { SelectShop } from "../../../../../redux/features/shop"
import { typeProduct } from '../../../../../utils/types/product';
import { formatPriceProduct, formatStockProduct } from "../../../product/listProduct/itemProductListCols"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import EmptyBox from "./emptyBox";
import ItemSearchProduct from "./itemSearchProduct";
import { TypeSelectTimeDiscount } from "./createProgram";


const ChooseProductComponent = ({onHandlePopup, listChoose, onHandleListChoose, selectNameTime}:{
    onHandlePopup: () => void
    listChoose: typeProduct[]
    onHandleListChoose: (newListChoose: typeProduct[]) => void
    selectNameTime?: TypeSelectTimeDiscount
}) => {
    const dispath = useAppDispatch()
    const shop = useAppSelector(SelectShop)
    const listProduct = useAppSelector(SelectProductByIdShop)
    const [listShow, setListShow] = useState([] as typeProduct[])
    const [newListChoose, setNewListChoose] = useState([] as typeProduct[])
    const [showSelect, setShowSelelect] = useState('')
    const [nameSearch, setNameSearch] = useState('Tên sản phẩm')
    const [valueSearch, setValueSearch] = useState('')
    
    useEffect(() => {
        dispath(fetchProductByIdShop(shop._id))
    }, [dispath, shop._id])
    useEffect(() => {
        resetListShow()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listProduct])

    const handleShowSelect = (value: string) => {
        setShowSelelect(showSelect === value ? '' : value)
    }
    const handleNameSearch = (value: string) => {
        setNameSearch(value)
        setShowSelelect('')
    }
    const resetListShow = () => {
        setListShow(getListProductActive())
    }
    const handleFindListShow = () => {
        setListShow(() => {
            if(nameSearch === 'Tên sản phẩm'){
                return getListProductActive().filter(item => item.name.includes(valueSearch))
            }else {
                return getListProductActive().filter(item => item.code === valueSearch)
            }
        })
    }
    const handleListChoose = (status: boolean, product: typeProduct) => {
        setNewListChoose((prev) => {
            if (status) {
                return [...prev, product];
            } else {
                return prev.filter(item => item._id !== product._id);
            }
        });
    }
    const chooseFullList = (status: boolean) => {
        setNewListChoose((prev) => {
            if (status) {
                return listShow.filter(item=>{
                    const check = listChoose.find(id => id._id === item._id)
                    return !check && item
                })
            } else {
                return prev.filter(item=>{
                    return !listShow.some(itemShow => itemShow._id === item._id)
                })
            }
        })
    }
    const getListProductActive = () => {
        return listProduct.filter(item => !item.banned && !item.unlisted)
    }
    const confirm = ()=>{
        onHandlePopup()
        onHandleListChoose(newListChoose)
    }
    
    return (
        <div className=" bg-white w-[1000px] rounded shadow-md py-6 px-10">
            <div className=" flex items-center justify-between">
                <h3 className=" text-2xl py-2">Chọn sản phẩm</h3>
                <p  onClick={()=> onHandlePopup()} className=" text-2xl cursor-pointer"><IoMdClose /></p>
            </div>
            <div className=" border-t p-4 flex flex-col gap-4">
                <div className=" flex justify-between items-center">
                    <div className=" flex gap-2 items-center">
                        <p>Ngành hàng</p>
                        <div className=" w-[250px] relative ">
                            <div onClick={() => handleShowSelect('category')} className=" hover:border-gray-400  border  px-2 py-1 rounded cursor-pointer">
                                <p className=" w-[200px] truncate">Tất cả ngành hàng</p>
                                <p className=" absolute top-1/2 right-2 -translate-y-1/2"> <IoIosArrowDown /></p>
                            </div>
                            {/* {showSelect === 'category' &&
                                <div className=" absolute top-full pt-1 z-10 w-screen">
                                    <div className=" flex  rounded ">
                                        <div>
                                            <div className=" border py-2 shadow-md flex flex-col gap-2 bg-white">
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100">Tất cả ngành hàng</p>
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2">Ngành hàng <MdChevronRight /></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className=" border py-2  shadow-md flex flex-col gap-2 bg-white">
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100">Tất cả ngành hàng</p>
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100">Tất cả ngành hàng</p>
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100">Tất cả ngành hàng</p>
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2">Ngành hàng <MdChevronRight /></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className=" border py-2  shadow-md flex flex-col gap-2 bg-white">
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100">Tất cả ngành hàng</p>
                                                <p className=" px-4 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2">Ngành hàng <MdChevronRight /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } */}
                        </div>
                    </div>
                    <div className=" flex items-center gap-2">
                        <p>Tìm</p>
                        <div>
                                <ItemSearchProduct valueSearch={valueSearch} onHandleNameSearch={handleNameSearch} onSetValueSearch={setValueSearch} />
                        </div>
                    </div>
                </div>
                <div className=" flex gap-4">
                    <button onClick={() => handleFindListShow()} className=" px-6 py-2 rounded bg-primary text-white hover:shadow hover:shadow-primary hover:bg-opacity-90">Tìm</button>
                    <button onClick={() => resetListShow()} className=" px-4 py-2 rounded border hover:bg-gray-100 hover:shadow-md">Nhập lại</button>
                </div>

                {listShow && listShow.length>0 ?<div>
                    <div className="relative overflow-x-auto max-h-[400px] overflow-y-scroll border rounded shadow">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead style={{ zIndex: 1 }} className="text-xs sticky top-0  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky-header">
                                <tr>
                                    <th scope="col" className=" px-6 py-3 flex items-center gap-2">
                                        <input type="checkbox"
                                            onChange={(e) => chooseFullList(e.target.checked)} />
                                        <p>Sản phẩm</p>
                                    </th>
                                    <th scope="col" className="  px-6 py-3">
                                        Danh số
                                    </th>
                                    <th scope="col" className="  px-6 py-3">
                                        Giá
                                    </th>
                                    <th scope="col" className="  px-6 py-3">
                                        Kho hàng
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" ">
                                {listShow.length > 0 &&
                                    listShow.map((item) => {
                                        const check = listChoose.find(id => id._id === item._id)
                                        return <tr key={item._id} className={`${check ? 'border bg-gray-100 cursor-not-allowed': 'bg-white'} border-b dark:bg-gray-800 dark:border-gray-700`}>
                                            <th scope="row" className={` px-6 py-4 font-medium text-gray-900 whitespace-nowrap `}>
                                                <div className=" flex gap-2 items-center">
                                                    <div>
                                                        {!check ?
                                                            <input type="checkbox"
                                                            className=""
                                                            checked={newListChoose.some(chosenItem => chosenItem._id === item._id)}
                                                            onChange={(e) => handleListChoose(e.target.checked, item)} />
                                                        :
                                                        <input type="checkbox" className=" cursor-not-allowed" readOnly name="" checked id="" />
                                                        }
                                                        
                                                    </div>
                                                    <img className=" w-12 border" src={item.thumbnails[0]} alt="" />
                                                    <div className="flex-1 w-full">
                                                        <p className=" text-base truncate py-1">{item.name}</p>
                                                        <p className=" text-gray-500">Mã: {item.code || ''} </p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                0
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatPriceProduct(item)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatStockProduct(item)}
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </div>:
                <EmptyBox />}

                <div className=" flex flex-row-reverse gap-4 items-center">
                    <p 
                        onClick={()=> newListChoose.length && confirm()}  
                        className={` px-4 py-2 rounded bg-primary text-white 
                        ${newListChoose.length > 0 ? 'cursor-pointer' : ' cursor-not-allowed bg-opacity-60'}`}>
                            Xác nhận
                    </p>
                    <p 
                        onClick={()=> onHandlePopup()}  
                        className=" px-4 py-2 rounded border cursor-pointer hover:bg-gray-100">
                        Hủy
                    </p>
                    {listChoose.length + newListChoose.length >0 && 
                    <p className="text-xs text-gray-500">Đã chọn 
                        <span className=" text-gray-800"> {listChoose.length + newListChoose.length}/{getListProductActive().length} </span>
                        sản phẩm
                    </p>}
                </div>
            </div>
        </div>
    )
}

export default ChooseProductComponent
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const ItemSearchProduct = ({onHandleNameSearch,onSetValueSearch, valueSearch}: {
    onHandleNameSearch:(value: string) =>void 
    onSetValueSearch: React.Dispatch<React.SetStateAction<string>>
    valueSearch: string
}) => {
    const [nameSearch, setNameSearch] = useState('Tên sản phẩm')
    const [showSelect, setShowSelelect] = useState(false)

    const handleNameSearch = (value: string) => {
        setNameSearch(value)
        onHandleNameSearch(value)
        setShowSelelect(!showSelect)
    }
    const handleValueSearch = (value:string) => {
        onSetValueSearch(value)
    }
    return (
        <>
            <div className=" flex items-center border rounded cursor-pointer ">
                <div className="w-[160px] relative">
                    <div onClick={() => setShowSelelect(!showSelect)} className="  px-4 py-1 border-r">
                        <p>{nameSearch}</p>
                        <p className=" absolute top-1/2 right-2 -translate-y-1/2">
                            {!showSelect ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </p>
                    </div>
                    {showSelect &&
                        <div className=" absolute top-full pt-1 z-10">
                            <div className=" border py-2 shadow-md rounded flex flex-col gap-2 bg-white">
                                <p
                                    onClick={() => handleNameSearch('Tên sản phẩm')}
                                    className={` px-4 py-1 cursor-pointer hover:bg-gray-100 ${nameSearch === 'Tên sản phẩm' && 'text-primary'}`}>
                                    Tên sản phẩm
                                </p>
                                <p
                                    onClick={() => handleNameSearch('Mã sản phẩm')}
                                    className={` px-4 py-1 cursor-pointer hover:bg-gray-100 ${nameSearch === 'Mã sản phẩm' && 'text-primary'}`}>
                                    Mã sản phẩm
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <input type="text" value={valueSearch} onChange={(e) => handleValueSearch(e.target.value)} placeholder="Nhập vào" />
            </div>

        </>

    )
}

export default ItemSearchProduct
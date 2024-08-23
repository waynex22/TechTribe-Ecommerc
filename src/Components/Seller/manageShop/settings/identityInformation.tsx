import { useState } from 'react'
import { TypeIdentification } from '../../../../utils/types/shop'
import { RiEyeCloseLine } from 'react-icons/ri'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';

const IdentityInformation = ({ identification }: { identification: TypeIdentification }) => {
    const [showCCCDNumber, setShowCCCDNumber] = useState(false)
    const [showFullName, setShowFullName] = useState(false)
    const [showThumbnail, setShowThumbnail] = useState(false)
    return (
        <div className=' py-4 font-normal'>
            <div className=' px-6 py-4 bg-white rounded-md shadow'>
                <div className=' flex justify-between items-center'>
                    <p>Thông tin Định Danh</p>
                    <Link to={'/seller/settings/profile/identity-information/form'}  className=' px-4 py-2 rounded border hover:shadow hover:bg-gray-100'> Chỉnh sửa </Link>
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4 items-center'>
                        <div className=' w-60 text-right'>
                            <p>Hình thức định danh:</p>
                        </div>
                        <div className=' flex-1'>
                            <p> {identification.type_card} </p>
                        </div>
                    </div>
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4 items-center'>
                        <div className=' w-60 text-right'>
                            <p>Số {identification.type_card}:</p>

                        </div>
                        <div className=' flex-1'>
                            {!showCCCDNumber ?
                                    <div className=' flex items-center gap-2'>
                                        <p>**********</p>
                                        <p onClick={() => setShowCCCDNumber(true)} className=' cursor-pointer'><RiEyeCloseLine /></p>
                                    </div> :
                                    <div className=' flex items-center gap-2'>
                                        <p> {identification.CCCD_number} </p>
                                        <p onClick={() => setShowCCCDNumber(false)} className=' cursor-pointer'><MdOutlineRemoveRedEye /></p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4 items-center'>
                        <div className=' w-60 text-right'>
                            <p>Họ & tên:</p>
                        </div>
                        <div className=' flex-1'>
                            {!showFullName ?
                                    <div className=' flex items-center gap-2'>
                                        <p>***************</p>
                                        <p onClick={() => setShowFullName(true)} className=' cursor-pointer'><RiEyeCloseLine /></p>
                                    </div> :
                                    <div className=' flex items-center gap-2'>
                                        <p> {identification.full_name} </p>
                                        <p onClick={() => setShowFullName(false)} className=' cursor-pointer'><MdOutlineRemoveRedEye /></p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4'>
                        <div className=' w-60 text-right'>
                            <p>Hình chụp của thẻ {identification.type_card}:</p>
                        </div>
                        <div className=' flex-1'>
                            {!showThumbnail ?
                                    <div className=' flex items-center gap-2'>
                                        <img src="https://img.icons8.com/?size=100&id=67369&format=png&color=000000" alt="" />
                                        <p onClick={() => setShowThumbnail(true)} className=' cursor-pointer'><RiEyeCloseLine /></p>
                                    </div> :
                                    <div className=' flex items-center gap-2'>
                                        <img className=' w-24' src={identification.CCCD_photo} alt="" />
                                        <p onClick={() => setShowThumbnail(false)} className=' cursor-pointer'><MdOutlineRemoveRedEye /></p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdentityInformation
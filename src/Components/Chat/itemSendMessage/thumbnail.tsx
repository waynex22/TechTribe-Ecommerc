import React, { useRef } from 'react'
import { FaFileImage } from 'react-icons/fa'

const ItemSendMessageThumbnail = ({ onHandleFileChange }: {
    onHandleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
 }) => {

    const inputRefImgae = useRef<HTMLInputElement>(null);
    const handleClickImage = () => {
        if (inputRefImgae.current) {
            inputRefImgae.current.click();
        }
    };
    return (
        <div onClick={() => { handleClickImage() }} className='group relative'>
            <p className='w-5 cursor-pointer'><FaFileImage /></p>
            <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'>Ảnh</p>
            <input
                className="hidden"
                id="uploadFile1"
                type="file"
                multiple
                accept="image/*"
                onChange={onHandleFileChange}
                ref={inputRefImgae}
            />
        </div>
    )
}

export default ItemSendMessageThumbnail
import React, { useRef } from 'react'
import { FaVideo } from 'react-icons/fa'

const ItemSendMessageVideo = ({ onHandleFileChange }: {
    onHandleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    const inputVideo = useRef<HTMLInputElement>(null);
    
    const handleClickVideo = () => {
        if (inputVideo.current) {
            inputVideo.current.click();
        }
    }
    return (
        <div onClick={() => { handleClickVideo() }} className='group relative'>
            <p className='w-5 cursor-pointer'><FaVideo /></p>
            <p className='hidden group-hover:block text-xs absolute bottom-full w-20 text-center bg-black rounded text-white left-1/2 -translate-x-1/2 py-1'>Video</p>
            <input
                className="hidden"
                id="uploadVideo"
                type="file"
                multiple
                accept="video/*"
                onChange={onHandleFileChange}
                ref={inputVideo}
            />
        </div>
    )
}

export default ItemSendMessageVideo
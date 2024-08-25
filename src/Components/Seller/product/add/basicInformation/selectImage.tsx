/* eslint-disable jsx-a11y/alt-text */
import React, { useRef} from 'react'
import { FcAddImage } from 'react-icons/fc'
import {  IoMdRemoveCircle } from 'react-icons/io'
import { FormErrorsProduct } from '../../../../../utils/validatetor/createproduct'

const SelectImage = ({ onHandleFile, onHandlePrevImages, prevImages, listFile,errForm }: {
  onHandleFile: (files: File[]) => void
  onHandlePrevImages: (value: { preview: string }[]) => void
  prevImages: { preview: string }[]
  listFile: File[]
  errForm: FormErrorsProduct
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const deleteFile = (index: number) => {
    const newArrShow = prevImages.filter((item, i) => i !== index)
    const newArrFile = listFile.filter((item, i) => i !== index)
    
    onHandlePrevImages(newArrShow)
    onHandleFile(newArrFile)
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      if (listFile.length > 8) {
        return;
      }
      const imageFilesArray: { preview: string }[] = imageFiles.map(file => ({
        preview: URL.createObjectURL(file) // Tạo URL để xem trước ảnh
      }))
      onHandlePrevImages([...prevImages, ...imageFilesArray])
      onHandleFile([...listFile, imageFiles[0]])
    }
  };
  return (
    <>
      <div className=' flex gap-4'>
        <div className=' w-60 text-right'>
          <p> <span className=' text-red-600'>*</span> Hình ảnh sản phẩm</p>
          { errForm.thumbnails && <p className=' text-red-600'> {errForm.thumbnails} </p> }
        </div>

        <div>
        <div className=' flex gap-2 flex-wrap'>
          {prevImages.map((image, index) => (
            <div key={index} className=" relative">
              <img className=" border rounded object-cover w-20 h-20" src={image.preview} />
              <div onClick={() => deleteFile(index)} className=" absolute -top-2 -right-2 text-xl cursor-pointer">
                <IoMdRemoveCircle />
              </div>
            </div>
          ))}
          {prevImages.length < 9 &&
            <>
              <div onClick={() => { handleClick() }} className=' cursor-pointer p-2 border  text-xs border-dashed rounded w-24 text-center'>
                <p className=' text-4xl flex items-center justify-center'><FcAddImage /></p>
                <p>Thêm hình ảnh ({prevImages.length || 0}/9)</p>
              </div>
              <input
                className="hidden"
                id="uploadFile1"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </>
          }
        </div>
        </div>

      </div>
    </>
  )
}

export default SelectImage
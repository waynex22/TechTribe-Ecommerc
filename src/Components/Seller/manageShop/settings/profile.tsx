import React, { useEffect, useRef, useState } from 'react'
import { TypeShop } from '../../../../utils/types/shop'
import { toast } from 'react-toastify'
import requestApi from '../../../../helper/api'
import { useAppDispatch } from '../../../../redux/hook'
import { fetchShop } from '../../../../redux/features/shop'

type typeFormProfile = { name: string, description: string | undefined, thumbnail: string }
const ProfileShop = ({ profileShop }: { profileShop: TypeShop }) => {
    const disPatch = useAppDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [formEditProfile, setFormEditProfile] = useState({} as typeFormProfile)

    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState('')
    const [file, setFile] = useState<File[]>([]);
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFormProfile = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormEditProfile({ ...formEditProfile, [name]: value });
    }
    useEffect(() => {
        const form: typeFormProfile = {
            name: profileShop.name,
            description: profileShop.description,
            thumbnail: profileShop.thumbnail,
        }
        setFormEditProfile(form)
    }, [profileShop.description, profileShop.name])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            if (imageFiles.length > 0) {
                const previewUrl = URL.createObjectURL(imageFiles[0]);
                setPreview(previewUrl);
                setFile(imageFiles);
            } else {
                // Handle case where no image files were selected
                toast.error('Please select an image file.')
            }
        }
    };
    const submitForm = () => {
        console.log(formEditProfile);
        console.log(file);

        if (file.length > 0) {
            const formData = new FormData();
            file.forEach((file: File) => {
                formData.append('files', file);
            });
            requestApi('upload/files', 'POST', formData, 'multipart/form-data')
                .then(response => {
                    const newForm = { ...formEditProfile, thumbnail: response.data.filenames[0] }
                    updateProfile(newForm)
                    deleteFile()
                })
                .catch(error => {
                    console.error('Error uploading files:', error);
                });
        }else {
            updateProfile(formEditProfile)
        }
    };
    const updateProfile = (form: typeFormProfile) => {
        console.log(form);
        requestApi('shop', 'PATCH', form, 'application/json')
            .then(response => {
                toast.success('Cập nhật thành công')
                disPatch(fetchShop())
                setIsEdit(false)
            })
            .catch(error => {
                console.error('Error uploading files:', error);
            });
    }
    const deleteFile = () => {
        const filesToDelete = []
        filesToDelete.push(profileShop.thumbnail)
        requestApi('upload/files', 'DELETE', { filesToDelete }, 'application/json')
    }

    return (
        <div className=' py-4 font-normal'>
            <div className=' px-6 py-4 bg-white rounded-md shadow'>
                <div className=' flex justify-between items-center'>
                    <p>Thông tin cơ bản</p>
                    {!isEdit && <button onClick={() => setIsEdit(true)} className=' px-4 py-2 rounded border hover:shadow hover:bg-gray-100'> Chỉnh sửa </button>}
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4 items-center'>
                        <div className=' w-60 text-right'>
                            <p>Tên Shop:</p>
                        </div>
                        <div className=' flex-1'>
                            {!isEdit ?
                                <p className=' font-semibold'> {profileShop.name} </p> :
                                <>
                                    <input
                                        value={formEditProfile.name}
                                        maxLength={30}
                                        minLength={1}
                                        onChange={(e) => handleFormProfile(e)}
                                        name='name'
                                        type="text" className=" font-semibold border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-gray-300 block w-full" />
                                    <p className=' text-xs flex flex-row-reverse'>
                                        {formEditProfile.name.length || 0}/30
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4 items-center'>
                        <div className=' w-60 text-right'>
                            <p>Logo Shop:</p>
                        </div>
                        <div className=' flex-1'>
                            {!isEdit ?
                                <img className=' w-32 h-32 object-cover rounded-full' src={profileShop.thumbnail} alt="" /> :
                                <div className='w-32 h-32 overflow-hidden  rounded-full relative'>
                                    <img className=' w-full object-cover' src={preview || profileShop.thumbnail} alt="" />
                                    <p onClick={() => handleClick()} className=' absolute bottom-0 bg-opacity-30 cursor-pointer text-center font-semibold text-white w-full bg-black p-2'>Sửa</p>
                                    <input ref={inputRef} className="hidden"
                                        id="uploadFile1"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className=' py-4'>
                    <div className=' flex gap-4'>
                        <div className=' w-60 text-right'>
                            <p>Mô tả Shop:</p>
                        </div>
                        <div className=' flex-1'>
                            {!isEdit ?
                                <p className=''> {profileShop.description} </p> :
                                <>
                                    <textarea
                                        value={formEditProfile.description}
                                        onChange={(e) => handleFormProfile(e)}
                                        maxLength={500}
                                        name='description'
                                        className=" p-2.5 h-40 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-gray-300 block w-full"
                                        placeholder='Nhập mô tả hoặc thông tin của shop bạn tại đây' />
                                    <p className=' text-xs flex flex-row-reverse'>
                                        {formEditProfile.description?.length || 0}/500
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                {isEdit &&
                    <div className=' py-4'>
                        <div className=' flex gap-6 items-center'>
                            <div className=' w-60 text-right'>
                            </div>
                            <div onClick={() => submitForm()} className=' font-semibold cursor-pointer px-6 py-2 rounded border border-primary text-primary hover:text-white hover:bg-primary hover:shadow-md'>
                                Lưu
                            </div>
                            <div onClick={() => setIsEdit(false)} className=' cursor-pointer px-4 py-2 rounded border hover:bg-gray-100 hover:shadow'>
                                Hủy
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default ProfileShop
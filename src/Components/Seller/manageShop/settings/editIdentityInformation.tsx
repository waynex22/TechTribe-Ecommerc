import { useEffect, useRef, useState } from "react"
import { defaultValueIdentification } from "../../../../utils/default/shop"
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { fetchIdentification, SelectIdentification } from "../../../../redux/features/shop";
import { Link, useNavigate } from "react-router-dom";
import { TypeIdentification } from "../../../../utils/types/shop";
import { FormErrorsIdentification, validateFormIdentification } from "../../../../utils/validatetor/createIdentification";
import requestApi from "../../../../helper/api";

const EditIdentityInformation: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const identification = useAppSelector(SelectIdentification)
  const [form, setForm] = useState(defaultValueIdentification)
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFile] = useState<File[]>([]);
  const [error, setError] = useState({} as FormErrorsIdentification)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    dispatch(fetchIdentification())
    setForm({ ...form, type_card: 'Căn Cước Công Dân (CCCD)' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (identification.id_shop) {
      setForm(identification)
    }
  }, [identification])

  useEffect(() => {
    if (isSubmit === true)
      setError(validateFormIdentification(form))
  }, [form, isSubmit])

  const handleForm = (key: string, value: string) => {
    if (key === 'CCCD_number') {
      if (/^\d*$/.test(value)) {
        setForm((prevForm) => ({ ...prevForm, [key]: value }));
      }else if(form.type_card === 'Passport' && /^[a-zA-Z0-9]*$/.test(value)) {
        setForm((prevForm) => ({ ...prevForm, [key]: value }));
      }
    } else if (key === 'type_card') {
      setForm((prevForm) => ({ ...prevForm, [key]: value, CCCD_number: '' }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        const previewUrl = URL.createObjectURL(imageFiles[0]);
        setForm((prevForm) => ({ ...prevForm, CCCD_photo: previewUrl }))
        setFile(imageFiles);
      } else {
        // Handle case where no image files were selected
        toast.error('Please select an image file.')
      }
    }
  };
  const handleSubmitForm = () => {
    const newEror = validateFormIdentification(form)
    setIsSubmit(true)
    if (Object.keys(newEror).length > 0)
      return
    if (files.length>0) {
      const formData = new FormData();
      files.forEach((file: File) => {
        formData.append('files', file);
      });
      requestApi('upload/files', 'POST', formData, 'multipart/form-data')
      .then(response => {
          const newForm = { ...form, CCCD_photo: response.data.filenames[0] }
          submitForm(newForm)
          deleteFile()
      })
      .catch(error => {
          console.error('Error uploading files:', error);
      });
    } else {
      submitForm(form)
    }
  }
  const submitForm = (identification: TypeIdentification) => {
    requestApi('identification', 'POST', identification, 'application/json')
    .then(response => {
        toast.success('Cập nhật thông tin thành công')
        navigate('/seller/settings?type=identity-information')
    })
    .catch(error => {
      toast.success('Có lỗi khi cập nhật')
        console.error('Error uploading files:', error);
    });
  }
  const deleteFile = () => {
    if(identification.CCCD_photo) {
      const filesToDelete = []
      filesToDelete.push(identification.CCCD_photo)
      requestApi('upload/files', 'DELETE', { filesToDelete }, 'application/json')
    }
}
  return (
    <div className="  container  m-auto">
      <div className=" bg-white p-4 rounded border border-gray-200 shadow-md">
        <div className=" w-[1000px] m-auto min-w-[500px] py-8">
          <p className=" border border-blue-700 bg-blue-100 p-2 rounded text-sm text-center text-gray-700 font-normal">Vui lòng cung cấp Thông Tin Định Danh của Chủ Shop (nếu là cá nhân), hoặc Người Đại Diện Pháp Lý trên giấy đăng ký kinh doanh.</p>

          <div className=" font-normal text-sm pt-10">
            <div className=' py-6'>
              <div className=' flex gap-4 items-center'>
                <div className=' w-72 text-right'>
                  <p> <span className=" text-red-600 pt-1">*</span> Hình Thức Định Danh:</p>
                </div>
                <div className=' flex-1 flex gap-4 items-center '>
                  <div className=" flex items-center gap-1">
                    <input
                      onChange={() => handleForm('type_card', 'Căn Cước Công Dân (CCCD)')}
                      type="radio" name="type" id="CCCD"
                      checked={form.type_card === "Căn Cước Công Dân (CCCD)"}
                    />
                    <label htmlFor="CCCD">Căn Cước Công Dân (CCCD)</label>
                  </div>
                  <div className=" flex items-center gap-1">
                    <input onChange={() => handleForm('type_card', 'Chứng Minh Nhân Dân (CMND)')} type="radio" name="type" id="CMND"
                      checked={form.type_card === "Chứng Minh Nhân Dân (CMND)"}
                    />
                    <label htmlFor="CMND">Chứng Minh Nhân Dân (CMND)</label>
                  </div>
                  <div className=" flex items-center gap-1">
                    <input onChange={() => handleForm('type_card', 'Passport')} type="radio" name="type" id="Passport"
                      checked={form.type_card === "Passport"}
                    />
                    <label htmlFor="Passport"> Passport </label>
                  </div>
                </div>
              </div>
            </div>
            <div className=' py-6'>
              <div className=' flex gap-4'>
                <div className='  w-72 text-right py-2'>
                  <p> <span className=" text-red-600 pt-1">*</span> Số {form.type_card}:</p>
                </div>
                <div>
                  <div className=' w-[400px] relative p-1 border border-gray-400 rounded-md ' >
                    <input
                      value={form.CCCD_number}
                      onChange={(e) => handleForm(e.target.name, e.target.value)} type="text" name="CCCD_number" className="w-[340px]" id="" maxLength={form.type_card === 'Passport' ? 20 : 12} placeholder="Nhập vào" />
                    <p className=" absolute right-2  top-1/2 -translate-y-1/2 text-xs"> {form.CCCD_number ? form.CCCD_number.length : 0} /{form.type_card === 'Passport' ? 20 : 12}</p>
                  </div>
                  <p className=" text-red-500"> {error.CCCD_number} </p>
                </div>
              </div>
            </div>
            <div className=' py-6'>
              <div className=' flex gap-4'>
                <div className=' w-72 text-right py-2'>
                  <p> <span className=" text-red-600 pt-1">*</span> Họ & Tên:</p>
                </div>
                <div>
                  <div className=' w-[400px] relative p-1 border border-gray-400 rounded-md '>
                    <input value={form.full_name} onChange={(e) => handleForm(e.target.name, e.target.value)} type="text" name="full_name" className="w-[340px]" id="" maxLength={100} placeholder="Nhập vào" />
                    <p className=" absolute right-2 top-1/2 -translate-y-1/2 text-xs"> {form.full_name ? form.full_name.length : 0} /100</p>
                  </div>
                  <p className=" text-red-500"> {error.full_name} </p>
                  <p className=" text-xs text-gray-500 pt-1">Theo CMND/CCCD/Hộ Chiếu</p>
                </div>
              </div>
            </div>
            <div className=' py-6'>
              <div className=' flex gap-4 '>
                <div className=' w-72 text-right'>
                  <p> <span className=" text-red-600 pt-1">*</span> Hình chụp của {form.type_card}:</p>
                </div>
                <div>
                  <div className=' flex gap-2'>
                    <div onClick={() => handleClick()} className=" group relative overflow-hidden border w-28 h-28 flex items-center justify-center rounded border-solid cursor-pointer">
                      <input ref={inputRef} className="hidden"
                        id="uploadFile1"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange} />
                      {form.CCCD_photo ?
                        <>
                          <img className=" w-full object-cover" src={form.CCCD_photo} alt="" />
                          <p className=" bg-opacity-40 group-hover:flex hidden absolute w-full bottom-0 p-2 bg-black text-white  items-center justify-center text-xl"> <MdModeEdit /> </p>
                        </> :
                        <img className=" w-12" src={'https://img.icons8.com/?size=100&id=98&format=png&color=000000'} alt="" />
                      }
                    </div>
                    <div className=" mt-auto">
                      <img className=" w-32" src="https://media.istockphoto.com/id/612650934/vi/vec-to/cmnd-%C4%91%C6%B0%E1%BB%A3c-c%C3%A1ch-ly-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-nh%E1%BA%ADn-d%E1%BA%A1ng-doanh-nghi%E1%BB%87p.jpg?s=170667a&w=0&k=20&c=Cvrtfn8vMx-B8lJDIbE5o2FJv1SVerbCdVtI9Xg9AnQ=" alt="" />
                    </div>
                  </div>
                  <p className=" text-red-500"> {error.CCCD_photo} </p>
                  <p className=" text-xs text-gray-500 pt-1">Vui lòng cung cấp ảnh chụp cận CMND/CCCD/Hộ chiếu của bạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-t py-6">
          <div className=" flex gap-4 flex-row-reverse">
            <button onClick={() => handleSubmitForm()} className=" px-6 py-2 rounded border border-primary text-primary text-base font-semibold hover:bg-primary hover:text-white hover:shadow-md">Lưu</button>
            <Link to={'/seller/setings'} className=" px-6 py-2 rounded border hover:shadow-md hover:bg-gray-100">Hủy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditIdentityInformation
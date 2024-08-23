import React, { useContext, useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchAutoReply, SelectAutoReply, SelectLoadingAutoReply } from '../../../../../redux/features/autoReplyMessage'
import requestApi from '../../../../../helper/api'
import { toast } from 'react-toastify'
import { LoaderContex } from '../../../loadingProvider'

const AutoReplyComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const autoReply = useAppSelector(SelectAutoReply)
  const loading = useAppSelector(SelectLoadingAutoReply)
  const [status, setStatus] = useState(false)
  const [content, setContent] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const { setLoader } = useContext(LoaderContex)
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    dispatch(fetchAutoReply())
  }, [dispatch])
  useEffect(() => {
    if (autoReply) {
      setStatus(autoReply.status)
      setContent(autoReply.content)
    }
  }, [autoReply])
  const handleCheckboxChange = () => {
    setStatus(!status)
  }
  const changeVaueReply = (value: string) => {
    if (content && content.length >= 600 && content.length < value.length)
      return
    setContent(value)
  }
  useEffect(() => {
    if (content && !content.trim() && isSubmit && status) {
      setError('Bạn phải điền nội dung tin nhắn')
    } else {
      setError('')
    }
  }, [content, isSubmit, status])
  const updateAutoReply = () => {
    if (status && !content.trim()) {
      setIsSubmit(true)
      return
    }

    const dataAutoReply = {
      content,
      status
    }
    setLoader(true)
    requestApi('auto-reply', 'POST', dataAutoReply, 'application/json')
      .then((data) => {
        setLoader(false)
        console.log(data);

        if (data.data.status === 409)
          toast.error(data.data.message)
        else {
          toast.success('Cập nhật thành công')
          navigate('/seller/chat-management')
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
        toast.error('Có lỗi khi cập nhật')
      })
  }

  return (
    <>
      <div className=' p-6 bg-white rounded shadow-md font-normal'>
        <div className=' py-2 flex gap-1 flex-col'>
          <h4 className=' text-xl py-1 '>Tin nhắn tự động</h4>
          <p className=' text-gray-500 text-xs'>Sau khi kích hoạt, tin nhắn sẽ được tự động gửi đến Người mua khi họ bắt đầu chat với bạn.</p>
          <p className=' text-gray-500 text-xs'>Tin nhắn tự động mặc định sẽ chỉ được kích hoạt 24 giờ một lần cho mỗi người mua.</p>
        </div>
        <div className=' py-6'>
          {
            !loading ?
            <div className={` border rounded ${!isEdit && ' shadow'} ${error && 'border-red-600'}`}>
              <div className=' bg-gray-100 border-b rounded-t py-2 px-4 flex items-center justify-between'>
                <p>Cài đặt</p>
                <div className=' flex items-center gap-2'>
                  <label className='flex cursor-pointer select-none items-center'>
                    <div className='relative'>
                      <input
                        type='checkbox'
                        checked={status}
                        onChange={handleCheckboxChange}
                        className='sr-only'
                      />
                      <div
                        className={`box block h-6 w-12 rounded-full ${status ? 'bg-primary' : ' bg-gray-300'
                          }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${status ? 'translate-x-full' : ''
                          }`}
                      ></div>
                    </div>
                  </label>
                  <p onClick={() => setIsEdit(!isEdit)} className=' text-xl cursor-pointer'><MdModeEdit /></p>
                </div>
              </div>
              <div className=' relative'>
                <textarea
                  readOnly={isEdit}
                  className=' px-6 py-4 h-40 w-full outline-none text-sm text-gray-700'
                  value={content}
                  onClick={() => setIsEdit(false)}
                  onChange={(e) => changeVaueReply(e.target.value)}
                  placeholder='Nội dung tin nhắn tự động...'
                >
                </textarea>
                <p className=' absolute bottom-2 right-4 text-xs' > {(content && content.length) || 0}/600 </p>
              </div>
            </div>
            :
            <div className={` border rounded `}>
              <div className=' bg-gray-100 border-b rounded-t py-2 px-4 flex items-center justify-between'>
                <p>Cài đặt</p>
              </div>
              <div className=' relative'>
                <textarea
                  readOnly
                  className=' px-6 py-4 h-40 w-full outline-none text-sm text-gray-700'
                  placeholder='Nội dung tin nhắn tự động...'
                >
                </textarea>
                <p className=' absolute bottom-2 right-4 text-xs' > 0/600 </p>
              </div>
            </div>
          }
          <p className=' text-red-500 pt-1 text-sm text-right'> {error} </p>
        </div>
        <div className=' flex flex-row-reverse py-4 gap-5'>
          <button
            className=' px-4 py-2 rounded shadow-md text-white font-semibold border bg-primary hover:border-primary hover:bg-white hover:text-primary'
            onClick={() => updateAutoReply()}>
            Xác nhận
          </button>
          <Link
            className=' px-4 py-2 rounded shadow-md hover:bg-gray-200 hover:border'
            to={'/seller/chat-management'}>
            Hủy
          </Link>
        </div>
      </div>
    </>
  )
}

export default AutoReplyComponent
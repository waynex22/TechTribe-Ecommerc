import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { BsArrowsMove } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hook';
import { fetchMessageShorCutSample, SelectMessageShortCutSample } from '../../../../../../redux/features/messageShortCut';
import { IoMdAdd } from 'react-icons/io';
import Popup from '../../../../../../Page/popup/popup';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderContex } from '../../../../loadingProvider';
import requestApi from '../../../../../../helper/api';
import { toast } from 'react-toastify';
import { TypeMessageShortCut } from '../../../../../../utils/types/messageShortCut';


const CreateMessageShortCut = ({ messageShorCut }: { messageShorCut?: TypeMessageShortCut }) => {
    const dispatch = useAppDispatch()
    const { setLoader } = useContext(LoaderContex)
    const navigate = useNavigate()
    const listSample = useAppSelector(SelectMessageShortCutSample)
    const [contents, setContents] = useState([''])
    const [checkMore, setCheckMore] = useState(false)
    const [isShowPopup, setShowPopup] = useState(false)
    const [listChooseSample, setListChooseSample] = useState([] as string[])
    const [group_name, setGroupName] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [error, setError] = useState({} as { group_name: string, content: string })

    useEffect(() => {
        if (messageShorCut) {
            setGroupName(messageShorCut.group_name)
            setContents(messageShorCut.contents)
        }
    }, [messageShorCut])
    useEffect(() => {
        dispatch(fetchMessageShorCutSample())
    }, [dispatch])
    useEffect(() => {
        if (contents) {
            let check = true
            for (const content of contents) {
                if (!content)
                    check = false
            }
            setCheckMore(check)
        }
    }, [contents])
    useEffect(() => {
        if (isSubmit)
            setError(validateform())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contents, group_name, isSubmit])
    const handleContent = (value: string, index: number) => {
        const newContent = [...contents];
        if (index >= 0 && index < contents.length) {
            newContent[index] = value;
            setContents(newContent);
        }
    }
    const moreContent = () => {
        if (checkMore)
            setContents([...contents, ''])
    }
    const removeContent = (index: number) => {
        if (index >= 0 && index < contents.length) {
            const newStrings = contents.filter((_, i) => i !== index);
            setContents(newStrings);
        }
    }

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const handleDragStart = (index: number) => {
        setDraggingIndex(index);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const handleDrop = (index: number) => {
        if (draggingIndex !== null && draggingIndex !== index) {
            const newContent = [...contents];
            // cắt 1 phần tử từ vị trí index start
            const [movedItem] = newContent.splice(draggingIndex, 1);
            // từ vị trí index drop xóa 0 và thêm phần tử đã cắt 
            newContent.splice(index, 0, movedItem);
            setContents(newContent);
            setDraggingIndex(null);
        }
    };
    const handleShowPopup = () => {
        setListChooseSample([])
        setShowPopup(!isShowPopup)
    }
    const handleListChooseSample = (index: number) => {
        setListChooseSample((prev) => {
            if (prev.length > 0) {
                const check = prev.find(item => item === listSample.contents[index])
                if (check) {
                    return prev.filter((item) => item !== listSample.contents[index])
                } else {
                    if (contents.length + prev.length >= 20)
                        return prev
                    return [...prev, listSample.contents[index]]
                }
            } else {
                if (contents.length >= 20)
                    return []
                return [listSample.contents[index]]
            }
        })
    }
    const handleContentByListChoose = () => {
        setContents((prev) => [...prev, ...listChooseSample])
        setListChooseSample([])
        handleShowPopup()
    }
    const handleAllChooseContent = () => {
        if (listChooseSample.length > 0) {
            setListChooseSample([])
        } else {
            setListChooseSample((prev) => {
                if (contents.length + listSample.contents.length <= 20)
                    return listSample.contents
                else {
                    return listSample.contents.slice(0, 20 - contents.length)
                }
            })
        }
    }

    const validateform = () => {
        const err = {
            group_name: '',
            content: ''
        }
        if (!group_name)
            err.group_name = 'Hãy điền tên nhóm !'
        const check = contents.filter((item) => !item)

        if (contents.length === 0 || check.length > 0) {
            err.content = "Hãy điền nội dung tin nhắn!"
        }
        return err
    }

    const onSubmit = () => {
        setIsSubmit(true)
        const err = validateform()
        if (err.content || err.group_name) {
            setError(err)
            return
        }

        setLoader(true)
        if (messageShorCut)
            editMessageShortCut()
        else
            createMessageShortCut()

    }
    const createMessageShortCut = () => {
        const data = {
            group_name,
            contents
        }
        requestApi('message-short-cut', 'POST', data, 'application/json')
            .then((data) => {
                setLoader(false)
                if (data.data.status === 409) {
                    toast.error(data.data.message)
                } else {
                    toast.success('Thêm mới thành công')
                    navigate('/seller/chat-management/message-short-cuts')
                }
            })
            .catch(err => {
                setLoader(false)
                console.log(err);
                toast.error('Có lỗi khi thêm')
            })
    }
    const editMessageShortCut = () => {
        const data = {
            group_name,
            contents
        }
        if (messageShorCut)
            requestApi(`message-short-cut/${messageShorCut._id}`, 'PATCH', data, 'application/json')
                .then((data) => {
                    setLoader(false)
                    if (data.data.status === 409) {
                        toast.error(data.data.message)
                    } else {
                        toast.success('Cập nhật thành công')
                        navigate('/seller/chat-management/message-short-cuts')
                    }
                })
                .catch(err => {
                    setLoader(false)
                    console.log(err);
                    toast.error('Có lỗi khi cập nhật')
                })
    }

    return (
        <>
            <div className=' p-6 bg-white rounded shadow-md font-normal'>
                <div className=' py-2  flex items-center justify-between'>
                    <h4 className=' text-xl py-1 '>Tạo tin nhắn nhanh cá nhân</h4>
                </div>
                <div className=' flex gap-4 py-4 text-sm '>
                    <div className=' w-[200px] text-right py-1'>
                        <p>Tên nhóm: </p>
                    </div>
                    <div className=' w-full'>
                        <input
                            onChange={(e) => setGroupName(e.target.value)}
                            value={group_name}
                            type="text"
                            className={`w-full rounded border px-1 ${error.group_name && 'border-red-500'}`}
                        />
                        <p className=' text-xs pt-1 text-red-500'> {error.group_name} </p>
                    </div>
                </div>
                <div className=' flex gap-4 py-4  text-sm '>
                    <div className=' w-[200px] text-right py-2'>
                        <p>Tin nhắn nhanh: </p>
                    </div>
                    <div className=' w-full'>
                        <div className=' border rounded'>
                            <div className=' bg-gray-100 border-t p-2 flex gap-2'>
                                <div className=' w-1/12 text-center'>
                                    No.
                                </div>
                                <div className=' flex-1'>
                                    Nội dung tin nhắn
                                </div>
                                <div className=' w-1/6 text-center'>
                                    Thao tác
                                </div>
                            </div>

                            {contents && contents.length > 0 &&
                                contents.map((item, index) => {
                                    return (
                                        <div
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={handleDragOver}
                                            onDrop={() => handleDrop(index)}
                                            key={index}
                                            className={`p-2 flex gap-2   border-b ${draggingIndex === index ? 'opacity-80 transform scale-105 cursor-grabbing' : ''}`}
                                        >
                                            <div className=' w-1/12 text-center'>
                                                {index + 1}
                                            </div>
                                            <div className=' flex-1'>
                                                <textarea
                                                    value={item}
                                                    onChange={(e) => handleContent(e.target.value, index)}
                                                    name=""
                                                    placeholder='Nội dung tin nhắn ....'
                                                    className={` w-full h-20 p-2 border outline-none rounded ${isSubmit && !item && ' border-red-500'}`} id="">
                                                </textarea>
                                            </div>
                                            <div className=' w-1/6 flex items-center justify-center gap-4'>
                                                <p onClick={() => removeContent(index)} className=' text-xl cursor-pointer'><RiDeleteBin5Line /></p>
                                                <p className=' text-xl cursor-move'>
                                                    <BsArrowsMove />
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className=' flex gap-4 px-6 py-2'>
                                {
                                    checkMore && (contents && contents.length) < 20 ?
                                        <div onClick={moreContent} className=' cursor-pointer w-1/2 py-2 hover:bg-gray-100 rounded border text-center flex items-center gap-4 justify-center'>
                                            <p className=' text-xl'> <IoMdAdd /></p>
                                            <p>Thêm tin nhắn ({(contents && contents.length) || 0}/20)</p>
                                        </div>
                                        :
                                        <div className=' cursor-not-allowed text-gray-600 w-1/2 py-2 rounded border text-center flex items-center gap-4 justify-center'>
                                            <p className=' text-xl'> <IoMdAdd /></p>
                                            <p>Thêm tin nhắn ({(contents && contents.length) || 0}/20)</p>
                                        </div>
                                }
                                {
                                    (contents && contents.length) < 20 ?
                                        <div onClick={handleShowPopup} className=' cursor-pointer w-1/2 py-2 rounded  hover:bg-gray-100 border text-center flex items-center gap-4 justify-center'>
                                            <p className=' text-xl'> <IoMdAdd /></p>
                                            <p>Thêm từ mẫu có sẵn</p>
                                        </div>
                                        :
                                        <div className=' cursor-not-allowed w-1/2 py-2 rounded  border text-center flex items-center gap-4 justify-center'>
                                            <p className=' text-xl'> <IoMdAdd /></p>
                                            <p>Thêm từ mẫu có sẵn</p>
                                        </div>
                                }
                            </div>
                        </div>
                        <p className=' text-xs pt-1 text-red-500 text-right'> {error.content} </p>

                    </div>
                </div>
            </div>

            <div className=' py-4 flex gap-4 flex-row-reverse items-center text-sm'>
                {
                    !error.content && !error.group_name ?
                        <p onClick={onSubmit} className=' cursor-pointer rounded border px-4 py-2 bg-primary text-white'>Lưu</p>
                        :
                        <p className=' cursor-not-allowed  bg-opacity-80 rounded border px-4 py-2 bg-primary text-white'>Lưu</p>
                }
                <Link to={'/seller/chat-management/message-short-cuts'} className=' bg-white rounded border hover:shadow px-4 py-2 '>Thoát</Link>
            </div>

            {isShowPopup &&
                <Popup onHandlePopup={handleShowPopup} >
                    <div className=' bg-white rounded p-4 font-normal w-[700px] relative'>
                        {
                            listSample._id &&
                            <>
                                <h4 className=' text-xl'> {listSample.group_name} </h4>
                                <div className=' rounded border my-4'>
                                    <div className=' flex items-center bg-gray-100 p-2 border-b'>
                                        <div className='w-[30px]  items-center flex justify-center'>
                                            <input onChange={handleAllChooseContent} checked={listChooseSample.length > 0} type="checkbox" name="" id="all-listMess" />
                                        </div>
                                        <label htmlFor='all-listMess' className=' cursor-pointer ' >Tin nhắn nhanh</label>
                                    </div>
                                    <div className=' h-[350px] overflow-y-scroll'>
                                        {listSample.contents.length > 0 &&
                                            listSample.contents.map((item, index) => {
                                                return (
                                                    <div key={index} className=' flex items-center border-b p-2'>
                                                        <div className='w-[30px] ps-3'>
                                                            <input
                                                                checked={listChooseSample.includes(item)}
                                                                onChange={() => handleListChooseSample(index)}
                                                                type="checkbox" name=""
                                                                id={String(index + 1)}
                                                            />
                                                        </div>
                                                        <label htmlFor={String(index + 1)} className=' cursor-pointer text-sm ps-4 flex-auto'> {item} </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <div className=' py-4 flex justify-between px-6'>
                                    <p className=' text-gray-600 text-xs'>
                                        Đã chọn:
                                        {listChooseSample.length || 0}/
                                        {
                                            listSample && listSample.contents.length + contents.length > 20 ?
                                                20 - contents.length :
                                                listSample.contents.length || 0
                                        }
                                    </p>
                                    {listChooseSample.length > 0 ?
                                        <p onClick={handleContentByListChoose} className=' cursor-pointer px-4 py-1 text-sm rounded bg-primary text-white'>Xác nhận</p>
                                        :
                                        <p className=' cursor-not-allowed bg-opacity-70 px-4 py-1 text-sm rounded bg-primary text-white'>Xác nhận</p>
                                    }
                                </div>
                            </>
                        }
                        <p className=' absolute cursor-pointer top-4 right-4 text-xl' onClick={handleShowPopup}> <IoClose /> </p>
                    </div>
                </Popup>
            }
        </>
    )
}

export default CreateMessageShortCut
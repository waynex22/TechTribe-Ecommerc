import React, { useEffect, useState } from 'react'
import { typeCreateVoucher } from '../../../../../utils/types/voucher'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { fetchShop, SelectShop } from '../../../../../redux/features/shop'
import { formartDateYYYY_MM_DDTHH_MM } from '../../../../../utils/fortmartNumberVnd/formartDate'
import { checkTimeStatus } from '../../discount/list/listDiscout'
import { FormErrorsVoucher } from '../../../../../utils/validatetor/createVoucher'

const InfomartionVoucher = ({ caseNumber, formCreateVoucher, onHandleFormCrate, isExpired, errForm }: {
    caseNumber: string,
    formCreateVoucher: typeCreateVoucher
    onHandleFormCrate: (key: string, value: string | number | Date) => void
    isExpired?:  'active' | 'finished'
    errForm: FormErrorsVoucher
}) => {
    const dispatch = useAppDispatch()
    const shop = useAppSelector(SelectShop)
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    useEffect(() => {
        dispatch(fetchShop())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const now = new Date();
        const formattedDateTime = formartDateYYYY_MM_DDTHH_MM(now);
        setCurrentDateTime(formattedDateTime);

    }, []);
    useEffect(() => {
        if (formCreateVoucher.time_start && formCreateVoucher.time_end) {
            setStartTime(formartDateYYYY_MM_DDTHH_MM(formCreateVoucher.time_start));
            setEndTime(formartDateYYYY_MM_DDTHH_MM(formCreateVoucher.time_end));
        }
    }, [formCreateVoucher.time_end, formCreateVoucher.time_start])

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const startTimeDate = new Date(value);
        setStartTime(value);

        startTimeDate.setHours(startTimeDate.getHours() + 1);
        const newEndTime = formartDateYYYY_MM_DDTHH_MM(startTimeDate);
        setEndTime((prevEndTime) => prevEndTime < newEndTime ? newEndTime : prevEndTime);
    };
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEndTime(value);
    };
    return (
        <div className=' p-6 bg-white rounded shadow-md font-normal  text-sm'>
            <div className=' flex items-center gap-4'>
                <h4 className=' w-[200px] text-xl py-1'>Thông tin cơ bản</h4>
                {isExpired && checkTimeStatus(formCreateVoucher.time_start, formCreateVoucher.time_end)}
            </div>
            <div className=' py-4 flex flex-col gap-6'>
                <div className=' flex gap-4 items-center'>
                    <div className=' w-[200px] text-right '>
                        <p>Loại mã:</p>
                    </div>
                    <div className='flex items-center gap-2 px-4 border rounded py-2 shadow'>
                        {caseNumber === '1' &&
                            <>
                                <img className=' w-6' src="https://img.icons8.com/?size=100&id=49324&format=png&color=000000" alt="" />
                                <p className=''>Voucher toàn Shop</p>
                            </>
                        }
                        {caseNumber === '2' &&
                            <>
                                <img className=' w-6' src="https://img.icons8.com/?size=100&id=xH3QxZpfwH6W&format=png&color=000000" alt="" />
                                <p className=' text-lg'>Voucher sản phẩm</p>
                            </>
                        }


                    </div>
                </div>
                <div className=' flex gap-2'>
                    <div className=' w-[200px] text-right py-1'>
                        <p>Tên chương trình giảm giá:</p>
                    </div>
                    <div className='  '>
                        <div className=' w-[600px] '>
                            <div className=' relative'>
                            <input
                                onChange={(e) => onHandleFormCrate(e.target.name, e.target.value)}
                                type="text"
                                value={formCreateVoucher.name}
                                name='name'
                                readOnly={isExpired === 'finished'}
                                maxLength={50}
                                className={` border  w-full rounded ${isExpired === 'finished' && ' bg-gray-100 cursor-not-allowed'} ${errForm.name && 'border-red-500'}`} />
                            <p className=' absolute top-1/2 -translate-y-1/2 right-2 text-gray-700 text-start'>
                                {formCreateVoucher.name ? formCreateVoucher.name.length : 0}/100
                            </p>
                            </div>
                            <p className=' text-red-600 pt-1 text-xs'> {errForm.name} </p>
                        </div>
                        <p className=' pt-1 text-gray-500 text-xs'>Tên Voucher sẽ không được hiển thị cho Người mua</p>
                    </div>
                </div>
                <div className=' flex gap-2'>
                    <div className=' w-[200px] text-right py-1'>
                        <p>Mã giảm giá:</p>
                    </div>
                    <div className=' w-[600px] '>
                        <div className={`relative border  w-full rounded flex gap-1 items-center px-2 ${isExpired === 'finished' && ' bg-gray-100 cursor-not-allowed'} ${errForm.code && 'border-red-500'}`}>
                            <div className=' px-4 border-r'>
                                <p className=' uppercase'> {shop.name.slice(0, 4)} </p>
                            </div>
                            <input
                                onChange={(e) => onHandleFormCrate(e.target.name, e.target.value)}
                                type="text"
                                readOnly={isExpired === 'finished'}
                                value={formCreateVoucher.code}
                                name='code'
                                maxLength={5}
                                className={` uppercase w-full ${isExpired === 'finished' && 'bg-gray-100 cursor-not-allowed'}`} />
                            <p className=' absolute top-1/2 -translate-y-1/2 right-2 text-gray-700 text-start'> {formCreateVoucher.code ? formCreateVoucher.code.length : 0}/5 </p>
                        </div>
                        <p className=' text-red-600 pt-1 text-xs'> {errForm.code} </p>
                        <p className=' pt-1 text-gray-500 text-xs'>Vui lòng chỉ nhập các kí tự chữ cái (A-Z), số (0-9); tối đa 5 kí tự.</p>
                        <p className=' pt-1 text-gray-500 text-xs uppercase'>Mã giảm giá đầy đủ là: {shop.name.slice(0, 4)}{formCreateVoucher.code} </p>
                    </div>
                </div>
                <div className=' flex gap-2'>
                    <div className=' w-[200px] text-right py-1'>
                        <p>Thời gian sử dụng mã:</p>
                    </div>
                    <div className=' w-[600px] '>
                        <div className=" flex gap-2 items-center">
                            <div className=" w-[220px]">
                                <input
                                    type="datetime-local"
                                    className={`border rounded w-full ${false && 'border-red-600'} ${isExpired && 'bg-gray-100 cursor-not-allowed'}`}
                                    name="started"
                                    id="start"
                                    value={startTime}
                                    readOnly={!!isExpired}
                                    onChange={(e) => handleStartTimeChange(e)}
                                    min={currentDateTime}
                                />
                            </div>
                            <span className="px-2 border"></span>
                            <div className=" w-[220px]">
                                <input
                                    type="datetime-local"
                                    className={`border rounded w-full ${false && 'border-red-600'} ${isExpired && 'bg-gray-100 cursor-not-allowed'}`}
                                    name="end"
                                    id="end"
                                    value={endTime}
                                    readOnly={!!isExpired}
                                    onChange={handleEndTimeChange}
                                    min={startTime ? new Date(new Date(startTime).getTime() + 60 * 60 * 1000).toISOString().slice(0, 16) : ''}
                                />
                            </div>
                        </div>
                        <div className="  text-xs pt-1">
                            {Object.keys(errForm).length > 0 ?
                                <div className=" flex gap-2">
                                    <p className=" w-[220px] text-red-600">{errForm.time_start}</p>
                                    <span className="px-2"></span>
                                    <p className=" w-[220px] text-red-600">{errForm.time_end}</p>
                                </div>
                                :
                                <p className="  text-gray-500 ">Thời gian của chương trình không được quá 180 ngày.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfomartionVoucher
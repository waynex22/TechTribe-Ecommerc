/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { formartDateYYYY_MM_DDTHH_MM } from "../../../../../utils/fortmartNumberVnd/formartDate";
import { validateTimeStart_End } from "../../../../../utils/validatetor/validateTime";
import { FormErrorsDiscount } from "../../../../../utils/validatetor/validateCreateDiscount";
import { TypeSelectTimeDiscount } from "./createProgram";

const SelectTimeStart = ({onHandleSelectName, errorForm, selectNameTime}:{
    onHandleSelectName: (key:string, value: string|Date) => void
    errorForm: FormErrorsDiscount
    selectNameTime: TypeSelectTimeDiscount
}) => {
    const [nameDiscount, setNameDiscount] = useState('')
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [error, setError] = useState({} as {start_time?:string, end_time?: string, name?: string});

    useEffect(()=>{
        if(selectNameTime.time_end && selectNameTime.time_start) {
            setStartTime(formartDateYYYY_MM_DDTHH_MM(selectNameTime.time_start))
            setEndTime(formartDateYYYY_MM_DDTHH_MM(selectNameTime.time_end))
            console.log('set time');
        }
    },[selectNameTime])
    
    useEffect(() => {
        const now = new Date();
        const formattedDateTime = formartDateYYYY_MM_DDTHH_MM(now);
        setCurrentDateTime(formattedDateTime);
    }, []);

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const startTimeDate = new Date(value);
        setStartTime(value);
        setError(validateTimeStart_End(value))

        startTimeDate.setHours(startTimeDate.getHours() + 1);
        const newEndTime = formartDateYYYY_MM_DDTHH_MM(startTimeDate);
        setEndTime((prevEndTime) => prevEndTime < newEndTime ? newEndTime : prevEndTime);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setEndTime(value);
        setError(validateTimeStart_End(startTime, value))
    };
    useEffect(()=>{
        onHandleSelectName('name', nameDiscount)
    },[nameDiscount])
    useEffect(()=>{
        if (startTime)
            onHandleSelectName('time_start', new Date(startTime))
    },[startTime])
    useEffect(()=>{
        if (endTime)
        onHandleSelectName('time_end', new Date(endTime))
    },[endTime])
    useEffect(()=>{
        setError(()=>{
            return {
                name: errorForm.name,
                end_time: errorForm.time_end,
                start_time: errorForm.time_start
            }
        })
    },[errorForm.name, errorForm.time_end, errorForm.time_start])
    return (
        <div className=' font-normal py-4 px-6 bg-white rounded shadow-md text-sm'>
            <h4 className=" text-xl py-1">Thông tin cơ bản</h4>
            <div className=" py-4">
                <div className=" flex gap-2">
                    <p className=" w-[300px] text-right py-2">Tên chương trình khuyến mãi:</p>
                    <div>
                        <div className={`border rounded p-0.5 w-[400px] relative ${error.name && 'border-red-600'}`}>
                            <input 
                                value={nameDiscount} 
                                onChange={(e) => setNameDiscount(e.target.value)} 
                                type="text" 
                                className={`w-[360px] `}
                             />
                            <p className=" absolute text-gray-600 right-2 top-1/2 -translate-y-1/2">150</p>
                        </div>
                        <p className=" text-xs w-[220px] text-red-600  pt-1">{error.name}</p>
                        <p className=" text-xs text-gray-500">Tên chương trình khuyến mãi sẽ không hiển thị với người mua.</p>
                    </div>
                </div>
            </div>
            <div className=" py-4">
                <div className=" flex gap-2">
                    <p className=" w-[300px] text-right py-2">Thời gian khuyến mãi:</p>
                    <div>
                        <div className=" flex gap-2 items-center">
                            <div className=" w-[220px]">
                                <input
                                    type="datetime-local"
                                    className={`border rounded w-full ${error.start_time && 'border-red-600'}`}
                                    name="started"
                                    id="start"
                                    value={startTime}
                                    onChange={(e) => handleStartTimeChange(e)}
                                    min={currentDateTime}
                                />
                            </div>
                            <span className="px-2 border"></span>
                            <div className=" w-[220px]">
                                <input
                                    type="datetime-local"
                                    className={`border rounded w-full ${error.end_time && 'border-red-600'}`}
                                    name="end"
                                    id="end"
                                    value={endTime}
                                    onChange={handleEndTimeChange}
                                    min={startTime ? new Date(new Date(startTime).getTime() + 60 * 60 * 1000).toISOString().slice(0, 16) : ''}
                                />
                            </div>
                        </div>
                        <div className="  text-xs pt-1">
                            {Object.keys(error).length > 0 ?
                                <div className=" flex gap-2">
                                    <p className=" w-[220px] text-red-600">{error.start_time}</p>
                                    <span className="px-2"></span>
                                    <p className=" w-[220px] text-red-600">{error.end_time}</p>
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

export default SelectTimeStart
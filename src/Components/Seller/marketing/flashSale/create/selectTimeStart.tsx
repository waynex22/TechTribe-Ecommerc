import React, { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { FormErrorsFlashSale } from '../../../../../utils/validatetor/createFlashSale';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { fetchFlashSaleByIdShop, SelectListFlashSale } from '../../../../../redux/features/flashSale';
import { SelectShop } from '../../../../../redux/features/shop';
import { formatShowDate } from '../../../../../utils/fortmartNumberVnd/formartDate';

type selectTime = { time_start: Date; time_end: Date };

const SelectTimeStartFlashSale = ({ setFormFlashSale, errorForm }: {
     setFormFlashSale: React.Dispatch<React.SetStateAction<selectTime>>
     errorForm: FormErrorsFlashSale
}) => {
    const dispatch = useAppDispatch()
    const listFlashSale = useAppSelector(SelectListFlashSale)
    const shop = useAppSelector(SelectShop)
    const [startTime, setStartTime] = useState('');
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const currentDate = new Date().toISOString().split('T')[0];
    const [listTime, setListTime] = useState([0, 6, 9, 12, 15, 18, 21]);
    const [showListItem, setShowListItem] = useState(true)

    useEffect(()=>{
        if(shop._id)
            dispatch(fetchFlashSaleByIdShop(shop._id))
    },[dispatch, shop._id])
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setStartTime(selectedDate);
        setSelectedTime(null); // Reset selected time when date changes
        
        const check = listFlashSale.flatMap((item)=>{
            if(compareDates(selectedDate, item.time_start))
                return formatShowDate(new Date(item.time_start))
        })
        
        const currentHour = new Date().getHours();
        if (selectedDate === currentDate) {
            const updatedListTime = listTime.filter((time) => time > currentHour);
            setListTime(updatedListTime);
        } else {
            setListTime([0, 6, 9, 12, 15, 18, 21]);
        }
        setShowListItem(true);
        setFormFlashSale({ time_start: new Date(), time_end: new Date() });
    };

    const handleTimeChange = (time: number) => {
        if (startTime) {
            
            const timeStart = new Date(`${startTime}T${time.toString().padStart(2, '0')}:00:00`);
            const timeEnd = new Date(`${startTime}T${(time + 2).toString().padStart(2, '0')}:59:59`);
            setFormFlashSale({ time_start: timeStart, time_end: timeEnd });
            setSelectedTime(time); // Set selected time
            setShowListItem(false);
        }
    };

    const handleResetSelection = () => {
        setShowListItem(true);
    };

    return (
        <div className="font-normal py-4 px-6 bg-white rounded shadow-md text-sm">
            <h4 className="text-xl py-1">Thông tin cơ bản</h4>
            <div className="py-4 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <p className="w-[300px] text-right py-1">Thời gian:</p>
                    <div>
                        <div className="flex gap-2 items-center border rounded px-0.5">
                            <div className="w-full">
                                <input
                                    type="date"
                                    name="started"
                                    id="start"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    min={currentDate}
                                />
                            </div>
                        </div>
                       {errorForm.time &&  <p className=' py-1 text-red-600 text-xs'> {errorForm.time} </p>}
                    </div>
                </div>
                {startTime && showListItem && (
                    <div className="flex gap-2">
                        <p className="w-[300px] text-right py-1">Khung giờ:</p>
                        <div className="border rounded overflow-hidden">
                            {listTime.map((item, index) => {
                                const formattedTime = item.toString().padStart(2, '0');
                                const nextTime = (item + 2).toString().padStart(2, '0');
                                return (
                                    <div key={index} className="flex items-center py-2 border-b">
                                        <div className="w-[50px] items-center flex justify-between">
                                            <input
                                                checked={selectedTime === item}
                                                type="radio"
                                                name="time_start"
                                                className="m-auto"
                                                id={`time_${formattedTime}`}
                                                onClick={() => handleTimeChange(item)}
                                            />
                                        </div>
                                        <div className="w-[200px]">
                                            <label className="cursor-pointer" htmlFor={`time_${formattedTime}`}>
                                                {formattedTime}:00:00 - {nextTime}:59:59
                                            </label>
                                        </div>
                                        <div className="w-[200px]">
                                            <label className="cursor-pointer" htmlFor={`time_${formattedTime}`}>
                                                Số sản phẩm tham gia 10
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {selectedTime !== null && !showListItem && (
                    <div className="flex gap-2">
                        <p className="w-[300px] text-right py-1">Khung giờ đã chọn:</p>
                        <div className="border rounded overflow-hidden">
                            <div onClick={handleResetSelection} className="flex items-center py-2 cursor-pointer">
                                <div className="w-[50px] items-center flex justify-between">
                                    <input
                                        checked
                                        type="radio"
                                        name="time_start"
                                        className="m-auto"
                                    />
                                </div>
                                <div className="w-[200px]">
                                    <span>{selectedTime.toString().padStart(2, '0')}:00:00 - {(selectedTime + 2).toString().padStart(2, '0')}:59:59</span>
                                </div>
                                <div className="w-[200px] flex gap-2 items-center">Số sản phẩm tham gia 10 <FaCaretDown /></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
function compareDates(date1: string, date2: Date) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    // So sánh các thành phần ngày, tháng, và năm
    return (
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    );
  }
export default SelectTimeStartFlashSale;

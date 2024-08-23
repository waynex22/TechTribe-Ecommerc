import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Toast from 'src/Components/toast/Toast';
import { useDepositMutation, useGetCardQuery, useGetWalletByCustomerQuery } from 'src/redux/rtkQuery/wallet';
import { ToastProps } from 'src/Type';

const DepositWallet: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const { data: wallet } = useGetWalletByCustomerQuery(user?.sub, {
        skip: !user
    })
    const { data: cards } = useGetCardQuery(wallet?._id, {
        skip: !wallet
    })
    const [helpInputAmountFaster , setHelpInputAmountFaster] = useState(0);
    const [deposit] = useDepositMutation();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [cardSelect, setCardSelect] = useState<string | null>(null);
    const [amount, setAmount] = useState<string>('');
    const handleSetToast = (toast: any) => {
        setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
    }
    const handleSelectCard = (cardId: string) => {
        setCardSelect(cardId);
    }
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        setAmount(numericValue);
    };

    const handleDeposit = async () => {
        if (!cardSelect) {
            handleSetToast({
                type: 'error',
                message: 'Vui lòng chọn nguồn tiền'
            })
            return;
        }
        if(!amount || Number(amount) <= 9999) {
            handleSetToast({
                type: 'error',
                message: 'Số tiền tối thiểu thấp nhất 10.000 VND'
            })
            return;
        }
        try {
            setLoading(true);
            const data = {
                walletId: wallet?._id,
                amount: Number(amount),
                description: 'nạp tiền qua thẻ',
                cardId: cardSelect
            }
            await deposit(data).unwrap();
            handleSetToast({
                type: 'success',
                message: 'Nạp tiền thành công'
            })
            setAmount('');
        } catch (error) {
            handleSetToast({
                type: 'error',
                message: 'Có lỗi xảy ra'
            })
        } finally {
            setLoading(false);
        }
        
    };

    const formatNumberVnd = (number: number) => {
        return number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };
    return (
        <>
        {toast && <Toast {...toast} />}
            <h2 className="font-normal">Nạp tiền</h2>
            <div className="flex items-center justify-between border-b border-dashed p-4 mt-2 bg-white rounded-lg">
                <Link to="/me/wallet" className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <p>Trở lại</p>
                </Link>
            </div>
            <div className="w-full bg-white p-4 rounded-md mt-2">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Số tiền nạp:</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded-md w-1/3"
                        placeholder="Nhập số tiền"
                        value={formatNumberVnd(Number(amount))}
                        onChange={handleAmountChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Chọn phương thức thanh toán:</label>
                    <div className="flex flex-col gap-4">
                        {cards?.length > 0 ? (
                            <>
                                {cards?.map((card: any) => (
                                    <div key={card?._id} onClick={() => handleSelectCard(card?._id)} className={`flex items-start gap-2 cursor-pointer ${cardSelect === card?._id ? 'bg-primary/20' : 'bg-gray-200/30'} backdrop-blur-lg p-2 rounded-md max-w-[30%]`}>
                                        <svg className='size-6' xmlns="http://www.w3.org/2000/svg" width="163.839" height="163.839" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 4335 4335" id="visa"><defs><linearGradient id="c" x1="2284.87" x2="2284.87" y1="1794.93" y2="2617.73" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00A0E3"></stop><stop offset="1" stop-color="#1F6AA3"></stop></linearGradient><linearGradient id="d" x1="1092.92" x2="1092.92" y1="1802.4" y2="2226.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F08627"></stop><stop offset="1" stop-color="#EF7F1A"></stop></linearGradient><linearGradient id="a" x1="2167.46" x2="2167.46" y1="3573.9" y2="845.69" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#D9DADA"></stop><stop offset="1" stop-color="#B2B3B3"></stop></linearGradient><linearGradient id="b" x1="1115.54" x2="1649.92" y1="773.65" y2="3645.95" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#EBECEC"></stop><stop offset="1" stop-color="#C5C6C6"></stop></linearGradient></defs><g><rect width="4267" height="2728" x="34" y="868" fill="#898989" rx="262" ry="262"></rect><rect width="4267" height="2728" x="34" y="846" fill="url(#a)" rx="262" ry="262"></rect><path fill="url(#b)" d="M296 3574h1369L2732 846H297c-144 0-262 118-262 262v2204c0 144 118 262 262 262z"></path><g><path fill="#2b2a29" d="M1361 2235c-10-14-19-37-26-52-26-53-93-136-135-171-36-30-90-73-133-92 1 12 7 28 11 41l178 642h229l255-590c11-27 78-175 83-198h-229l-204 524c-3 5-2 4-5 7-1-13-20-105-24-112zm1811-198c0 21 22 116 29 144 11 45 21 95 31 142h-173l113-286zm-439 571c251 0 207 18 237-57 8-21 16-45 25-64h274c2 20 9 42 13 63 6 27 7 57 23 57 215 0 193 13 182-41-4-19-6-30-11-50-8-34-15-66-22-99l-88-402c-14-67-29-134-45-201-56 0-202-12-242 19-40 30-71 124-92 170-18 41-36 80-54 123-17 42-34 79-53 120-42 90-109 259-149 338-5 11-15 23 3 23zm-519-555v24c0 90 104 166 172 194 17 7 34 15 52 25 187 100-8 213-231 123-12-5-39-18-53-20-2 25-10 58-14 86l-14 87c0 21 173 44 213 44 116 0 202-7 293-69 120-82 174-270-14-383-68-41-179-71-179-131 0-81 197-79 302-24 3-33 28-137 28-173-60-29-146-32-217-32-153 0-338 92-338 249zm-439 551h217l117-688c3-17 5-32 8-48 3-18 8-33 8-52h-217c0 27-103 612-116 689l-17 100z"></path><path fill="#2b2a29" d="M1067 1921c43 19 97 62 133 92 42 35 109 118 135 171 8 15 16 38 26 52 0-24-51-250-59-292-26-132-34-128-222-128H843v13c1 10 8 8 48 19 46 13 143 50 177 73z"></path></g><path fill="url(#c)" d="M1352 2227c-10-14-19-37-26-52-26-53-93-136-135-171-36-30-90-73-133-92 1 12 7 28 11 41l178 642h229l255-590c11-27 78-175 83-198h-229l-204 524c-3 5-2 4-5 7-1-13-20-105-24-112zm1811-198c0 21 22 116 29 144 11 45 21 95 31 142h-173l113-286zm-439 571c251 0 207 18 237-57 8-21 16-45 25-64h274c2 20 9 42 13 63 6 27 7 57 23 57 215 0 193 13 182-41-4-19-6-30-11-50-8-34-15-66-22-99l-88-402c-14-67-29-134-45-201-56 0-202-12-242 19-40 30-71 124-92 170-18 41-36 80-54 123-17 42-34 79-53 120-42 90-109 259-149 338-5 11-15 23 3 23zm-519-555v24c0 90 104 166 172 194 17 7 34 15 52 25 187 100-8 213-231 123-12-5-39-18-53-20-2 25-10 58-14 86l-14 87c0 21 173 44 213 44 116 0 202-7 293-69 120-82 174-270-14-383-68-41-179-71-179-131 0-81 197-79 302-24 3-33 28-137 28-173-60-29-146-32-217-32-153 0-338 92-338 249zm-439 551h217l117-688c3-17 5-32 8-48 3-18 8-33 8-52h-217c0 27-103 612-116 689l-17 100z"></path><path fill="url(#d)" d="M1059 1913c43 19 97 62 133 92 42 35 109 118 135 171 8 15 16 38 26 52 0-24-51-250-59-292-26-132-34-128-222-128H835v13c1 10 8 8 48 19 46 13 143 50 177 73z"></path></g></svg>
                                        <div className='flex flex-col'>
                                        <p className='text-xs font-normal'>{card?.cardHolderName}</p>
                                        <p className='text-xs font-normal'>{card?.cardNumber}</p>
                                        </div>
                                        {card?._id === cardSelect && (
                                            <>
                                            <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="shield-tick"><defs><linearGradient id="a" x1="3.549" x2="20.451" y1="12" y2="12" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#16b0e2"></stop><stop offset="1" stop-color="#6e5af0"></stop></linearGradient><linearGradient id="b" x1="8.295" x2="15.705" y1="11.387" y2="11.387" ></linearGradient></defs><g><path fill="url(#a)" d="M13.036,2.11l5.5,2.063a3.179,3.179,0,0,1,1.914,2.762v8.1A3.335,3.335,0,0,1,19.267,17.4l-5.5,4.11a3.136,3.136,0,0,1-3.532,0l-5.5-4.11a3.335,3.335,0,0,1-1.184-2.363v-8.1A3.179,3.179,0,0,1,5.463,4.173l5.5-2.063A3.424,3.424,0,0,1,13.036,2.11Z" opacity=".4"></path><path fill="url(#b)" d="M10.657,14.285a.744.744,0,0,1-.53-.22L8.515,12.454a.75.75,0,0,1,1.061-1.061l1.081,1.081,3.767-3.766a.75.75,0,1,1,1.061,1.06l-4.3,4.3A.744.744,0,0,1,10.657,14.285Z"></path></g></svg>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                Bạn chưa có liên kết thẻ nào
                            </>
                        )}
                    </div>
                </div>

                <button
                    className="w-1/3 bg-primary/30 hover:bg-primary/60 text-white p-2 rounded-md"
                    onClick={handleDeposit}
                >
                    Nạp tiền
                </button>
            </div>
        </>
    );
};

export default DepositWallet;

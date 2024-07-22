const VoucherShop: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-start gap-4 mt-4">
                <h3 className="font-light text-gray-700 text-sm">Shop khuyến mãi</h3>
                <div className="flex items-center gap-2 cursor-pointer">
                    <p className="text-[12px] font-thin text-gray-400 ">Nhập hoặc chọn mã</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>

            </div>
        </>
    )
}
export default VoucherShop;
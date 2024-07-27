import { useState } from "react";

const Voucher2T: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <div className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between font-light text-sm">
                    <p className="text-gray-900 font-normal">T2 khuyến mãi</p>
                    <div className="flex items-center gap-2  text-gray-400">
                        <p className="">2 mã khả dụng</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                </div>
                <div onClick={openModal} className="mt-4 flex items-center gap-2 cursor-pointer">
                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="discount-coupon"><g><path d="M23 52a1 1 0 0 0 1-1v-5a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1zm0-10a1 1 0 0 0 1-1v-5a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1z"></path><path d="M6 60h52a4 4 0 0 0 4-4v-5a1 1 0 0 0-1-1 6.5 6.5 0 0 1 0-13 1 1 0 0 0 1-1v-6a2.975 2.975 0 0 0-.611-1.8 3.633 3.633 0 0 0 .113-3.82l-2.222-3.843a1 1 0 0 0-1.366-.367 5.666 5.666 0 1 1-5.667-9.814 1.006 1.006 0 0 0 .366-1.366l-2.667-4.618a2.791 2.791 0 0 0-3.794-1.018L5.2 27H5a3 3 0 0 0-3 3v6a1 1 0 0 0 1 1 6.5 6.5 0 0 1 0 13 1 1 0 0 0-1 1v5a4 4 0 0 0 4 4ZM47.152 5.086a.781.781 0 0 1 1.062.285l2.2 3.808a7.668 7.668 0 0 0 7.6 13.168l1.754 3.038a1.641 1.641 0 0 1-.046 1.713A2.982 2.982 0 0 0 59 27H9.2ZM4 51.941a8.5 8.5 0 0 0 0-16.882V30a1 1 0 0 1 1-1h17v2a1 1 0 0 0 2 0v-2h35a1 1 0 0 1 1 1v5.059a8.5 8.5 0 0 0 0 16.882V56a2 2 0 0 1-2 2H24v-2a1 1 0 0 0-2 0v2H6a2 2 0 0 1-2-2Z"></path><path d="M34 42a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm12 10a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm-15.118-2a3.11 3.11 0 0 0 5.318 2.194l11.921-12.072a3.026 3.026 0 0 0 0-4.243 3.086 3.086 0 0 0-4.238 0L31.806 47.8a3.094 3.094 0 0 0-.924 2.2zm2.329-.78 12.083-11.928a1 1 0 1 1 1.406 1.419L34.78 50.788a1.109 1.109 0 1 1-1.569-1.568z"></path></g></svg>
                    <p className="text-primary/70 text-sm font-light">Chọn hoặc nhập khuyến mã khác</p>
                </div>
            </div>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-3/5 max-w-lg">
                            <div className="flex items-center justify-between">
                                <h3>2T Khuyến Mại</h3>
                                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex justify-between items-center my-4">
                                <input
                                    type="text"
                                    placeholder="Nhập mã giảm giá"
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  sm:text-sm"
                                />
                                <button className="ml-4 bg-green-400/20 backdrop-blur-0 text-green-400 py-2 text-[14px] font-semibold px-4 rounded w-[30%]">
                                    Áp dụng
                                </button>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Mã Giảm Giá</h2>
                            </div>
                            <div className="space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                                        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="apply-coupon-code"><path fill="#8cd0ff" d="M481.95 251.137a3.38 3.38 0 0 0 .546-5.919l-23.91-15.962a9.295 9.295 0 0 1-3.807-10.178l5.814-21.295a9.295 9.295 0 0 0-4.58-10.642l-22.218-11.897a9.295 9.295 0 0 1-4.512-10.876l6.988-23.195a9.295 9.295 0 0 0-4.548-10.895l-19.525-10.345a9.295 9.295 0 0 1-4.805-9.815l4.985-28.507a3.38 3.38 0 0 0-4.662-3.69L28.05 240.575a3.38 3.38 0 0 0-.545 5.92l24.082 16.055a9.295 9.295 0 0 1 3.793 10.248l-5.977 21.27a9.295 9.295 0 0 0 4.752 10.808l21.617 10.94a9.295 9.295 0 0 1 4.763 10.768l-6.71 24.29a9.295 9.295 0 0 0 4.548 10.656l19.43 10.48a9.295 9.295 0 0 1 4.745 9.777l-4.934 28.32a3.38 3.38 0 0 0 4.662 3.686Z"></path><path fill="#66c1ff" d="m482.496 245.218-23.91-15.962a9.295 9.295 0 0 1-3.807-10.178l5.814-21.295a9.295 9.295 0 0 0-4.58-10.642l-22.218-11.897a9.295 9.295 0 0 1-4.512-10.876l6.988-23.195a9.295 9.295 0 0 0-4.548-10.895l-19.525-10.345a9.295 9.295 0 0 1-4.805-9.815l4.985-28.507a3.38 3.38 0 0 0-4.662-3.69l-26.693 11.436-3.63 20.761a9.295 9.295 0 0 0 4.805 9.815l19.525 10.345a9.295 9.295 0 0 1 4.548 10.895l-6.988 23.195a9.295 9.295 0 0 0 4.512 10.876l22.218 11.897a9.295 9.295 0 0 1 4.58 10.642l-5.814 21.295a9.295 9.295 0 0 0 3.807 10.178l23.91 15.962a3.38 3.38 0 0 1-.546 5.919L98.963 402.359l-1.35 7.746a3.38 3.38 0 0 0 4.663 3.687L481.95 251.137a3.38 3.38 0 0 0 .546-5.919Z"></path><path fill="#66c1ff" d="M500.36 434.357a4 4 0 0 0 3.352-6.183l-18.565-28.504a11 11 0 0 1 .605-12.845l16.246-20.453a11 11 0 0 0-.02-13.71l-18.618-23.294a11 11 0 0 1 .16-13.933l18.412-21.972a11 11 0 0 0 .13-13.97L485.65 259.14a11 11 0 0 1-.651-12.914l18.707-28.685a4 4 0 0 0-3.35-6.185h-152.94a6 6 0 0 0-2.683.634l-26.05 13.025a6 6 0 0 1-5.366 0l-26.05-13.025a6 6 0 0 0-2.683-.634H11.645a4 4 0 0 0-3.35 6.185l18.707 28.685a11 11 0 0 1-.652 12.914L9.938 279.493a11 11 0 0 0 .13 13.97l18.411 21.972a11 11 0 0 1 .161 13.933l-18.618 23.294a11 11 0 0 0-.02 13.71l16.246 20.453a11 11 0 0 1 .605 12.845L8.288 428.174a4 4 0 0 0 3.352 6.183h272.944a6 6 0 0 0 2.683-.633l26.05-13.025a6 6 0 0 1 5.366 0l26.05 13.025a6 6 0 0 0 2.683.633Z"></path><path fill="#4eb7ff" d="M501.998 366.372a11 11 0 0 0-.02-13.71l-18.618-23.294a11 11 0 0 1 .16-13.933l18.412-21.972a11 11 0 0 0 .13-13.97L485.65 259.14a11 11 0 0 1-.651-12.914l18.707-28.685a4 4 0 0 0-3.351-6.185h-30a4 4 0 0 1 3.35 6.185L455 246.227a11 11 0 0 0 .65 12.914l16.414 20.352a11 11 0 0 1-.131 13.97l-18.411 21.972a11 11 0 0 0-.161 13.933l18.618 23.294a11 11 0 0 1 .02 13.71l-16.247 20.453a11 11 0 0 0-.604 12.845l18.565 28.504a4 4 0 0 1-3.352 6.183h30a4 4 0 0 0 3.352-6.183l-18.565-28.504a11 11 0 0 1 .604-12.845Z"></path><path fill="#fff" d="M366.903 314.059a22.5 22.5 0 1 1 15.91-6.591 22.349 22.349 0 0 1-15.91 6.59zm0-29.997a7.498 7.498 0 1 0 5.303 12.8h.001a7.497 7.497 0 0 0-5.304-12.8zm62.597 92.593a22.5 22.5 0 1 1 15.91-6.59 22.349 22.349 0 0 1-15.91 6.59zm0-29.999a7.5 7.5 0 1 0 5.303 12.803v-.001a7.499 7.499 0 0 0-5.303-12.802zm-67.518 18.877a7.5 7.5 0 0 1-5.303-12.804l71.395-71.395a7.5 7.5 0 0 1 10.608 10.607l-71.396 71.396a7.481 7.481 0 0 1-5.304 2.196zM316 403.19a7.5 7.5 0 0 1-7.5-7.5v-12.667a7.5 7.5 0 1 1 15 0v12.667a7.5 7.5 0 0 1-7.5 7.5zm0-44.334a7.5 7.5 0 0 1-7.5-7.5V338.69a7.5 7.5 0 0 1 15 0v12.666a7.5 7.5 0 0 1-7.5 7.5zm0-44.333a7.5 7.5 0 0 1-7.5-7.5v-12.667a7.5 7.5 0 0 1 15 0v12.667a7.5 7.5 0 0 1-7.5 7.5zm0-44.333a7.5 7.5 0 0 1-7.5-7.5v-12.667a7.5 7.5 0 1 1 15 0v12.667a7.5 7.5 0 0 1-7.5 7.5z"></path><rect width="193.478" height="64.507" x="77.522" y="290.604" fill="#fff" rx="10"></rect><path fill="#eee" d="M261 290.604h-30a10 10 0 0 1 10 10v44.506a10 10 0 0 1-10 10h30a10 10 0 0 0 10-10v-44.506a10 10 0 0 0-10-10Z"></path></svg>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-gray-900 text-sm font-medium">Giảm 300K</h3>
                                            <p className="text-gray-600 text-sm">Cho đơn hàng từ 10 triệu</p>
                                            <p className="text-gray-400 text-sm">HSD: 31/07/24</p>
                                        </div>
                                        <div className="text-blue-400 bg-blue-400/20 backdrop-blur-0 rounded-lg p-2 cursor-pointer text-sm">Sử dụng</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}
export default Voucher2T;
import { formatDateAndTime } from "src/utils/formartDate";

interface Props {
    returnOrder: any
}
const TimeLineStatus: React.FC<Props> = ({ returnOrder }) => {
    const getKeyUpdateItem = (key: string) => {
        return returnOrder?.statusUpdate?.filter((item: any) => item.key === key).map((item: any) => item.value);
    }
    return (
        <>
            <div className="flex items-center justify-start">
                <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center ">
                        <div className="border p-4 border-green-400 rounded-full">
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="courier"><path fill="#ffb127" d="M13.998,61L2.015,61c-0.011-0.332-0.016-0.665-0.016-1c0-16.569,13.431-30,30-30s30,13.431,30,30
		c0,0.335-0.005,0.668-0.016,1l-11.984,0H13.998z"></path><path fill="#ffd55d" d="M10.181,39.421c3.362,8.031,14.755,18.991,51.792,19.557C61.433,42.884,48.224,30,31.998,30
		C23.399,30,15.651,33.624,10.181,39.421z"></path><rect width="36" height="22" x="13.998" y="40" fill="#b8bce1"></rect><path fill="#e2e7f7" d="M13.998,45.266c5.215,5.662,15.585,11.262,36,13.102V40h-36V45.266z"></path><ellipse cx="31.998" cy="16" fill="#f4c8ad" rx="12" ry="14"></ellipse><path fill="#fbdac2" d="M31.998,2c-2.486,0-4.796,0.882-6.711,2.392c-2.034,2.508-3.289,5.885-3.289,9.61
		c0,7.732,5.373,14,12,14c2.486,0,4.796-0.882,6.711-2.392c2.034-2.508,3.289-5.885,3.289-9.61C43.998,8.268,38.626,2,31.998,2z"></path><rect width="8" height="4" x="38.998" y="54" fill="#ffb127"></rect><path fill="#fc9b00" d="M43.998,15l-4.125-1.031c-5.17-1.293-10.579-1.291-15.748,0.005l-4.098,1.027L24.998,20
		c4.657-1.354,8.964-1.329,14,0l0,0l4.971-5H43.998z"></path><path fill="#ffb127" d="M39.873,13.969l4.081,1.02C43.509,7.731,38.333,2,31.998,2c-6.337,0-11.514,5.735-11.957,12.998
		l4.083-1.024C29.294,12.678,34.703,12.676,39.873,13.969z"></path><path fill="#ffd55d" d="M43.609,12.543C42.29,6.485,37.601,2,31.998,2c-2.219,0-4.289,0.715-6.069,1.94
		c-1.283,1.686-1.927,3.578-2.249,5.125c-0.305,1.468,0.969,2.807,2.446,2.552C34.243,10.215,40.86,11.724,43.609,12.543z"></path><ellipse cx="37.699" cy="6.217" fill="#fff" rx="1.391" ry="3.144" transform="rotate(-50.119 37.697 6.216)"></ellipse><ellipse cx="43.955" cy="35.604" fill="#fff" rx="1.727" ry="3.903" transform="rotate(-63.596 43.956 35.603)"></ellipse><path fill="#ffd55d" d="M38.998,56.855c2.311,0.443,4.794,0.829,7.468,1.145h0.532v-4h-8V56.855z"></path><path fill="#fff" d="M47.504 44.489H31.895c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5h15.609c.829 0 1.5.671 1.5 1.5S48.333 44.489 47.504 44.489zM27.745 44.489h-3.484c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5h3.484c.829 0 1.5.671 1.5 1.5S28.574 44.489 27.745 44.489z"></path><g><path d="M38.998,59h8c0.552,0,1-0.447,1-1v-4c0-0.553-0.448-1-1-1h-8c-0.552,0-1,0.447-1,1v4C37.998,58.553,38.446,59,38.998,59z
		 M39.998,55h6v2h-6V55z"></path><path d="M37.598,29.516c4.369-2.42,7.4-7.561,7.4-13.516c0-8.271-5.832-15-13-15s-13,6.729-13,15c0,5.956,3.031,11.096,7.4,13.516
		C11.97,32.161,0.998,44.819,0.998,60c0,0.346,0.005,0.689,0.017,1.032c0.018,0.539,0.46,0.968,1,0.968h10.984c0,0.553,0.448,1,1,1
		h36c0.552,0,1-0.447,1-1h10.984c0.54,0,0.982-0.429,1-0.968c0.011-0.343,0.017-0.687,0.017-1.032
		C62.998,44.819,52.026,32.161,37.598,29.516z M31.998,3c5.392,0,9.881,4.613,10.814,10.672l-2.696-0.674
		c-5.312-1.327-10.925-1.325-16.234,0.005l-2.698,0.676C22.113,7.617,26.604,3,31.998,3z M42.025,15.538l-3.333,3.352
		c-4.812-1.191-8.993-1.195-13.398-0.011l-3.317-3.335l2.391-0.599c4.992-1.253,10.27-1.253,15.263-0.005L42.025,15.538z
		 M21.074,17.472l3.215,3.233C24.48,20.896,24.736,21,24.998,21c0.093,0,0.187-0.013,0.279-0.04
		c4.422-1.287,8.575-1.284,13.466,0.006c0.344,0.091,0.713-0.008,0.964-0.262l3.216-3.234C42.302,23.948,37.642,29,31.998,29
		C26.355,29,21.695,23.949,21.074,17.472z M48.998,61h-34V41h34V61z M50.998,60V40c0-0.553-0.448-1-1-1h-36c-0.552,0-1,0.447-1,1v20
		h-10c0-15.99,13.009-29,29-29s29,13.01,29,29H50.998z"></path></g></svg>
                        </div>
                        <div className={`w-[150px] h-[1px] bg-green-400 `}></div>
                    </div>
                    <div className="min-h-[100px]">
                        <p className="text-gray-800 text-sm font-normal">Đã tiếp nhận yêu cầu</p>
                        <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(returnOrder?.returnDate)}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-start">
                <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center">
                        <div className={`border  p-4 rounded-full ${returnOrder?.status !== 'Đã tiếp nhận' && returnOrder?.status !== 'Từ chối'  ? 'border-green-400' : 'border-gray-200'}`}>
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="easy-return"><path fill="#ffc166" d="M37.50018,160.5h437a0,0,0,0,1,0,0v314a30,30,0,0,1-30,30h-377a30,30,0,0,1-30-30v-314A0,0,0,0,1,37.50018,160.5Z"></path><path fill="#ffae36" d="M37.50018,160.5v20H367.96655a86.53363,86.53363,0,0,1,86.53363,86.53363V494.5a29.99069,29.99069,0,0,1-1.28906,8.71094A30.00968,30.00968,0,0,0,474.50018,474.5v-314Z"></path><circle cx="256" cy="332.5" r="137.5" fill="#fff"></circle><rect width="497" height="89" x="7.5" y="71.5" fill="#ffc166" rx="9.986"></rect><path fill="#ffae36" d="M494.51385,71.5h-20a9.98622,9.98622,0,0,1,9.98633,9.98633v69.02734A9.98622,9.98622,0,0,1,474.51385,160.5h20a9.98622,9.98622,0,0,0,9.98633-9.98633V81.48633A9.98622,9.98622,0,0,0,494.51385,71.5Z"></path><path fill="#63ea86" d="M307.07525,296.15626h-88a5,5,0,0,1-5-5V273.85318a5,5,0,0,0-8.1467-3.88565l-49.15014,39.80308a5,5,0,0,0,0,7.7713L205.92855,357.345a5,5,0,0,0,8.1467-3.88565V336.15626a5,5,0,0,1,5-5h87.57633a15.27883,15.27883,0,0,1,15.40656,14.27469,15.00075,15.00075,0,0,1-14.98289,15.72532h-58a5,5,0,0,0-5,5v25a5,5,0,0,0,5,5h58a50,50,0,0,0,50-50h0A50,50,0,0,0,307.07525,296.15626Z"></path><rect width="149.043" height="89" x="181.479" y="71.5" fill="#ffcd85"></rect><path fill="#676e87" d="M504.50018,512h-497a7.5,7.5,0,0,1,0-15h497a7.5,7.5,0,0,1,0,15Z"></path></svg>                        </div>
                        <div className={`w-[150px] h-[1px]  ${returnOrder?.status !== 'Đã tiếp nhận' && returnOrder?.status !== 'Từ chối' ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className="min-h-[100px]">
                        {returnOrder?.status !== 'Đã tiếp nhận' && returnOrder?.status !== 'Từ chối' && (
                            <>
                                <p className="text-gray-800 text-sm font-normal">Đã gửi hàng lại</p>
                                <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('Đã gửi hàng lại')[0])}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center">
                        <div className={`border  p-4 rounded-full ${returnOrder?.status === 'Kiểm tra hoàn hàng' || returnOrder?.status === 'Hoàn tiền' ? 'border-green-400' : 'border-gray-200'}`}>
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="find-clothe"><path fill="#00aaa8" d="m43.005 47.002 2.001-2L48.004 48l-2 2z"></path><path fill="#00bebd" d="m41 7-6 6-3-3v22H10V10l-3 3-6-6 8-7h24l8 7z"></path><path fill="#00aaa8" d="M32 14v18H12.1A20 20 0 0 1 32 14Z"></path><path fill="#00bebd" d="M50 34a18 18 0 1 1-18-18 18 18 0 0 1 18 18Z"></path><path fill="#fff" d="M48 34a16 16 0 1 1-16-16 16 16 0 0 1 16 16Z"></path><path fill="#00bebd" d="m48.29 47.71-2.58 2.58a1 1 0 0 0 0 1.42L57 63a2.83 2.83 0 0 0 4-4L49.71 47.71a1 1 0 0 0-1.42 0Z"></path><path fill="#00aaa8" d="M29.54 51.83a17.93 17.93 0 0 1-12.39-7.67 10.28 10.28 0 0 1 2.37-.16 16 16 0 0 0 9.09 5.62 10.6 10.6 0 0 1 .93 2.21Z"></path><path fill="#f3f3f3" d="M28.61 49.64A16 16 0 0 1 19.52 44a11 11 0 0 1 9.09 5.64Z"></path><circle cx="19" cy="55" r="9" fill="#ffac00"></circle><path fill="none" stroke="#fdfdfd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 55 3 3 6-6"></path><path fill="#00aaa8" d="M27 0a6 6 0 0 1-6 6 6 6 0 0 1-6-6Z"></path><path fill="#50d9d7" d="M34 18.13V34H16a16 16 0 0 1 18-15.87Z"></path></svg>                        </div>
                        <div className={`w-[150px] h-[1px] ${returnOrder?.status === 'Kiểm tra hoàn hàng' || returnOrder?.status === 'Hoàn tiền' ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className="min-h-[100px]">
                        {returnOrder?.status === 'Kiểm tra hoàn hàng' || returnOrder?.status === 'Hoàn tiền' && (
                            <>
                                <p className="text-gray-800 text-sm font-normal">Kiểm tra hàng hoàn</p>
                                <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('Hoàn tiền')[0])}</p>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
                <>
                    <div className="flex items-center justify-start">
                        <div className="flex flex-col items-start justify-start">
                            <div className="flex items-center">
                                <div className={`border p-4 rounded-full ${returnOrder?.status === 'Hoàn tiền' ? ' border-green-400' : 'border-gray-200'}`}>
                                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 33.867 33.867" id="refund"><path fill="#a8d0ff" d="M3.704 26.42a2.64 2.64 0 0 1-2.646-2.645V10.017A2.64 2.64 0 0 1 3.704 7.37h26.459a2.64 2.64 0 0 1 2.645 2.646v13.758a2.64 2.64 0 0 1-2.645 2.646z" paint-order="markers fill stroke"></path><path fill="#06f" d="M3.704 21.431a2.64 2.64 0 0 1-2.646-2.646V5.027a2.64 2.64 0 0 1 2.646-2.646h26.459a2.64 2.64 0 0 1 2.645 2.646v13.758a2.64 2.64 0 0 1-2.645 2.646z" paint-order="markers fill stroke"></path><path fill="#00a1ff" d="M5.995 2.381a4.99 4.99 0 0 1-4.937 4.691v9.668a4.99 4.99 0 0 1 4.937 4.691h21.877a4.99 4.99 0 0 1 4.936-4.69V7.071a4.99 4.99 0 0 1-4.936-4.69Z" paint-order="markers fill stroke"></path><path fill="#fff" d="M16.933 7.264a4.642 4.642 0 1 0 0 9.285 4.642 4.642 0 0 0 0-9.285z" paint-order="markers fill stroke"></path><path fill="#06f" d="m22.614 26.002-6.125-.717c.832-1.44-.352-2.863-1.748-2.05l-3.7 2.474c-.567.362-.819.98-.818 1.534 0 .555.251 1.172.819 1.533l3.7 2.474c1.395.806 2.57-.622 1.747-2.048l6.049-.691c1.472-.26 1.452-2.158.076-2.509z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" paint-order="markers fill stroke"></path></svg>
                                </div>
                            </div>
                            <div className="min-h-[100px]">
                                {returnOrder?.status === 'Hoàn tiền' && (
                                    <>
                                     <p className="text-gray-800 text-sm font-normal">Đã hoàn tiền</p>
                                     <p className="text-[12px] text-gray-400 font-normal">{formatDateAndTime(getKeyUpdateItem('Hoàn tiền')[0])}</p>
                                     </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
        </>
    )
}

export default TimeLineStatus;
import { formatNumberVnd } from "src/utils/fortmartNumberVnd";

interface Props {
    item: any
}
const ItemDetail: React.FC<Props> = ({ item }) => {
    return (
        <>
            <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between border-b border-dashed border-gray-200">
                    <div className="flex items-center gap-2 my-2">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="store"><path fill="#0795ff" d="M27.4,9.553l-3-6A1,1,0,0,0,23.5,3H8.5a1,1,0,0,0-.895.553l-3,6A1,1,0,0,0,5.5,11h21A1,1,0,0,0,27.4,9.553Z"></path><path fill="#0795ff" d="M27,10V24a5,5,0,0,1-5,5H10a5,5,0,0,1-5-5V10A1,1,0,0,1,6,9H26A1,1,0,0,1,27,10Z"></path><path fill="#dfe8f4" d="M26 9H6a3 3 0 00-3 3v2a3.983 3.983 0 007 2.618 3.947 3.947 0 006 0 3.947 3.947 0 006 0A3.983 3.983 0 0029 14V12A3 3 0 0026 9zM21 25v4H11V25a5 5 0 0110 0z"></path></svg>
                        <p className="font-nomal text-gray-500 text-sm">{item?.shopId?.name} Store</p>
                        <button className="flex items-center gap-1 p-1 rounded-md bg-blue-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>
                            <p className="text-[12px]">Chat</p>
                        </button>
                        <button className="flex items-center gap-1 p-1 rounded-md bg-blue-500/20 text-blue-500/60">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>

                            <p className="text-[12px]">Xem shop</p>
                        </button>
                    </div>

                </div>
                <div className='flex flex-col items-center cursor-pointer'>
                    {item?.items?.map((item: any, index: number) => (
                        <div key={index} className='flex items-center justify-between w-full my-2 '>
                            <div className='flex items-center gap-2'>
                                <img src={item?.productPriceId?.id_product[0]?.thumbnails[0]} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                <div>
                                    <p className='font-normal text-[14px]'>{item?.productPriceId?.id_product[0]?.name}</p>
                                    <p className='text-[12px] text-gray-400'>Phân loại hàng : {item?.productPriceId?.id_color?.length > 0 && item?.productPriceId?.id_size?.length > 0 ? item?.productPriceId?.id_color[0]?.value + ' , ' + item?.productPriceId?.id_size[0]?.value : item?.productPriceId?.id_size[0]?.value || item?.productPriceId?.id_color[0]?.value}</p>
                                    <p className='text-[12px]'>x{item?.quantity}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='font-normal text-[14px] text-red-400'>{item?.productPriceId?.price ? formatNumberVnd(item?.productPriceId?.price * item?.quantity) : 0}đ</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-6 border-t border-dashed'>
                    <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                        <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Tổng tiền hàng</p>
                        <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">{formatNumberVnd(item?.subTotal)}đ</p>
                    </div>
                    <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                        <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Phí vận chuyển</p>
                        <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">{formatNumberVnd(28000)}đ</p>
                    </div>
                    <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                        <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Giảm giá phí vận chuyển</p>
                        <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">-{formatNumberVnd(20000)}đ</p>
                    </div>
                    <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                        <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Voucher từ 2T</p>
                        <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">-{formatNumberVnd(0)}đ</p>
                    </div>
                    {item?.coin > 0 && (
                        <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                        <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Xu</p>
                        <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal">-{formatNumberVnd(item?.coin)}đ</p>
                    </div>
                    )}
                    <div className="flex items-end justify-end gap-2 border-b border-gray-200 border-dashed">
                        <p className="w-[80%] border-r border-gray-200 border-dashed py-2 px-1 text-[14px] text-gray-400 text-end font-normal">Thành tiền</p>
                        <p className="w-[20%] py-2 px-1 text-[14px] text-gray-800 text-end font-normal"> {formatNumberVnd(item?.total)}đ</p>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-4">
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-2">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 32 32" id="pay"><g transform="translate(-144 -192)"><path fill="#e9e9e9" d="M215.035,197.452c0,-0.002 0,-0.004 -0,-0.005c-0.203,-2.529 -1.746,-4.442 -3.582,-4.442c-2.284,-0.005 -5.62,-0.005 -7.904,-0.005c-1.838,-0 -3.381,1.914 -3.586,4.444c0,0.002 -0,0.004 -0,0.006c-0.536,7.039 -0.536,14.072 0.003,21.1c0,0.002 0.001,0.004 0.001,0.006c0.204,2.528 1.746,4.439 3.581,4.439c2.283,0.005 5.617,0.005 7.902,0.005c1.84,0 3.384,-1.918 3.586,-4.452c0,-0.002 0,-0.004 0.001,-0.006c0.531,-7.063 0.532,-14.093 -0.002,-21.09Z" transform="matrix(1.38593 0 0 1 -131.579 0)"></path><path fill="#fff" d="M202.459 204.919c.004-.187.009-.373.014-.559.007-.276-.148-.508-.347-.519-.199-.01-.367.205-.374.481-.006.188-.01.376-.015.565-.006.275.15.507.349.515.199.009.366-.208.373-.483zM202.541 202.402c.063-1.508.152-3.015.267-4.523.02-.275-.123-.521-.321-.55-.198-.029-.376.171-.397.445-.116 1.523-.206 3.047-.27 4.57-.011.275.141.512.339.528.199.016.37-.195.382-.47z" transform="matrix(1.38593 0 0 1 -131.579 0)"></path><path fill="#d3d3d3" d="M116.374,193.004c0.706,6.894 0.695,13.82 -0.031,20.779c0,0.002 -0,0.004 -0,0.006c-0.28,2.534 -2.421,4.452 -4.97,4.452c-2.815,-0 -6.777,-0 -9.845,-0.004l0.033,0.313c0,0.002 0,0.004 0.001,0.006c0.283,2.528 2.42,4.439 4.963,4.439c3.164,0.005 7.785,0.005 10.952,0.005c2.549,0 4.69,-1.918 4.97,-4.452c0,-0.002 0,-0.004 0.001,-0.006c0.736,-7.063 0.737,-14.093 -0.002,-21.09c-0,-0.002 -0.001,-0.004 -0.001,-0.005c-0.282,-2.529 -2.419,-4.442 -4.964,-4.442l-1.107,-0.001Z" transform="translate(44)"></path><path fill="#c2c2c2" d="M117.883,193.021c0.278,0.534 0.464,1.126 0.534,1.757c0.001,0.002 0.001,0.004 0.001,0.006c0.739,6.996 0.738,14.026 0.002,21.09c-0.001,0.002 -0.001,0.004 -0.001,0.006c-0.28,2.534 -2.421,4.452 -4.97,4.452c-3.167,-0 -7.788,-0 -10.951,-0.006c-0.135,0 -0.269,-0.005 -0.402,-0.016c0.839,1.607 2.52,2.685 4.429,2.685c3.164,0.005 7.785,0.005 10.952,0.005c2.549,0 4.69,-1.918 4.97,-4.452c0,-0.002 0,-0.004 0.001,-0.006c0.736,-7.063 0.737,-14.093 -0.002,-21.09c-0,-0.002 -0.001,-0.004 -0.001,-0.005c-0.267,-2.395 -2.198,-4.237 -4.562,-4.426Z" transform="translate(44)"></path><path fill="#02bfe8" d="M215.035,197.452c0,-0.002 0,-0.004 -0,-0.005c-0.203,-2.529 -1.746,-4.442 -3.582,-4.442c-2.284,-0.005 -5.62,-0.005 -7.904,-0.005c-1.838,-0 -3.381,1.914 -3.586,4.444c0,0.002 -0,0.004 -0,0.006c-0.536,7.039 -0.536,14.072 0.003,21.1c0,0.002 0.001,0.004 0.001,0.006c0.204,2.528 1.746,4.439 3.581,4.439c2.283,0.005 5.617,0.005 7.902,0.005c1.84,0 3.384,-1.918 3.586,-4.452c0,-0.002 0,-0.004 0.001,-0.006c0.531,-7.063 0.532,-14.093 -0.002,-21.09Zm-1.434,0.214c0.522,6.856 0.521,13.744 0.001,20.665c-0.122,1.519 -1.049,2.669 -2.152,2.669c0,0 0,0 0,0c-2.284,0 -5.617,0 -7.901,-0.005c0,-0 -0,-0 -0.001,-0c-1.1,-0 -2.024,-1.145 -2.147,-2.66c-0.528,-6.885 -0.528,-13.775 -0.003,-20.67c0.123,-1.518 1.049,-2.665 2.151,-2.665c-0,0 -0,0 -0,0c2.284,0 5.619,-0 7.903,0.005c0,0 0.001,0 0.001,0c1.101,0 2.025,1.146 2.148,2.661l-0,0Z" transform="matrix(1.38593 0 0 1 -131.579 0)"></path><path fill="#91ebfe" d="M200.806 199.833c.013-.214.026-.428.04-.641.017-.275-.129-.518-.327-.543-.199-.025-.374.179-.392.454-.014.216-.027.432-.04.648-.017.275.131.516.33.539.198.023.373-.182.389-.457zM200.958 197.598c.147-1.828 1.263-3.211 2.591-3.211 0 0 0 0 0 0 .199 0 .36-.224.36-.5 0-.276-.161-.5-.36-.5 0 0 0 0 0 0-1.695 0-3.12 1.765-3.308 4.1-.022.274.12.522.318.553.198.03.377-.167.399-.442z" transform="matrix(1.38593 0 0 1 -131.579 0)"></path><path fill="#06aed2" d="M120.102,193.748c1.269,0.783 2.167,2.121 2.343,3.699c0,0.001 0.001,0.003 0.001,0.005c0.739,6.997 0.738,14.027 0.002,21.09c-0.001,0.002 -0.001,0.004 -0.001,0.006c-0.28,2.534 -2.421,4.452 -4.97,4.452c-3.167,-0 -7.788,-0 -10.952,-0.005c-2.384,-0 -4.411,-1.68 -4.889,-3.972c0.724,0.447 1.569,0.713 2.468,0.74c0.548,0.751 1.434,1.232 2.421,1.232c0.001,-0 0.002,-0 0.002,-0c3.164,0.005 7.784,0.005 10.95,0.005c-0,0 -0,0 -0,0c1.529,0 2.813,-1.15 2.982,-2.669c0.697,-6.687 0.721,-13.343 0.069,-19.969c-0.088,-1.381 -0.205,-2.761 -0.35,-4.139c-0.001,-0.002 -0.001,-0.004 -0.001,-0.006c-0.018,-0.159 -0.043,-0.315 -0.075,-0.469Z" transform="translate(44)"></path><path fill="#02a5c8" d="M120.971,194.426c0.8,0.782 1.342,1.833 1.474,3.021c0,0.001 0.001,0.003 0.001,0.005c0.739,6.997 0.738,14.027 0.002,21.09c-0.001,0.002 -0.001,0.004 -0.001,0.006c-0.28,2.534 -2.421,4.452 -4.97,4.452c-3.167,-0 -7.788,-0 -10.952,-0.005c-2.089,-0 -3.904,-1.29 -4.643,-3.151c0.905,0.883 2.14,1.421 3.49,1.421c3.164,0.005 7.785,0.005 10.952,0.005c0.645,0 1.265,-0.123 1.835,-0.348c0.715,-0.167 1.336,-0.59 1.755,-1.172c0.749,-0.773 1.254,-1.79 1.38,-2.931c-0,-0.002 -0,-0.004 0,-0.006c0.737,-7.064 0.738,-14.094 -0.001,-21.091c-0.001,-0.002 -0.001,-0.004 -0.001,-0.005c-0.05,-0.453 -0.16,-0.885 -0.321,-1.291Z" transform="translate(44)"></path><path fill="#02a5c8" d="M154,200l4,0c0.552,0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1l-4,0c-0.552,0 -1,0.448 -1,1c-0,0.552 0.448,1 1,1Z" transform="translate(-1 1)"></path><path fill="#02a5c8" d="M156,201l-4,0c-0.552,0 -1,0.448 -1,1c-0,0.552 0.448,1 1,1l4,0c0.552,0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1Z" transform="translate(-1 2)"></path><path fill="#02a5c8" d="M154,198l4,0c0.552,0 1,0.448 1,1c-0,0.552 -0.448,1 -1,1l-4,0c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1Z" transform="matrix(1 0 0 -1 -1 411)"></path><path fill="#02a5c8" d="M156,203l-4,0c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1l4,0c0.552,0 1,0.448 1,1c-0,0.552 -0.448,1 -1,1Z" transform="matrix(1 0 0 -1 -1 410)"></path><ellipse cx="297.001" cy="23" fill="#ffbf00" rx="6.999" ry="7" transform="matrix(1.28584 0 0 1.28571 -215.894 176.429)"></ellipse><path fill="#ffe084" d="M291.15 21.704c.027-.123.058-.244.093-.365.059-.206-.06-.421-.266-.481-.206-.059-.422.06-.482.266-.039.136-.074.274-.104.413-.047.209.086.417.295.463.21.047.418-.086.464-.296zM291.761 20.095c.568-1.023 1.427-1.862 2.465-2.406.19-.1.264-.335.164-.525-.099-.19-.335-.264-.525-.164-1.172.614-2.142 1.562-2.784 2.717-.104.187-.037.424.151.529.187.104.424.036.529-.151z" transform="matrix(1.28584 0 0 1.28571 -215.894 176.429)"></path><path fill="#f0b505" d="M303.128,12.415c2.917,1.747 4.872,4.94 4.872,8.585c-0,5.519 -4.481,10 -10,10c-4.057,-0 -7.553,-2.421 -9.12,-5.896c1.499,0.898 3.253,1.415 5.127,1.415c5.519,-0 10,-4.481 10,-10c0,-1.462 -0.314,-2.851 -0.879,-4.104Z" transform="matrix(.9 0 0 .9 -102.197 187.1)"></path><path fill="#dba400" d="M304.418,13.334c2.189,1.835 3.582,4.589 3.582,7.666c-0,5.519 -4.481,10 -10,10c-3.547,-0 -6.664,-1.85 -8.44,-4.637c1.737,1.456 3.976,2.334 6.419,2.334c5.519,-0 10,-4.481 10,-10c-0,-1.973 -0.573,-3.813 -1.561,-5.363Z" transform="matrix(.9 0 0 .9 -102.197 187.1)"></path><ellipse cx="297.001" cy="23" fill="#ffd34e" rx="6.999" ry="7" transform="matrix(-1.02592 0 0 1.02582 470.703 182.406)"></ellipse><path fill="#facc3f" d="M293.13,27.319c-1.89,-1.46 -3.109,-3.748 -3.109,-6.319c0,-4.404 3.575,-7.979 7.979,-7.979c2.823,0 5.306,1.47 6.724,3.685c-1.347,-1.04 -3.037,-1.66 -4.869,-1.66c-4.404,0 -7.979,3.576 -7.979,7.979c0,1.58 0.461,3.054 1.254,4.294Z" transform="matrix(-.9 0 0 .9 434.203 187.1)"></path><path fill="#ecc140" d="M292.654,26.921c-1.616,-1.461 -2.633,-3.573 -2.633,-5.921c0,-4.404 3.575,-7.979 7.979,-7.979c2.574,0 4.865,1.222 6.324,3.117c-1.415,-1.279 -3.29,-2.058 -5.345,-2.058c-4.404,-0 -7.979,3.575 -7.979,7.979c0,1.829 0.617,3.515 1.654,4.862Z" transform="matrix(-.9 0 0 .9 434.203 187.1)"></path><path fill="#f0b505" d="M165,201.171c-1.165,0.411 -2,1.523 -2,2.829c0,1.657 1.343,3 3,3c0.552,0 1,0.448 1,1c-0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 -0.448,-1 -1,-1c-0.552,0 -1,0.448 -1,1c0,1.306 0.835,2.418 2,2.829l0,0.171c0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1l0,-0.171c1.165,-0.411 2,-1.523 2,-2.829c0,-1.657 -1.343,-3 -3,-3c-0.552,-0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1c-0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1c0,-1.305 -0.835,-2.416 -2,-2.829l-0,-0.171c-0,-0.552 -0.448,-1 -1,-1c-0.552,0 -1,0.448 -1,1l-0,0.171Z" transform="translate(.001)"></path></g></svg>
                       <p className="text-sm font-normal text-gray-400">Phương thức thanh toán</p>
                       </div>
                        <p className="text-sm font-normal">{item?.orderId?.methodPayment}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemDetail;
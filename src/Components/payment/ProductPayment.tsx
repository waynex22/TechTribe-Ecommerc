import { useSelector } from "react-redux";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd";
import VoucherShop from "./VoucherShop";
import { discountPrice } from "src/utils/getMinMax/getMinMaxPrice";
import Shipping from "./Shipping";
interface Props {
    subOrder?: any,
    refecth: () => void;
}

const ProductPayment: React.FC<Props> = ({ subOrder, refecth }) => {
    // console.log(subOrder);

    return (
        <div className="p-4 border border-gray-200 h-fit rounded-lg">
            <div className="flex items-start justify-between">
                <div className="w-[70%]">
                    {subOrder?.listProduct?.map((item: any, index: number) => {
                        return (
                            <>
                                <div key={index}>
                                    <div className="flex items-center gap-2 my-2">
                                        <img
                                            src={`http://localhost:8080/uploads/${item.shopId?.thumbnail}`}
                                            className="object-cover w-[40px] h-[40px] rounded-full"
                                            alt=""
                                        />
                                        <p className="text-sm font-light-medium">{item.shopId?.name}</p>
                                    </div>
                                    {item?.items?.map((item: any, itemIndex: number) => (
                                        <div key={itemIndex} className="flex items-center justify-between p-2 gap-x-2 w-full">
                                            <div className="flex items-center justify-start p-2 gap-x-7 w-[80%]>">
                                                <img
                                                    src={`http://localhost:8080/uploads/${item.productPriceId?.id_product[0]?.thumbnails[0]}`}
                                                    className="object-cover w-[80px] h-[80px] rounded-md"
                                                    alt=""
                                                />
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-light-nomal">
                                                        {item.productPriceId?.id_product[0]?.name}
                                                    </div>
                                                    <span className="text-[12px] font-light text-gray-400">
                                                        {item.productPriceId?.id_color[0]?.value} {item.productPriceId?.id_size[0]?.value ? `, ${item.productPriceId?.id_size[0]?.value}` : ''}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-[20%]">
                                                <div className="flex items-center justify-start relative w-fit gap-2">
                                                    {item.discountDetailId ? (
                                                        <>
                                                            <span className=" text-sm w-fit font-bold">{formatNumberVnd(discountPrice(item.productPriceId?.price * item.quantity, item.discountDetailId?.percent))}</span>
                                                            <div className="text-sm underline font-light-bold ">
                                                                đ
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className=" text-sm w-fit font-bold">{formatNumberVnd(item.productPriceId?.price * item.quantity)}</span>
                                                            <div className="text-sm underline font-light-bold ">
                                                                đ
                                                            </div>
                                                        </>
                                                    )}

                                                </div>
                                                <p className="text-sm uppercase text-gray-500">SL : {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <VoucherShop subOrder={subOrder} itemsSubOrder={item} refecth={refecth} />
                                    <Shipping item={item} />
                                </div>
                            </>
                        )

                    })}

                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-gray-400/10 backdrop-blur-0 rounded-lg">
                    <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="shipping">
                        <path d="M25.24 25.31H13.3a1.25 1.25 0 0 1 0-2.5H25.24a1.25 1.25 0 0 1 0 2.5zM32.12 25.31h-.3a1.25 1.25 0 0 1 0-2.5h.3a.62.62 0 0 0 .63-.62V17.9a.63.63 0 0 0-.48-.61H24.9a3.13 3.13 0 0 1-3.13-3.12V7.47a.61.61 0 0 0-.62-.62H6.42a1.25 1.25 0 0 1 0-2.5H21.15a3.12 3.12 0 0 1 3.12 3.12v6.68a.62.62 0 0 0 .63.62h7.22a3.82 3.82 0 0 1 .68.07l.22.07a3.1 3.1 0 0 1 2.23 3v4.29A3.13 3.13 0 0 1 32.12 25.31z"></path>
                        <path d="M32.55 17.33a1.24 1.24 0 0 1-1.17-.83l-2-5.56a.6.6 0 0 0-.47-.25H23a1.25 1.25 0 0 1 0-2.5h5.91a3.08 3.08 0 0 1 2.7 1.62 1.42 1.42 0 0 1 .08.18l2 5.67a1.26 1.26 0 0 1-.76 1.6A1.54 1.54 0 0 1 32.55 17.33zM28.53 30.65a4.55 4.55 0 1 1 4.55-4.55A4.55 4.55 0 0 1 28.53 30.65zm0-6.6a2.05 2.05 0 1 0 2 2.05A2.05 2.05 0 0 0 28.53 24.05zM10 30.65a4.55 4.55 0 1 1 4.55-4.55A4.55 4.55 0 0 1 10 30.65zm0-6.6a2.05 2.05 0 1 0 2.05 2.05A2.05 2.05 0 0 0 10 24.05z"></path>
                        <path d="M23 25.31a1.24 1.24 0 0 1-1.25-1.25V13.13a1.25 1.25 0 1 1 2.5 0V24.06A1.24 1.24 0 0 1 23 25.31zM10.19 13.17H2a1.25 1.25 0 0 1 0-2.5h8.19a1.25 1.25 0 0 1 0 2.5zM11.73 18.75H7.45a1.25 1.25 0 1 1 0-2.5h4.28a1.25 1.25 0 0 1 0 2.5z"></path>
                    </svg>
                    <p className="text-[12px] font-light-bold text-gray-300">Được giao bởi 2TNow Smart Logistics</p>
                </div>
            </div>
        </div>
    );
}

export default ProductPayment;

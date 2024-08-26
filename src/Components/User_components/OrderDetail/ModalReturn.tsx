import { useState } from "react";
import Spinner from "src/Components/spinner/Spinner";
import requestApi from "src/helper/api";
type Props = {
    items: any;
    openModal: boolean;
    onClose: () => void;
    refecth: () => void;
    setToast: (toast: any) => void;
}
type CustomerId = {
    _id: string;
}

type ItemReturn = {
    productPriceId: string;
    quantity: number;
    discountDetailId?: string;
    returnReason: string;
    refundAmount: number;
    description: string;
    images: string[];
    discount2t?: number;
}
type PayloadReturn = {
    customerId: CustomerId;
    itemsOrderId: string;
    shopId: string;
    itemsReturn: ItemReturn[] | [];
    statusUpdate: { key: string; value: Date }[]
}
const ModalReturn: React.FC<Props> = ({ items, openModal, onClose, refecth, setToast }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PayloadReturn>(
        {
            customerId: items.customerId?._id,
            itemsOrderId: items._id,
            shopId: items.shopId._id,
            itemsReturn: [],
            statusUpdate: []
        }
    );
    const handleGetPriceItem = (productPriceId: string) => {
        const item = items?.items?.find((item: any) => item.productPriceId?._id === productPriceId);
        if (item.discountDetailId) {
            const priceItem = item?.productPriceId?.price - (item?.productPriceId?.price * item?.discountDetailId?.percent) / 100
            return (priceItem * item?.quantity) - (items?.discount2t / items?.items?.length);
        } else {
            return (item?.productPriceId?.price * item?.quantity) - (items?.discount2t / items?.items?.length);
        }
    }
    const handleSelectItemReturn = (productPriceId: string) => {
        setData((prevData: any) => {
            const existingItem = prevData.itemsReturn.find(
                (item: ItemReturn) => item.productPriceId === productPriceId
            );

            if (existingItem) {
                return {
                    ...prevData,
                    itemsReturn: prevData.itemsReturn.filter(
                        (item: ItemReturn) => item.productPriceId !== productPriceId
                    ),
                };
            } else {
                return {
                    ...prevData,
                    itemsReturn: [
                        ...prevData.itemsReturn,
                        {
                            productPriceId,
                            quantity: items?.items?.find((item: any) => item.productPriceId?._id === productPriceId)?.quantity,
                            discountDetailId: items?.items?.find((item: any) => item.productPriceId?._id === productPriceId)?.discountDetailId?._id,
                            returnReason: '',
                            refundAmount: handleGetPriceItem(productPriceId),
                            description: '',
                            images: [],
                            discount2t: items?.discount2t / items?.items?.length
                        },
                    ],
                };
            }
        });
    };
    const returnReasons = [
        { value: 'Hư hỏng, bị lỗi', label: 'Đồ bị lỗi , hỏng hóc' },
        { value: 'Hàng không đúng mẫu', label: 'Hàng không giống mô tả' },
        { value: 'Sai kích cỡ', label: 'Hàng không đúng kích thước , giao sai' },
        { value: 'Khác', label: 'Lý do khác' }
    ];

    const handleDescription = (productPriceId: string, description: string) => {
        setData(prevData => ({
            ...prevData,
            itemsReturn: prevData.itemsReturn.map(item =>
                item.productPriceId === productPriceId
                    ? { ...item, description }
                    : item
            )
        }));
    };
    const handleSelectReason = (productPriceId: string, reason: string) => {
        setData(prevData => ({
            ...prevData,
            itemsReturn: prevData.itemsReturn.map(item =>
                item.productPriceId === productPriceId
                    ? { ...item, returnReason: reason }
                    : item
            )
        }));
    };

    const handleImageUpload = (productPriceId: string, files: FileList) => {
        setData((prevData: any) => ({
            ...prevData,
            itemsReturn: prevData.itemsReturn.map((item: ItemReturn) => {
                if (item.productPriceId === productPriceId) {
                    const existingImages = item.images || [];
                    const newImages = Array.from(files).slice(0, 5 - existingImages.length);
                    if (item.images.length > 0) {
                        setToast({
                            message: 'Tối đa 5 hình ảnh',
                            type: 'success',
                            onClose: () => setToast(null)
                        });
                    }
                    return {
                        ...item,
                        images: [...existingImages, ...newImages],
                    };
                }
                return item;
            })
        }));
    };

    const handleDeleteImage = (productPriceId: string, index: number) => {
        setData(prevData => ({
            ...prevData,
            itemsReturn: prevData.itemsReturn.map(item => {
                if (item.productPriceId === productPriceId) {
                    const updatedImages = item.images.filter((_, i) => i !== index);
                    return { ...item, images: updatedImages };
                }
                return item;
            })
        }));
    };
    const resetData = () => {
        setData(prevData => ({
            ...prevData,
            itemsReturn: []
        }));
    }
    const handleSendReturnOrder = async (payload: any) => {
        await requestApi('return-order', 'POST', payload, 'application/json');
    };
    const handleUploads = async (productPriceId: string) => {
        const item = data.itemsReturn.find((item: any) => item.productPriceId === productPriceId);
        const formData = new FormData();
        data.itemsReturn.forEach((item: any) => {
            if (item.productPriceId === productPriceId && item.images.length > 0) {
                item.images.forEach((image: File) => {
                    formData.append('files', image);
                });
            }
        });
        try {
            const response = await requestApi('upload/files', 'POST', formData, 'multipart/form-data');
            if (item && response.data.filenames) {
                return item.images = response.data.filenames;
            }
        } catch (error) {
            console.error(`Error uploading files for product ${productPriceId}:`, error);
        }
    };

    const handleSubmit = async () => {
        // const checkContent = data.some((item: any) => item.content === '');
        // if (checkContent) {
        //     setToast({
        //         message: 'Vui lòng nhập nội dung đánh giá',
        //         type: 'error',
        //         onClose: () => setToast(null)
        //     });
        //     return;
        // }
        setLoading(true);
        try {
            const promissUploadImages = data.itemsReturn.map((item: any) => handleUploads(item.productPriceId));
            await Promise.all(promissUploadImages);
            await handleSendReturnOrder(data);
            resetData();
            setToast({
                message: 'Đã gửi yêu cầu hoàn hàng',
                type: 'success',
                onClose: () => setToast(null)
            });
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setToast({
                message: 'Đã có lỗi xảy ra vui lòng thử lại sau!',
                type: 'error',
                onClose: () => setToast(null)
            });
        } finally {
            refecth();
            setLoading(false);
            onClose();
        }

    };
    if (!openModal) return null
    return (
        <>
            <Spinner loading={loading} />
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-4 overflow-y-auto max-h-[700px]">
                        <h2>Chọn sản phẩm muốn hoàn trả</h2>
                        {items?.items?.map((item: any, index: number) => (
                            <div key={index}>
                                <div className="flex items-center gap-4 my-5">
                                    <input
                                        onChange={() => handleSelectItemReturn(item?.productPriceId?._id)}
                                        checked={data?.itemsReturn?.some((data: any) => (data.productPriceId == item?.productPriceId?._id)) ? true : false}
                                        type="checkbox"
                                        className="w-5 h-5 focus:ring-0 rounded-md border-solid border-[1px] border-gray-300 checked:bg-secondary transition-all duration-300"
                                    />
                                    <div className="flex items-center gap-2">
                                        {item?.productPriceId?.id_color[0]?.thumbnail ? (
                                            <>
                                                <img src={`http://localhost:8080/uploads/${item?.productPriceId?.id_color[0]?.thumbnail}`} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                            </>
                                        ) : (
                                            <>
                                                <img src={`http://localhost:8080/uploads/${item?.productPriceId?.id_product[0]?.thumbnails[0]}`} alt="" className='w-[82px] h-[82px] rounded-lg' />
                                            </>
                                        )}
                                        <div>
                                            <p className="font-normal text-[14px]">
                                                {item?.productPriceId?.id_product[0]?.name}
                                            </p>
                                            <p className="text-[12px] text-gray-400">
                                                Phân loại hàng :{" "}
                                                {item?.productPriceId?.id_color?.length > 0 &&
                                                    item?.productPriceId?.id_size?.length > 0
                                                    ? item?.productPriceId?.id_color[0]?.value +
                                                    " , " +
                                                    item?.productPriceId?.id_size[0]?.value
                                                    : item?.productPriceId?.id_size[0]?.value ||
                                                    item?.productPriceId?.id_color[0]?.value}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                {data?.itemsReturn?.find((review: any) => review.productPriceId === item.productPriceId._id) && (
                                    <>
                                        <div className="mb-4">
                                            <select
                                                value={data.itemsReturn.find((data: ItemReturn) => data.productPriceId === item.productPriceId._id)?.returnReason || ''}
                                                onChange={(e) => handleSelectReason(item.productPriceId._id, e.target.value)}
                                                className="text-xs w-2/3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="" disabled>
                                                    Vui lòng chọn một lý do
                                                </option>
                                                {returnReasons.map(reason => (
                                                    <option key={reason.value} value={reason.value}>
                                                        {reason.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <textarea
                                                rows={4}
                                                placeholder="Lý do muốn hoàn trả hàng"
                                                className="w-full border text-sm border-gray-300 p-2 rounded"
                                                value={data.itemsReturn.find((description: any) => description.productPriceId === item.productPriceId._id)?.description}
                                                onChange={(e) =>
                                                    handleDescription(
                                                        item.productPriceId._id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="mb-4 flex space-x-2">
                                            <div className="flex space-x-2">
                                                {data.itemsReturn?.find((review: any) => review.productPriceId === item.productPriceId._id)?.images?.map((image: any, index: number) => (
                                                    <>
                                                        {image && (
                                                            <div key={index} className="relative">
                                                                <img
                                                                    src={image ? URL?.createObjectURL(image) : ''}
                                                                    alt={`image-${index}`}
                                                                    className="w-10 h-10 object-cover rounded-md"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteImage(
                                                                            item.productPriceId._id,
                                                                            index
                                                                        )
                                                                    }
                                                                    className="absolute top-[-5px] right-0 text-xs bg-gray-700/10 backdrop-blur-lg text-white px-[3px]"
                                                                >
                                                                    <p className="text-[8px]">X</p>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>

                                                ))}
                                            </div>
                                            <label className="flex items-center cursor-pointer border border-solid border-gray-200 rounded-lg">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleImageUpload(
                                                            item.productPriceId._id,
                                                            e.target.files!
                                                        )
                                                    }
                                                />
                                                <svg className="size-10" xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" viewBox="0 0 96 96" id="image-add"><circle cx="35" cy="31" r="6" stroke="#000" stroke-width="5"></circle><path stroke="#000" stroke-linecap="round" stroke-width="5" d="M68 16L86 16M77 7L77 25M52.5 9H24C15.7157 9 9 15.7157 9 24V71C9 79.2843 15.7157 86 24 86H71C79.2843 86 86 79.2843 86 71V52.5 49.3137C86 47.192 85.1571 45.1571 83.6569 43.6569L79.182 39.182C77.4246 37.4246 74.5754 37.4246 72.818 39.182L51.682 60.318C49.9246 62.0754 47.0754 62.0754 45.318 60.318L39.682 54.682C37.9246 52.9246 35.0754 52.9246 33.318 54.682L11 77"></path></svg>
                                                <p className="text-[10px] text-gray-800">{data.itemsReturn.find((review: any) => review.productPriceId === item.productPriceId._id)?.images?.length ?? 0} / 5</p>
                                            </label>
                                        </div>
                                    </>
                                )}

                            </div>
                        ))}
                        <div className="flex justify-end gap-2 items-center text-sm">
                            <button
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded"
                                onClick={onClose}
                            >
                                Trở Lại
                            </button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-primary/90 hover:bg-primary/70 text-white rounded">
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalReturn;
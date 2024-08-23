import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Spinner from "src/Components/spinner/Spinner";
import requestApi from "src/helper/api";
import { useUpdateItemsOrderMutation } from "src/redux/rtkQuery/order";
import { useUpdateStatusTimeMutation } from "src/redux/rtkQuery/product-review";
interface Props {
    items: any;
    openModal: boolean;
    onClose: () => void;
    refecth: () => void;
    setToast: (toast: any) => void;
}
interface CustomerId {
    _id: string;
}

interface ProductPriceId {
    _id: string;
    id_product: any[];
}
interface PayloadProductReview {
    customerId: CustomerId;
    itemsOrderId: string;
    productId: string;
    productPriceId: ProductPriceId;
    rating: number;
    content: string;
    images: string[];
}
const ModalRating: React.FC<Props> = ({ items, openModal, onClose, refecth, setToast }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PayloadProductReview[]>(
        items.items.map((item: PayloadProductReview) => ({
            customerId: items?.customerId?._id,
            itemsOrderId: items?._id,
            productId: item.productPriceId?.id_product[0]?._id,
            productPriceId: item?.productPriceId?._id,
            rating: 5,
            content: '',
            images: []
        }))
    );
    const [updateItemsOrder] = useUpdateItemsOrderMutation();
    const [updateTime] = useUpdateStatusTimeMutation();
    const handleRatingChange = (productPriceId: string, rating: number) => {
        setData((prevData: any) =>
            prevData.map((item: any) =>
                item.productPriceId === productPriceId ? { ...item, rating } : item
            )
        );
    };

    const handleReviewChange = (productPriceId: string, content: string) => {
        setData((prevData: any) =>
            prevData.map((item: any) =>
                item.productPriceId === productPriceId ? { ...item, content } : item
            )
        );
    };

    const handleImageUpload = (productPriceId: string, files: FileList) => {
        setData((prevData: any) => {
            const updatedData = prevData.map((item: any) => {
                if (item.productPriceId === productPriceId) {
                    const existingImages = item.images || [];
                    const newImages = Array.from(files).slice(0, 5 - existingImages.length);

                    if (existingImages.length + newImages.length > 5) {
                        alert("You can only upload a maximum of 5 images.");
                        return item;
                    }

                    return { ...item, images: [...existingImages, ...newImages] };
                }
                return item;
            });
            return updatedData;
        });
    };

    const handleDeleteImage = (productPriceId: string, index: number) => {
        setData((prevData: any) => {
            const updatedData = prevData.map((item: any) => {
                if (item.productPriceId === productPriceId) {
                    const existingImages = item.images || [];
                    const newImages = [...existingImages];
                    newImages.splice(index, 1);
                    return { ...item, images: newImages };
                }
                return item;
            });
            return updatedData;
        });
    };
    const handleSendRating = async (payload: any) => {
        await requestApi('product-review', 'POST', payload, 'application/json');
    };
    const handleUploads = async (productPriceId: string) => {
        const formData = new FormData();
        data.forEach((item: any) => {
            if (item.productPriceId === productPriceId && item.images.length > 0) {
                item.images.forEach((image: File) => {
                    formData.append('files', image);
                });
            }
        });
        try {
            const response = await requestApi('upload/files', 'POST', formData, 'multipart/form-data');
            const item = data.find((item: any) => item.productPriceId === productPriceId);
            if (item && response.data.filenames) {
                const newPayload = {
                    customerId: item.customerId,
                    itemsOrderId: item.itemsOrderId,
                    productId: item.productId,
                    productPriceId: item.productPriceId,
                    rating: item.rating,
                    content: item.content,
                    images: response.data.filenames,
                }
                handleSendRating(newPayload);
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
            const submitPromises = data.map(async (item: any) => {
                if (item.images.length > 0) {
                    await handleUploads(item.productPriceId);
                } else {
                    await handleSendRating(item);
                }
            });
            await Promise.all(submitPromises);
            setToast({
                message: 'Đánh giá thành công',
                type: 'success',
                onClose: () => setToast(null)
            });
            updateItemsOrder({
                _id: items._id,
                rateDate: true
            });
            updateTime({
                id: items?._id,
                key: 'rateDate',
                value: new Date()
            })
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setToast({
                message: 'Đánh giá thất bại, vui lòng thử lại',
                type: 'error',
                onClose: () => setToast(null)
            });
        } finally {
            refecth();
            setLoading(false);
            onClose();
        }

    };
    const previewRating = (productPriceId: string) => {
        const item = data?.find((item: any) => item.productPriceId === productPriceId);
        if(item?.rating === 5){
            return 'Rất hài lòng 😍'
        }else if(item?.rating === 4){
            return 'Hài lòng 😁'
        }else if(item?.rating === 3){
            return 'Trung bình 😀'
        }else if(item?.rating === 2){
            return 'Không thích 🙁'
        }else if(item?.rating === 1){
            return 'Tệ 😠'
        }
    }
    if (!openModal) return null
    return (
        <>
            <Spinner loading={loading} />
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-4 overflow-y-auto max-h-[700px]">
                    <h2>Đánh giá sản phẩm</h2>
                        {items?.items?.map((item: any, index: number) => (
                            <div key={index}>
                                <div className="my-5">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`http://localhost:8080/uploads/${item?.productPriceId?.id_product[0]?.thumbnails[0]}`}
                                            alt=""
                                            className="w-[82px] h-[82px] rounded-lg"
                                        />
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
                                <div className="mb-4">
                                    <p className="font-normal text-sm">Chất lượng sản phẩm</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((star, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <label key={index}>
                                                    <input
                                                        type="radio"
                                                        name={`rating-${item.productPriceId._id}`}
                                                        value={ratingValue}
                                                        className="hidden"
                                                        onClick={() =>
                                                            handleRatingChange(
                                                                item.productPriceId._id,
                                                                ratingValue
                                                            )
                                                        }
                                                    />
                                                    <FaStar
                                                        size={24}
                                                        className={`cursor-pointer ${ratingValue <=
                                                            (data.find((review: any) => review.productPriceId === item.productPriceId._id)?.rating ?? 0)
                                                            ? "text-yellow-300"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                </label>
                                            );
                                        })}
                                       <p className="text-sm font-normal text-gray-400 ml-3">{previewRating(item.productPriceId._id)}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        rows={4}
                                        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                                        className="w-full border text-sm border-gray-300 p-2 rounded"
                                        value={data.find((review: any) => review.productPriceId === item.productPriceId._id)?.content}
                                        onChange={(e) =>
                                            handleReviewChange(
                                                item.productPriceId._id,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="mb-4 flex space-x-2">
                                <div className="flex space-x-2">
                                    {data.find((review: any) => review.productPriceId === item.productPriceId._id)?.images?.map((image: any, index: number) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
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
                                        <p className="text-[10px] text-gray-800">{data.find((review: any) => review.productPriceId === item.productPriceId._id)?.images?.length ?? 0} / 5</p>
                                    </label>
                                </div>
                                
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
                                Hoàn Thành
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalRating;

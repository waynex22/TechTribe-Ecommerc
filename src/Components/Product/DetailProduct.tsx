import React, { useMemo } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatNumberVnd } from "../../utils/fortmartNumberVnd/index";
import { useGetProductByIdQuery, useGetProductQuery } from "../../redux/rtkQuery/product";
import ProductDetailLoading from "../skeletonLoading/ProductDetailLoading";
import { UpdateCartPayload, useGetCartMeQuery, useUpdateCartMutation } from "../../redux/rtkQuery/cart";
import { useSelector } from "react-redux";
import Toast from "../toast/Toast";
import { ToastProps } from "../../Type";
import { discountPrice, getMinMaxPriceInArr } from "../../utils/getMinMax/getMinMaxPrice";
import ProductItem from "./ProductItem";
import { product } from "src/utils/types/product";
import { useDispatch } from "react-redux";
import { setOpen, setShopSelected } from "src/redux/slices/chatSlice";
import Review from "../Review";
import { useGetShopQuery } from "src/redux/rtkQuery/shop";
const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const [updateCart] = useUpdateCartMutation();
  const { cart } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.auth);
  const { refetch } = useGetCartMeQuery(user?.sub);
  const { data: products } = useGetProductQuery();
  const { data: product, isLoading } = useGetProductByIdQuery(`${slug}`);
  const { data: shop , isLoading: isLoadingShop} = useGetShopQuery(product?.id_shop[0]?._id);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [indexThumbnail, setIndexThumbnail] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const handleSetToast = (toast: any) => {
    setToast({ ...toast, message: toast.message, type: toast.type, onClose: () => setToast(null) });
  }
  const increment = () => {
    if (quantity + 1 > ProductPriceSelected?.stock || !ProductPriceSelected || ProductPriceSelected.stock === 0) return
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const ProductPriceSelected = product?.product_price?.find((item: any) => {
    if (selectedColor && selectedSize) {
      return item.id_color[0]?._id === selectedColor && item.id_size[0]._id === selectedSize;
    } else if (item.id_color.length === 0 && item.id_size.length !== 0 && selectedSize) {
      return item.id_size[0]._id === selectedSize;
    } else if (item.id_color.length !== 0 && item.id_size.length === 0 && selectedColor) {
      return item.id_color[0]?._id === selectedColor;
    }
  })
  const isOnStock = (colorId: any, sizeId: any) => {
    if (!colorId) return true;
    if (!sizeId) {
      return product?.product_price.some((item: any) =>
        item.id_color[0]?._id === colorId && item.stock > 0
      );
    }
    const productPrice = product?.product_price.find((item: any) => {
      return (
        item.id_color[0]?._id === colorId && item.id_size[0]?._id === sizeId
      );
    });
    return productPrice ? productPrice.stock > 0 : false;
  };
  const listProductLikeCategory = useMemo(() => {
    return products?.filter((item: product) =>
      item.id_categoryDetail[0].name === product?.id_categoryDetail[0].name && item._id !== product?._id
    );
  }, [products, product]);
  const isDiscount: any = product?.discount?.find((item: any) => item.id_productPrice == ProductPriceSelected?._id);
  const handleAddProductToCart = async (customerId: string, quantity: number) => {
    if (!user) {
      handleSetToast({ message: 'Bạn cần đăng nhập để thực hiện', type: "error" });
      return
    };
    if (!ProductPriceSelected) {
      handleSetToast({ message: 'Bạn cần chọn loại', type: "error" });
      return
    };
    if (ProductPriceSelected?.stock === 0) {
      handleSetToast({ message: 'Kho sản phẩm đã hết!', type: "error" });
      return
    }
    if (isDiscount) {
      const listItemsInCart = cart?.cart?.cartItems?.flatMap((item: any) => item.items) || [];
      const itemInCart = listItemsInCart.find((item: any) => item.productPriceId._id === ProductPriceSelected?._id);
      if (itemInCart) {
        if (isDiscount.limit_customer !== "Không giới hạn") {
          const checkQuantityLimit = itemInCart.quantity + quantity > isDiscount.limit_customer;
          if (checkQuantityLimit) {
            handleSetToast({ message: `Chương trình giới hạn và bạn chỉ còn có thể thêm tối đa (${isDiscount.limit_customer - itemInCart.quantity}) sản phẩm vào giỏ hàng!`, type: "error" });
            return
          }
        }
      }
    }
    const payload: UpdateCartPayload = {
      shopId: product?.id_shop[0]._id,
      customerId: customerId,
      items: {
        productPriceId: ProductPriceSelected?._id,
        quantity: quantity,
        discountDetailId: isDiscount?._id
      }
    }
    if (payload) {
      try {
        const result: any = await updateCart(payload).unwrap();
        if (result?.status === 299) {
          handleSetToast({ message: `Giỏ hàng đã có và bạn chỉ còn có thể thêm (${result?.count}) sản phẩm`, type: "success" });
          return
        } else {
          refetch();
          handleSetToast({ message: 'Thêm vào giỏ hàng thành công', type: "success" });
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  }
  const handleChatClick = (shopId: string, shopName: string) => {
    if (!user) {
      handleSetToast({ message: 'Bạn cần đăng nhập để chat', type: "error" });
    } else {
      dispatch(setShopSelected({ shopId, shopName }));
      dispatch(setOpen(true));
    }
  };
  if (isLoading) return <ProductDetailLoading />;
  const minMaxPrice = getMinMaxPriceInArr(product?.product_price);
  const renderPrice = (price: number, discountedPrice: number) => (
    <>
      <span className="text-[24px] w-fit font-bold">{formatNumberVnd(discountedPrice || price)}</span>
      {discountedPrice && (
        <span className="text-sm text-gray-400 absolute top-8">
          <del>{formatNumberVnd(price)}đ</del>
        </span>
      )}
    </>
  );

  const renderPriceRange = (minPrice: number, maxPrice: number, discountMinPrice: number, discountMaxPrice: number) => (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-start relative w-fit">
        <span className="text-[24px] w-fit font-bold">
          {formatNumberVnd(discountMinPrice || minPrice)}
        </span>
        <div className="text-lg absolute right-[-16px] top-[-6px]">
          đ
        </div>
        {product?.valuePriceDiscount && (
          <div className="text-sm text-gray-400 absolute top-8 flex gap-2">
            <del>{formatNumberVnd(minMaxPrice.min)}đ</del>
            <span>-</span>
            <del>{formatNumberVnd(minMaxPrice.max)}đ</del>
          </div>
        )}
      </div>
      {minPrice !== maxPrice && (
        <>
          <div className="">-</div>
          <span className="text-[24px] w-fit font-bold">
            {formatNumberVnd(discountMaxPrice || maxPrice)}
          </span>

        </>
      )}
    </div>
  );
  const discountedPrice: any = isDiscount ? discountPrice(ProductPriceSelected.price, isDiscount.percent) : null;
  console.log(shop);
  
  return (
    <>
      <div className="container mx-auto">
        {toast && <Toast message={toast.message} type={toast.type} onClose={toast.onClose} />}
        <div className="grid lg:grid-cols-7 md:grid-col-2 gap-6">
          <div className="col-span-2 ">
            <div className=" bg-white h-fit rounded-lg">
              <div className="p-4 ">
                <img
                  src={product?.thumbnails[indexThumbnail]}
                  alt=""
                  className="border-solid border-[1px] border-gray-200 rounded-lg w-[368px] h-[368px] object-cover"
                />
                <div className="flex space-x-2 mt-2">
                  {product?.thumbnails.map((item: string, index: number) => (
                    <div key={index} className={`${indexThumbnail === index ? 'border-solid border-[1px] border-blue-500 rounded-lg' : ''}border-solid border-[1px] cursor-pointer border-gray-200 rounded-sm p-1`}>
                      <img
                        onClick={() => setIndexThumbnail(index)}
                        src={item}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-12 h-12 object-cover "
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">Đặc điểm nổi bật</h3>
                  <div className="my-2 flex">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                      className="w-6 h-6 object-cover"
                      alt=""
                    />
                    <span className="ml-3 font-light text-sm">
                      Sản phẩm hót
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 overflow-y-auto overflow-x-hidden">
            <div className="p-4  bg-white h-fit rounded-lg">
              <div className="flex items-center justify-start gap-4">
                <img
                  src="https://salt.tikicdn.com/ts/upload/94/36/e7/c5297f3fad0a83fb56f98be877904467.png"
                  className="w-[94px] h-[20px] object-cover"
                  alt=""
                />
                <img
                  src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                  className="w-[94px] h-[20px] object-cover"
                  alt=""
                />
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[14px]">Thương hiệu : </p>
                  <span className="text-blue-500 text-sm font-light">
                    No brand
                  </span>
                </div>
              </div>
              <div className="my-4">
                <h3 className="font-light-bold text-lg">
                  {product?.name}
                </h3>
              </div>
              <div className="my-4 flex items-center justify-start gap-2">
                <p className="font-semibold text-sm">{product?.rating}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => {
                    const rating = product?.rating || 0;
                    const isHalfStar = rating - index > 0 && rating - index < 1;

                    return (
                      <svg
                        key={index}
                        stroke="currentColor"
                        fill={index < Math.floor(rating) ? "#FFC400" : isHalfStar ? "url(#half)" : "#E4E8EE"}
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {isHalfStar && (
                          <defs>
                            <linearGradient id="half">
                              <stop offset="50%" stopColor="#FFC400" />
                              <stop offset="50%" stopColor="#E4E8EE" />
                            </linearGradient>
                          </defs>
                        )}
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                    );
                  })}
                </div>
                <div className="w-[1px] h-5 bg-gray-300"></div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-light text-sm text-gray-400">Đã bán : </p>
                  <span className="text-blue-400 text-sm font-light">485</span>
                </div>
              </div>
              <div className="my-4 text-red-500 gap-2">
                <div className="flex items-center justify-start relative w-fit">
                  {ProductPriceSelected ? (
                    isDiscount ? (
                      renderPrice(ProductPriceSelected.price, discountedPrice)
                    ) : (
                      <span className="text-[24px] w-fit font-bold">{formatNumberVnd(ProductPriceSelected.price)}</span>
                    )
                  ) : (
                    renderPriceRange(minMaxPrice.min, minMaxPrice.max, product?.valuePriceDiscount?.minPrice, product?.valuePriceDiscount?.maxPrice)
                  )}
                  {isDiscount && (
                    <div className="absolute text-gray-700 font-light-bold text-sm bg-gray-200 p-1 rounded-3xl right-[-70px]">
                      -{isDiscount?.percent}%
                    </div>
                  )}
                  <div className="text-lg absolute right-[-16px] top-[-6px]">
                    đ
                  </div>
                </div>
              </div>
              {product?.variation_color ? (
                <div className="mb-4">
                  <p className="font-semibold text-sm text-gray-700">Màu sắc</p>
                  <div className="flex gap-2 mt-2 ">
                    {product?.variation_color.map((color: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => setSelectedColor(color._id)}
                        className={`px-1 border rounded-lg cursor-pointer relative w-[100px] py-2 flex items-center justify-around ${selectedColor === color._id
                          ? "border-blue-600 border-2"
                          : "border-gray-200"
                          } ${!isOnStock(color._id, selectedSize) ? "opacity-30" : ""}`}
                      >
                        {selectedColor === color._id && (
                          <div className="absolute top-[-1px] right-0">
                            <img
                              src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                              alt="Selected"
                              className="w-[13px] h-[13px]"
                            />
                          </div>
                        )}
                        <p className="text-sm">{color.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {product?.variation_size?.length !== 0 ? (
                <div>
                  <p className="font-semibold text-sm text-gray-800">Kích cỡ</p>
                  <div className="mt-2 flex items-center gap-4">
                    {product?.variation_size?.map((size: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => setSelectedSize(size._id)}
                        className={` border rounded-lg cursor-pointer relative py-2 px-3 w-[50px] flex items-center justify-center  ${selectedSize === size._id
                          ? "border-blue-600 border-2"
                          : "border-gray-200"
                          } ${isOnStock(size._id, selectedColor) ? "opacity-30" : ""}`}
                      >
                        {selectedSize === size._id && (
                          <div className="absolute top-[-1px] right-0">
                            <img
                              src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                              alt="Selected"
                              className="w-[13px] h-[13px]"
                            />
                          </div>
                        )}
                        <p className="text-sm">{size.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg">
              <h3>Vận chuyển</h3>
              <div className="flex items-center gap-2 my-2">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-light">Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/baa823ac1c58392c2031.svg"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-light my-2">Vận chuyển tới</span>
                <span className="text-sm font-light my-2 text-primary">
                  Thanh Khê , Đà Nẵng
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-light my-2">Phí vận chuyển</span>
                <div className="flex items-center text-gray-600 underline justify-start relative w-fit">
                  <span className=" text-sm w-fit  font-light">0</span>
                  <div className="text-sm font-light absolute right-[-12px] top-[-6px]">
                    đ
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg">
              <h3>Chính sách mua hàng</h3>
              <div className="flex items-center justify-start gap-4 my-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-thin">
                  Được đồng kiểm khi nhận hàng
                </span>
              </div>
              <div className="flex items-center justify-start gap-4 my-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-thin">
                  Được hoàn tiền lên tới 200% khi hàng giả
                </span>
              </div>
              <div className="flex items-center justify-start gap-4 my-2">
                <img
                  src="https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png"
                  className="w-6 h-6 object-cover"
                  alt=""
                />
                <span className="text-sm font-thin">
                  Chính sách đổi trả hàng trong 30 ngày !
                </span>
              </div>
            </div>
            <div>
              <div className="p-4 mt-4 bg-white rounded-lg">
                <h3>Thông tin chi tiết</h3>
                {product && product?.product_specifications?.map((specification: any, index: number) => (
                  <>
                    <div key={index} className="flex flex-1 items-center justify-start gap-4 my-2">
                      <p className="w-[50%] font-normal text-sm text-gray-500">{specification.id_specifications.name}</p>
                      <p className="w-[50%] text-sm text-gray-800">{specification.id_specifications_detail.name}</p>
                    </div>
                    <div className="h-[1px] w-full bg-gray-300"></div>
                  </>
                ))}
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg">
              <h3>Mô tả sản phẩm</h3>
              <div className="text-sm font-light text-gray-600" dangerouslySetInnerHTML={{ __html: product?.description ?? '' }} />
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg">
              <h3>Sản phẩm tương tự</h3>
              <div className="grid md:grid-cols-4 lg:grid-cols-3 gap-4 items-center mt-2">
                {listProductLikeCategory?.slice(0, 6).map((item: any, index: number) => (
                  <ProductItem product={item} key={index} />
                ))}
              </div>
            </div>
           
          </div>
          <div className="col-span-2 bg-white h-fit rounded-lg">
            <div className="p-4">
              <div className="flex gap-4 ">
                <img
                  src={product?.id_shop[0]?.thumbnail}
                  alt=""
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div className="flex flex-col ">
                  <span className="font-light-bold">{product?.id_shop[0]?.name}</span>
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png.webp"
                      className="object-cover h-4 w-14"
                      alt=""
                    />
                    <div className="w-[1px] py-2 bg-gray-200"></div>

                    <span className="text-sm">{product?.id_shop[0]?.star}</span>
                    <span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        color="#FFC400"
                        className="w-4 h-4 font-bold"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-light">Người theo dõi : </span>
                      <span className="text-sm font-light-bold text-primary">
                        {shop?.follows?.length || 0}
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="flex items-center justify-start gap-4">
                      <div onClick={() => handleChatClick(product?.id_shop[0]?._id, product?.id_shop[0]?.name)} className="w-[100px] cursor-pointer h-[30px] bg-transparent border-2 flex items-center border-primary rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mx-2 w-4 h-4 text-primary"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                        <p className="text-[12px] font-light-bold text-primary">
                          Chat Ngay
                        </p>
                      </div>
                      <Link
                        to={`/shop/${product?.id_shop[0]?._id}`}
                        className="w-[100px] h-[30px] bg-transparent border-2 flex items-center border-gray-400 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4 mx-2 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                          />
                        </svg>

                        <p className="text-[12px] font-light-bold text-gray-400">
                          Xem Shop
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[0.1px] bg-gray-200 my-2"></div>
              {ProductPriceSelected && (
                <div className="flex items-center gap-4">
                  <img
                    className="w-14 h-14 object-cover"
                    src={product?.thumbnails[0]}
                    alt=""
                  />
                    <div className="flex items-center gap-2">
                      <span className="text-md font-light-bold">{ProductPriceSelected?.id_color[0]?.value}</span>
                      {selectedSize && selectedColor && (
                        <>,</>
                      )}
                      <span className="text-md font-light-bold">{ProductPriceSelected?.id_size[0]?.value}</span>
                    </div>

                  <div className="flex items-start justify-normal gap-2">

                  </div>
                </div>
              )}
              <div className="my-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-gray-900">Số lượng</p>
                  {ProductPriceSelected && <p className="text-[12px] text-red-500">Còn lại : {ProductPriceSelected?.stock}</p>}
                </div>
                <div className="flex items-center space-x-2 my-2 mb-4">
                  <button
                    onClick={decrement}
                    className={`px-3 py-1 text-center border rounded ${quantity <= 1 ? "border-gray-200 text-gray-300" : "border-gray-500 text-gray-500"
                      }`}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 py-1 text-center border border-gray-500 rounded"
                  />
                  <button
                    onClick={increment}
                    className="px-3 py-1 border  border-gray-500 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-600">Tạm tính</div>
                <div className="my-2 text-black gap-2">
                  {ProductPriceSelected && (
                    <div className="flex items-center justify-start relative w-fit">
                      <span className=" text-[24px] w-fit font-bold">
                        {ProductPriceSelected && !isDiscount ? formatNumberVnd(ProductPriceSelected?.price * quantity) : formatNumberVnd(quantity * (ProductPriceSelected.price - (ProductPriceSelected?.price * isDiscount?.percent / 100)))}
                      </span>
                      <div className="text-lg absolute right-[-16px] top-[-6px]">
                        đ
                      </div>
                    </div>
                  )}
                </div>
                <div onClick={() => handleAddProductToCart(user?.sub, quantity)} className="bg-red-500 rounded-md mt-5 p-4 text-center cursor-pointer">
                  <span className="text-white text-md font-light-bold">Thêm vào giỏ </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[71%]">
        <Review  product={product}/>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;

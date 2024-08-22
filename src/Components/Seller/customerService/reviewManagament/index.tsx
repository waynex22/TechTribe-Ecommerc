import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { useAppSelector } from '../../../../redux/hook'
import { SelectProductByIdShop } from '../../../../redux/features/product'

const ReviewManagamentComponent: React.FC = () => {
  const products = useAppSelector(SelectProductByIdShop)
  return (
    <div className=' flex flex-col gap-6'>
      <div className=' p-6 bg-white rounded shadow-md font-normal'>
        <div className='pb-4'>
          <h4 className=' text-xl py-1 '>Đánh Giá Shop
            <span className='pl-2 text-2xl text-primary'> {((5 * 5 + 4 * 7 + 3 * 4 + 2 * 1 + 1 * 3) / 20)} </span>
            <span className=' text-gray-600 text-lg'>/5</span>
          </h4>
        </div>
        <div className=' w-[770px]'>
          <div className=' py-4 px-6 grid grid-cols-3 gap-2 border rounded'>
            <div className=' border-r'>
              <p className=' text-sm text-gray-600'>Tổng lượt đánh giá</p>
              <p className=' pt-2 text-xl'>20</p>
            </div>
            <div className=' border-r  px-4'>
              <p className=' text-sm text-gray-600'>Tỷ lệ đánh giá đơn hàng</p>
              <p className=' pt-2 text-xl'>80%</p>
            </div>
            <div className='  px-4'>
              <p className=' text-sm text-gray-600'>Tỷ lệ đánh giá tốt</p>
              <p className=' pt-2 text-xl'> 75% </p>
            </div>
          </div>
          <div className=' py-4 px-6 grid grid-cols-2 gap-2 border rounded my-4'>
            <div className=' border-r'>
              <p className=' text-sm text-gray-600'>Đánh giá tiêu cực cần phản hồi</p>
              <p className=' pt-2 text-xl flex items-center gap-2'>4 <span className=' pl-2 text-primary text-base cursor-pointer flex gap-2 items-center'>Xem <FaAngleRight /></span></p>
            </div>
            <div className='  px-4'>
              <p className=' text-sm text-gray-600'>Đánh giá gần đây</p>
              <p className=' pt-2 text-xl flex items-center gap-2'>4 <span className=' pl-2 text-primary text-base cursor-pointer flex gap-2 items-center'>Xem <FaAngleRight /></span></p>
            </div>
          </div>
        </div>
      </div>
      <div className=' p-6 bg-white rounded shadow-md font-normal'>
        <div className=' py-2'>
          <h4 className=' text-xl py-1 '>Danh sách đánh giá shop</h4>
        </div>
        <div className=' flex gap-6 items-center py-2'>
          <p className=' text-gray-600'> Số sao đánh giá</p>
          <div className=' flex gap-2 items-center'>
            <input type="checkbox" checked name="star" id="star_all" />
            <label htmlFor="star_all">Tất cả</label>
          </div>
          <div className=' flex gap-2 items-center'>
            <input type="checkbox" checked name="star" id="star_5" />
            <label htmlFor="star_5"> 5 Sao (5)</label>
          </div>
          <div className=' flex gap-2 items-center'>
            <input type="checkbox" checked name="star" id="star_4" />
            <label htmlFor="star_4"> 4 Sao (7)</label>
          </div>
          <div className=' flex gap-2 items-center'>
            <input type="checkbox" checked name="star" id="star_3" />
            <label htmlFor="star_3">3 Sao (4)</label>
          </div>
          <div className=' flex gap-2 items-center'>
            <input type="checkbox" checked name="star" id="star_2" />
            <label htmlFor="star_2"> 2 Sao (1)</label>
          </div>
          <div className=' flex gap-2 items-center'>
            <input type="checkbox" checked name="star" id="star_1" />
            <label htmlFor="star_1"> 1 Sao (3)</label>
          </div>
        </div>
        <div className=' py-2 my-4 text-sm'>
          <div className=' flex items-center'>
            <div className=' border rounded flex items-center'>
              <div className='  py-1 px-4   w-[120px] flex items-center justify-between border-r'>
                <p>Tìm yêu cầu</p>
              </div>
              <div className=' py-1  px-4 '>
                <input type="text" className=' w-[250px]' placeholder=' Tên sản phẩm/Mã đơn hàng' />
              </div>
            </div>
            <div className=' ml-4 text-xl'>
              <IoSearch />
            </div>
          </div>
        </div>
        <div className='my-4 text-sm flex flex-col gap-4'>
          <div className=' bg-gray-100 p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
            <p className=' text-center'>Thông tin Sản phẩm</p>
            <p className=' col-span-2 text-center'>Đánh giá của Người mua</p>
            <p className=' text-center'>Thao tác</p>
          </div>


          <div className=' border rounded'>
            <div className=' p-2 border-b flex  items-center bg-gray-50 rounded-t text-sm'>
              <div className=' flex items-center gap-2 border-r'>
                <img className=' w-7 h-7 object-cover rounded-full' src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6.jpg" alt="" />
                <p className=' w-[100px] truncate'> Luffy Toro </p>
              </div>
              <div className=' px-4'>
                <p>Mã đơn hàng: <span className=' uppercase'>66a770e494cb9b1b5a9142df</span></p>
              </div>
            </div>
            <div className=' p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
              <div className=' border-r'>
                <div className=' flex gap-2'>
                  <div className=' w-12 items-center'>
                    <img src={products[0].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                  </div>
                  <div className=' flex-1 pr-4'>
                    <div className=' flex justify-between items-center'>
                      <p className=' max-w-[200px] truncate font-semibold'> {products[0].name} </p>
                    </div>
                    <p className=' text-gray-600 pt-1 text-xs flex gap-1'>
                      <span>{products[0].product_price[0].id_color[0].value},</span>
                      <span>{products[0].product_price[0].id_size[0].value}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=' col-span-2 border-r py-2 flex flex-col gap-2'>
                <div className=' flex text-lg gap-1'>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                </div>
                <p>Sản phẩm phù hợp giá tiền</p>
                <div>
                  <img src="https://cdn-i.vtcnews.vn/resize-v1/nA9AgdK0wJxojinUSIKGDillc7YcVsM8ELMpl4MEfso/files/nhat.linh/2018/04/04/hinh-chup-goi-hang-gui-di-15404210.jpg" className=' w-20' alt="" />
                </div>
              </div>
              <div className=' flex h-full w-full items-center justify-center text-center px-4'>
                <p className=' cursor-pointer px-4 py-2 rounded border'>Trả lời</p>
              </div>
            </div>
          </div>
          <div className=' border rounded'>
            <div className=' p-2 border-b flex  items-center bg-gray-50 rounded-t text-sm'>
              <div className=' flex items-center gap-2 border-r'>
                <img className=' w-7 h-7 object-cover rounded-full' src="https://imageio.forbes.com/specials-images/imageserve/653fcd49893eb27774ba7ecc/65th-GRAMMY-Awards---Arrivals/960x0.jpg?format=jpg&wMãth=960" alt="" />
                <p className=' w-[100px] truncate'> Taylor Swift </p>
              </div>
              <div className=' px-4'>
                <p>Mã đơn hàng: <span className=' uppercase'>66a770f294cb9b1b5a9142e4</span></p>
              </div>
            </div>
            <div className=' p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
              <div className=' border-r'>
                <div className=' flex gap-2'>
                  <div className=' w-12 items-center'>
                    <img src={products[1].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                  </div>
                  <div className=' flex-1 pr-4'>
                    <div className=' flex justify-between items-center'>
                      <p className=' max-w-[200px] truncate font-semibold'>{products[1].name}</p>
                    </div>
                    <p className=' text-gray-600 pt-1 text-xs'>
                      <span>{products[1].product_price[0].id_color[0] && products[1].product_price[0].id_color[0].value},</span>
                      <span>{products[1].product_price[0].id_size[0] && products[1].product_price[0].id_size[0].value}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=' col-span-2 border-r py-2 flex flex-col gap-2'>
                <div className=' flex text-lg gap-1'>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStarBorder /></p>
                </div>
                <p>Sản phẩm không có gì để chê</p>
                <div>
                  <img src="https://lh3.googleusercontent.com/proxy/npcy9CtIYDLHqcDhnly5TFgFyg6W5JAcHM6Czm4qNm9F8GFtx2zajzj5OGF8GtMakdJvOAimtoY1ddgIDO9OsAG7YdeXK2Gk1uNTFwDr8yG-Cc7ocEiz" className=' w-20' alt="" />
                </div>
              </div>
              <div className=' flex h-full w-full items-center justify-center text-center px-4'>
                <p className=' cursor-pointer px-4 py-2 rounded border'>Trả lời</p>
              </div>
            </div>
          </div>
          <div className=' border rounded'>
            <div className=' p-2 border-b flex  items-center bg-gray-50 rounded-t text-sm'>
              <div className=' flex items-center gap-2 border-r'>
                <img className=' w-7 h-7 object-cover rounded-full' src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/11/19/766929/Lisa-Plo_Rdyz.jpg" alt="" />
                <p className=' w-[100px] truncate'>Lisa</p>
              </div>
              <div className=' px-4'>
                <p>Mã đơn hàng: <span className=' uppercase'>66a770e494cb9b512a91422f</span></p>
              </div>
            </div>
            <div className=' p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
              <div className=' border-r'>
                <div className=' flex gap-2'>
                  <div className=' w-12 items-center'>
                    <img src={products[5].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                  </div>
                  <div className=' flex-1 pr-4'>
                    <div className=' flex justify-between items-center'>
                      <p className=' max-w-[200px] truncate font-semibold'>{products[5].name}</p>
                    </div>
                    <p className=' text-gray-600 pt-1 text-xs flex gap-1'>
                      <span>{products[5].product_price[0].id_color[0] && products[5].product_price[0].id_color[0].value},</span>
                      <span>{products[5].product_price[0].id_size[0] && products[5].product_price[0].id_size[0].value}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=' col-span-2 border-r py-2 flex flex-col gap-2'>
                <div className=' flex text-lg gap-1'>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStarBorder /></p>
                  <p className=' text-yellow-500'><MdStarBorder /></p>
                  <p className=' text-yellow-500'><MdStarBorder /></p>
                  <p className=' text-yellow-500'><MdStarBorder /></p>
                </div>
                <p>Giao hàng không giống với mô tả, khác màu</p>
              </div>
              <div className=' flex h-full w-full items-center justify-center text-center px-4'>
                <p className=' cursor-pointer px-4 py-2 rounded border'>Trả lời</p>
              </div>
            </div>
          </div>
          <div className=' border rounded'>
            <div className=' p-2 border-b flex  items-center bg-gray-50 rounded-t text-sm'>
              <div className=' flex items-center gap-2 border-r'>
                <img className=' w-7 h-7 object-cover rounded-full' src="https://yt3.googleusercontent.com/AugJzlEtKQKJ6AKtiOuTzVcmf4jz-vfTuKdUT4Wul9SnjeWh58KguJdzc9NVf4xYTTbqnk76=s900-c-k-c0x00ffffff-no-rj" alt="" />
                <p className=' w-[100px] truncate'>Laddy Gaga </p>
              </div>
              <div className=' px-4'>
                <p>Mã đơn hàng: <span className=' uppercase'>66a248c570b52ad7a0590dbc</span></p>
              </div>
            </div>
            <div className=' p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
              <div className=' border-r'>
                <div className=' flex gap-2'>
                  <div className=' w-12 items-center'>
                    <img src={products[2].thumbnails[0]} className='w-12 h-12 rounded' alt="" />
                  </div>
                  <div className=' flex-1 pr-4'>
                    <div className=' flex justify-between items-center'>
                      <p className=' max-w-[200px] truncate font-semibold'>{products[2].name}</p>
                    </div>
                    <p className=' text-gray-600 pt-1 text-xs'>
                      <span>{products[2].product_price[0].id_color[0] && products[2].product_price[0].id_color[0].value},</span>
                      <span>{products[2].product_price[0].id_size[0] && products[2].product_price[0].id_size[0].value}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=' col-span-2 border-r py-2 flex flex-col gap-2'>
                <div className=' flex text-lg gap-1'>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                  <p className=' text-yellow-500'><MdStar /></p>
                </div>
                <p>Sản phẩm phù hợp giá tiền</p>
              </div>
              <div className=' flex h-full w-full items-center justify-center text-center px-4'>
                <p className=' cursor-pointer px-4 py-2 rounded border'>Trả lời</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReviewManagamentComponent
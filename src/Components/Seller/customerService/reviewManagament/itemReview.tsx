import { SendMessage } from '../../../../services/messenge';
import { typeProductReview } from '../../../../utils/types/productReviewSeller'
import { MdOutlineMessage, MdStar, MdStarBorder } from 'react-icons/md'
import { MessageContex } from '../../messageProvider';
import { useContext, useState } from 'react';
import { formatShowDate } from '../../../../utils/fortmartNumberVnd/formartDate';
import Popup from '../../../../Page/popup/popup';
import ReplyReviewComponent from './ReplyReview';

const ItemReviewComponent = ({ itemReview }: { itemReview: typeProductReview }) => {
  const { setShowRoomChat } = useContext(MessageContex)
  const [isShowPopup, setIsShopPopup] = useState(false)

  const handleShowPopup = () => {
    setIsShopPopup(!isShowPopup)
  }
  const handleSendMess = async () => {
    const dataSendMess = {
      id_customer: itemReview.customerId._id,
      id_product: itemReview.productId._id
    };
    SendMessage(dataSendMess)
      .then((data) => {
        setShowRoomChat(data.data.id_roomChat)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <div className=' border rounded'>
        <div className=' p-2 border-b flex  items-center bg-gray-50 rounded-t text-sm'>
          <div className=' flex items-center gap-2 border-r'>
            <img className=' w-7 h-7 object-cover rounded-full' src={`${itemReview.customerId.avata}`} alt="" />
            <div className=' w-[240px] flex gap-2 items-center'>
              <p className=' max-w-[200px] truncate'>{itemReview.customerId.name}</p>
              <p onClick={() => handleSendMess()} className=' text-lg cursor-pointer'><MdOutlineMessage /></p>
            </div>

          </div>
          <div className=' px-4 font-normal'>
            <p >Mã sản phẩm: <span className=' uppercase'> {itemReview.productId._id} </span></p>
          </div>
        </div>
        <div className=' p-2 rounded px-4 grid grid-cols-4 gap-4 text-gray-600'>
          <div className=' border-r'>
            <div className=' flex gap-2'>
              <div className=' w-12 items-center'>
                <img src={itemReview.productId.thumbnails[0]} className='w-12 h-12 rounded' alt="" />
              </div>
              <div className=' flex-1 pr-4'>
                <div className=' flex justify-between items-center'>
                  <p className=' max-w-[200px] truncate font-semibold'> {itemReview.productId.name} </p>
                </div>
                <p className=' text-gray-600 pt-1 text-xs flex gap-1'>
                  {itemReview.productPriceId.id_color[0]?.value}
                  {itemReview.productPriceId.id_color[0] && itemReview.productPriceId.id_size[0] && ', '}
                  {itemReview.productPriceId.id_size[0]?.value}
                </p>
              </div>
            </div>
          </div>
          <div className=' col-span-2 border-r py-2 flex flex-col gap-2'>
             
            <div className=' text-xl'>
              <ShowStarReview itemReview={itemReview} />
            </div>

            <p> {itemReview.content && itemReview.content} </p>
            <div className=' flex gap-2 flex-wrap'>
              {itemReview.images && itemReview.images.length > 0 &&
                itemReview.images.map((image, index) => {
                  return <img key={index} src={image} className=' w-20 object-cover h-20' alt="" />
                })
              }
            </div>
            <div className=' flex flex-row-reverse px-4'>
              <p className=' text-xs text-gray-600'> {formatShowDate(itemReview.created)} </p>
            </div>
          </div>
          <div className=' flex h-full w-full items-center justify-center text-center px-4'>
            {!itemReview.ProductReviewReply || itemReview.ProductReviewReply.length === 0 ?
              <p onClick={handleShowPopup} className=' cursor-pointer px-4 py-2 bg-primary text-white font-semibold rounded border hover:bg-opacity-100 hover:shadow-md'>Trả lời</p> :
              <p onClick={handleShowPopup} className=' cursor-pointer px-4 py-2 rounded border text-primary border-primary hover:bg-opacity-10 hover:bg-primary '>Xem</p>
            }
          </div>
        </div>
      </div>
      { isShowPopup && <Popup onHandlePopup={handleShowPopup}>
        <ReplyReviewComponent review={itemReview} />
      </Popup>}
    </>

  )
}

export const ShowStarReview = ({itemReview}: {itemReview: typeProductReview}) => {
  const stars = [1,2,3,4,5]
  return (
    <>
      <div className=' flex gap-1 text-yellow-500'>
        {stars.map(star =>{
          return <p key={star}> <p>{itemReview.rating >= star ? <MdStar /> : <MdStarBorder />}</p> </p>
        })}
      </div>
    </>
  )
}

export default ItemReviewComponent
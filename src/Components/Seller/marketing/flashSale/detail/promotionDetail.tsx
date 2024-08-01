import { useEffect } from "react"
import { fetchFlashSaleByID, SelectFlashSale } from "../../../../../redux/features/flashSale"
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { checkTimeStatus } from "../../discount/list/listDiscout"
import { formatShowDate, formatShowDate_HH_MM } from "../../../../../utils/fortmartNumberVnd/formartDate"
import ShowDiscountDetail from "../../discount/detail/showDiscount"


const PromotionDetailFlashSale = ({ idFlashSale }: { idFlashSale: string }) => {
  const dispatch = useAppDispatch()
  const flashSale = useAppSelector(SelectFlashSale)
  useEffect(() => {
    dispatch(fetchFlashSaleByID(idFlashSale))
  }, [dispatch, idFlashSale])
  console.log(flashSale);
  
  return (
    <>
      <div className="font-normal py-4 px-6 bg-white rounded shadow-md text-sm">
      <h4 className=' text-xl flex gap-2 items-center'>Thông tin cơ bản <span className=' text-xs '>{checkTimeStatus(flashSale.time_start, flashSale.time_end)}</span> </h4>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <p className="w-[300px] text-right py-1">Thời gian:</p>
            <div>
              <div className="border rounded p-0.5 flex items-center gap-2">
                <p> {formatShowDate_HH_MM(flashSale.time_start)} </p>
                <span> - </span>
                <p> {formatShowDate(flashSale.time_end)} </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {flashSale.flashSale_detail && <ShowDiscountDetail discountDetail={flashSale.flashSale_detail} />}
    </>
  )
}

export default PromotionDetailFlashSale
import { faClock, faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { AdminVoucherDataToGet } from 'src/redux/rtkQuery/admin';
import { useGetVoucherDetailMutation } from 'src/redux/rtkQuery/user_customers';

interface dataDetailAdminVoucher {
    _id: string,
    id_customer: string[],
    type: string,
    name: string,
    code: string,
    time_start: Date | '',
    time_end: Date | '',
    percent: number,
    maximum_reduction: number,
    minimum_order_value: number,
    maximum_total_usage: number
    is_public: boolean,
}

interface DetailAdminVoucherComponentProps {
    voucherIds: string[]
}

const DetailAdminVoucherComponent: React.FC<DetailAdminVoucherComponentProps> = ({voucherIds}) => {
    const [voucherDetails, setVoucherDetails] =useState<dataDetailAdminVoucher[]>([])
    const [validVouchers, setValidVouchers] = useState<dataDetailAdminVoucher[]>([]);
    const [expiredVouchers, setExpiredVouchers] = useState<dataDetailAdminVoucher[]>([]);
    const [getVoucherDetail] = useGetVoucherDetailMutation()

    useEffect(() => {
        const fetchDetailVoucher = async () => {
            try{
                const promises = voucherIds.map(voucherId => getVoucherDetail(voucherId));
                const results = await Promise.all(promises);
                const details = results.map(result => result.data)
                const today = new Date();
                const valid:dataDetailAdminVoucher[] = [];
                const expired:dataDetailAdminVoucher[] = [];
                const flattenedDetails = details.flat();
                console.log(flattenedDetails);
                
                flattenedDetails.forEach(voucher => {
                  const timeEnd = new Date(voucher['time_end']);
                  console.log(voucher.time_end);
                  if (timeEnd < today) {
                    expired.push(voucher); // Voucher đã hết hạn
                  } else {
                    valid.push(voucher); // Voucher còn hạn
                  }
                });

                const flatennedExpired = expired.flat()
                const flatennedValid = valid.flat()
                
                

                setVoucherDetails(flatennedValid)
                setExpiredVouchers(flatennedExpired)
            }catch(error) {
                console.error('Lỗi khi lấy thông tin chi tiết voucher:', error);
            }
        }

        if(voucherIds.length > 0) {
            fetchDetailVoucher()
        }
    }, [voucherIds])

    useEffect(() => {
        console.log("voucherDetails",voucherDetails);
    },[voucherDetails])

    
    return(
      <div  className="grid grid-cols-12 gap-4 m-4">
        {voucherDetails.map((voucher) => (
          <div key={voucher._id} className=" col-span-6">
          <div className="flex items-center border rounded-sm shadow ">
            <div className=" mr-1 w-28 h-28 bg-primary flex flex-col items-center justify-center text-white border-dotted border-l-8">
              <FontAwesomeIcon className="text-3xl" icon={faTicket} />
              <div className="mt-2 text-xs text-center px-1">{voucher.name}</div>
              {/* <div className="mt-2 text-xs text-center px-1">{voucher.code}</div> */}
            </div>
            <div className="  mr-1 flex-1 text-left ps-4">
              <div className=" font-normal">Giảm {voucher.percent}% Giảm tối đa {voucher.maximum_reduction}₫</div>
              <div className=" text-sm font-normal pb-2">
                Đơn Tối Thiểu  {voucher.minimum_order_value}₫
              </div>
              <div className=" text-xs font-light">
                <FontAwesomeIcon className="pe-2" icon={faClock} />
                Có hiệu lực đến ngày: {new Date(voucher.time_end).toLocaleString()}
              </div>
            </div>
            <div className=" mr-1 text-right text-xs p-2 border rounded border-primary text-primary">
              Dùng ngay
            </div>
          </div>
          </div>
        ))}
        {expiredVouchers.map((voucher) => (
          <div key={voucher._id} className=" col-span-6">
          <div className="flex items-center border rounded-sm shadow text-gray-500 cursor-not-allowed">
            <div className=" mr-1 w-28 h-28 bg-gray-200 flex flex-col items-center justify-center text-white border-dotted border-l-8">
              <FontAwesomeIcon className="text-3xl" icon={faTicket} />
              <div className="mt-2 text-xs text-center px-1">{voucher.name}</div>
              {/* <div className="mt-2 text-xs text-center px-1">{voucher.code}</div> */}
            </div>
            <div className="  mr-1 flex-1 text-left ps-4">
              <div className=" font-normal">Giảm {voucher.percent}% Giảm tối đa {voucher.maximum_reduction}₫</div>
              <div className=" text-sm font-normal pb-2">
                Đơn Tối Thiểu  {voucher.minimum_order_value}₫
              </div>
              <div className=" text-xs font-light">
                <FontAwesomeIcon className="pe-2" icon={faClock} />
                Có hiệu lực đến ngày: {new Date(voucher.time_end).toLocaleString()}
              </div>
            </div>
            <div className=" mr-1 text-right text-xs p-2 border rounded border-gray-200 text-gray-200">
              Hết hạn
            </div>
          </div>
          </div>
        ))}

        
        </div>
    )
}

export default DetailAdminVoucherComponent
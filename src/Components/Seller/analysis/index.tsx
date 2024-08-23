import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchProductByIdShop, SelectProductByIdShop } from '../../../redux/features/product';
import { typeProduct } from '../../../utils/types/product';
import { SelectShop } from '../../../redux/features/shop';

Chart.register(...registerables);

const AnalysisComponent: React.FC = () => {
  const data = {
    labels: ['01/08/2024', '02/08/2024', '03/08/2024', '04/08/2024', '05/08/2024', '06/08/2024', '07/08/2024'],
    datasets: [
      {
        data: [12, 40, 0, 14, 33, 12, 30],
        label: "Danh số",
        borderColor: "#3e95cd",
        fill: false
      },
      {
        data: [1, 2, 0, 1, 2, 1, 3],
        label: "Đơn hàng",
        borderColor: "#8e5ea2",
        fill: false
      },
      {
        data: [15, 22, 12, 14, 24, 10, 34],
        label: "Lượt truy cập",
        borderColor: "#3cba9f",
        fill: false
      },
      {
        data: [4, 10, 5, 2, 7, 4, 15],
        label: "Lượt xen trang",
        borderColor: "#e8c3b9",
        fill: false
      },
    ]
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Biển đồ thống kê theo ngày'
      },
      legend: {
        display: true,
        position: 'bottom' as const // Use the literal type 'bottom'
      }
    },
    scales: {
      y: {
        display: false,
        title: {
          display: false,
          text: 'Population (in millions)'
        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: ''
        }
      }
    }
  };

  const dispatch = useAppDispatch()
  const shop = useAppSelector(SelectShop)
  const listPoduct = useAppSelector(SelectProductByIdShop)
  const [topProduct, setTopProduct] = useState([] as typeProduct[])
  useEffect(() => {
    dispatch(fetchProductByIdShop(shop._id))
  }, [dispatch, shop._id])
  useEffect(() => {
    if (listPoduct.length > 0) {
      setTopProduct(listPoduct.slice(0, 4))
    }
  }, [listPoduct])
  console.log(listPoduct);

  return (
    <>
      <div className='text-sm flex flex-col gap-6  font-normal'>
        <div className=' p-6 bg-white rounded shadow-md'>
          <div className=' flex gap-2 border-b text-base'>
            <p className=' p-4 cursor-pointer clear-start font-semibold text-primary border-b-4 border-primary'>
              Tổng quan
            </p>
            <p className=' p-4 cursor-pointer'>
              Sản phẩm
            </p>
            <p className=' p-4 cursor-pointer'>
              Doanh số
            </p>
            <p className=' p-4 cursor-pointer'>
              Dịch vụ
            </p>
          </div>

          <div className=' grid gap-4 grid-cols-4 py-6'>
            <div className=' rounded border shadow-sm flex flex-col gap-4 p-4 border-t-4 border-t-[#3e95cd]'>
              <p className=' text-sm'>Doanh số</p>
              <p className=' text-base font-semibold'> 3.576.000 đ </p>
            </div>
            <div className=' rounded border shadow-sm flex flex-col gap-4 p-4 border-t-4 border-t-[#8e5ea2]'>
              <p className=' text-sm'>Đơn hàng </p>
              <p className=' text-base font-semibold'> 28 </p>
            </div>
            <div className=' rounded border shadow-sm flex flex-col gap-4 p-4 border-t-4 border-t-[#3cba9f]'>
              <p className=' text-sm'>Lượt truy cập</p>
              <p className=' text-base font-semibold'> 130 </p>
            </div>
            <div className=' rounded border shadow-sm flex flex-col gap-4 p-4 border-t-4 border-t-[#e8c3b9]'>
              <p className=' text-sm'>Lượt xem trang</p>
              <p className=' text-base font-semibold'> 47 </p>
            </div>
          </div>

          <div className=' py-6 gap-4 flex'>
            <div className=' w-[700px]'>
              <Line data={data} options={options} />
            </div>
            <div className=' flex-1'>
              <div className=' border rounded p-2'>
                <p className=' text-base font-semibold py-2 px-4 border-b'>Top sản phẩm có danh thu cao nhất</p>
                <div className=' flex flex-col gap-1 px-2'>
                  {topProduct.map((item) => {
                    const colors: string[] = []
                    const sizes: string[] = []
                    // eslint-disable-next-line array-callback-return
                    item.product_price.map((productPrice) => {
                      if (productPrice.id_color[0])
                        if (!colors.includes(productPrice.id_color[0].value))
                          colors.push(productPrice.id_color[0].value)
                      if (productPrice.id_size[0])
                        if (!sizes.includes(productPrice.id_size[0].value))
                          sizes.push(productPrice.id_size[0].value)
                    }
                    )
                    return (
                      <div className=' border-y py-2' key={item._id}>
                        <div className=' flex gap-2'>
                          <img className=' w-12' src={item.thumbnails[0]} alt="" />
                          <div>
                            <p className=' font-semibold truncate max-w-[300px]'> {item.name} </p>
                            <div className=' text-gray-600 text-xs pt-1'>
                              <p>{colors.length > 0 && 'Màu sắc: ' + colors.map((color) => color)}</p>
                              <p>{sizes.length > 0 && 'Size: ' + sizes.map((color) => color)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnalysisComponent
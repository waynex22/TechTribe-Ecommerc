/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import ItemProductListCols from './itemProductListCols'
import { BsQuestionLg } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { SelectShop } from '../../../../redux/features/shop';
import { fetchProductByIdShop, SelectProductByIdShop } from '../../../../redux/features/product';
import { Link } from 'react-router-dom';
import { typeProduct } from '../../../../utils/types/product';
import SelectActiveFilter from './selectActiveFilter';
import { FaAngleLeft, FaAngleRight, FaCaretDown, FaCaretUp, FaCheck} from 'react-icons/fa';

const ListProduct: React.FC = () => {
  const dispatch = useAppDispatch()
  const [activeFilter, setActiveFilter] = useState('all')
  const shop = useAppSelector(SelectShop)
  const products = useAppSelector(SelectProductByIdShop)
  const [listShow, setListShow] = useState([] as typeProduct[])
  const [valueFindName, setValueFindName] = useState('')
  const [sort, setSort] = useState('')

  const [countPages, setCountPages] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    if (listShow.length > 0) {
      const total = Math.ceil(listShow.length / countPages);
      setTotalPages(total);
    } else {
      setTotalPages(1);
    }
  }, [listShow, countPages]);

  useEffect(() => {
    fetchProduct()
  }, [shop._id])

  useEffect(() => {
    setProductByActiveFilter()
  }, [activeFilter, products])

  
  const startIndex = (currentPage - 1) * countPages;
  const endIndex = startIndex + countPages;
  const currentItems = listShow.slice(startIndex, endIndex);
  
  const setProductByActiveFilter = () => {
    switch (activeFilter) {
      case 'all':
        setListShow(products)
        break;
      case 'activate':
        setListShow(products.filter(item => !item.banned && !item.unlisted))
        break;
      case 'banned':
        setListShow(products.filter(item => item.banned))
        break;
      case 'unlisted':
        setListShow(products.filter(item => item.unlisted))
        break;
      default:
        setListShow(products)
        break;
    }
  }
  const fetchProduct = () => {
    if (shop._id)
      dispatch(fetchProductByIdShop(shop._id))
  }
  const handleListProduct = () => {
    if (valueFindName !== '') {
      setListShow(listShow.filter(item => item.name.includes(valueFindName)))
    } else {
      setProductByActiveFilter()
    }
  }
  const handleSortProduct = (value: string) => {
    let sortedList = [...listShow];
    let newSortType = '';
  
    switch (value) {
      case 'price':
        newSortType = sort === 'onPrice' ? 'downPrice' : 'onPrice';
        sortedList.sort((a, b) => (
          newSortType === 'onPrice' ? 
            findMinPriceProduct(a) - findMinPriceProduct(b) : 
            findMinPriceProduct(b) - findMinPriceProduct(a)
          ));
        break;
      case 'stock':
        newSortType = sort === 'onStock' ? 'downStock' : 'onStock';
        sortedList.sort((a, b) => (
          newSortType === 'onStock' ? 
            findMinPriceProduct(a) - findMinPriceProduct(b) : 
            findMinPriceProduct(b) - findMinPriceProduct(a)
          ));
        break;
      default:
        break;
    }
  
    setListShow(sortedList);
    setSort(newSortType);
  };

  return (
    <>
      <div className=' flex justify-between'>
        <h2 className=' text-xl font-semibold'>Sản phẩm</h2>
        <Link to={`/seller/product/new`} className=' items-center flex gap-2 px-4 py-2 rounded text-white bg-primary'> <IoMdAdd /> Thêm sản phẩm mới</Link>
      </div>

      <SelectActiveFilter products={products} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <div className=' py-4 font-normal text-sm'>
        <div className=' px-6 py-4 bg-white rounded-md shadow'>
          <div className=' flex gap-4 py-4'>
            <div>
              <input onChange={(e) => setValueFindName(e.target.value)} type="text" placeholder='Tìm tên sản phẩm' className=' w-full rounded border border-gray-400 py-1' />
            </div>
            <button onClick={() => handleListProduct()} className=' rounded border hover:text-white hover:bg-primary hover:shadow-md border-primary text-primary px-4'>Áp dụng</button>
          </div>

          <div className=' py-4'>
            <div className=' flex gap-2'>
              <p className=' text-base'> {listShow.length} sản phẩm</p>
              { activeFilter ==='all' && <p className=' flex items-center gap-2 text-xs text-gray-600 bg-gray-100 rounded-lg px-2 py-1'>
                Hạn mức đăng bán: 1000
                <BsQuestionLg />
              </p>}
            </div>
          </div>

          <div className=' py-2 px-4 bg-gray-100 rounded '>
            <div className=' flex gap-6 text-gray-600 items-center'>
              <p>Sắp xếp theo:</p>
              <p onClick={()=>handleSortProduct('price')} className=' flex gap-2 items-center cursor-pointer'>
                Giá 
                <span className=' flex flex-col gap-0 text-gray-400'>
                  <span className={`${sort ==='onPrice' && 'text-gray-800'}`}><FaCaretUp /></span>
                  <span className={`${sort ==='downPrice' && 'text-gray-800'}`}><FaCaretDown /></span>
                </span> 
              </p>
              <p onClick={()=>handleSortProduct('stock')} className=' flex gap-2 items-center cursor-pointer'>
                Kho hàng
                <span className=' flex flex-col gap-0 text-gray-400'>
                  <span className={`${sort ==='onStock' && 'text-gray-800'}`}><FaCaretUp /></span>
                  <span className={`${sort ==='downStock' && 'text-gray-800'}`}><FaCaretDown /></span>  
                </span> 
              </p>
              <p className=' flex gap-2 items-center cursor-pointer'>
                Bán chạy
                <span className=' flex flex-col gap-0 text-gray-400'><FaCaretUp /> <FaCaretDown /></span> 
              </p>
            </div>
          </div>

          <div className=' py-4'>
            <div className=' gap-2 grid grid-cols-4 md:grid-cols-5'>
              {currentItems.length > 0 && currentItems[0]._id && currentItems.map((item) => (
                <ItemProductListCols fetchProduct={fetchProduct} key={item._id} product={item} />
              ))}
            </div>
          </div>
          <div className=' flex flex-row-reverse items-center gap-4'>
            <div className=' border px-2 py-1 rounded text-sm relative group'>
              <p className=' cursor-pointer'>{countPages}sp/trang</p>
              <div className='hidden group-hover:block absolute bottom-full py-1 left-0'>
                <div className=' flex flex-col gap-1 bg-white py-1 shadow-lg border w-[80px]'>
                  <p onClick={() => setCountPages(10)} className=' px-4 py-1 hover:bg-gray-100  flex gap-2 items-center cursor-pointer'>
                  10 {countPages === 10 && <span className=' text-green-400'><FaCheck /></span>}
                  </p>
                  <p onClick={() => setCountPages(15)} className=' px-4 py-1 hover:bg-gray-100 flex gap-2 items-center cursor-pointer'>
                  15 {countPages === 15 && <span className=' text-green-400'><FaCheck /></span>}
                  </p>
                  <p onClick={() => setCountPages(20)} className=' px-4 py-1 hover:bg-gray-100 flex gap-2 items-center cursor-pointer'>
                  20 {countPages === 20 && <span className=' text-green-400'><FaCheck /></span>}
                  </p>
                  <p onClick={() => setCountPages(25)} className=' px-4 py-1 hover:bg-gray-100 flex gap-2 items-center cursor-pointer'>
                  25 {countPages === 25 && <span className=' text-green-400'><FaCheck /></span>}
                  </p>
                </div>
              </div>
            </div>
            <div className=' flex items-center gap-4'>
              {currentPage === 1 ? 
                <p  className='cursor-not-allowed'><FaAngleLeft /></p>: 
                <p onClick={()=>setCurrentPage(currentPage-1)} className='cursor-pointer'><FaAngleLeft /></p>
              }
              <p>{currentPage}</p>
              {currentPage === totalPages ? 
                <p className='cursor-not-allowed'><FaAngleRight /></p>: 
                <p onClick={()=>setCurrentPage(currentPage+1)} className='cursor-pointer'><FaAngleRight /></p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const findMinPriceProduct = (product: typeProduct) => {
  let minPrice = product.product_price[0].price;
  product.product_price.forEach(item => {
    if (item.price < minPrice) {
      minPrice = item.price;
    }
  });
  return minPrice
};
const findMinStockProduct = (product: typeProduct) => {
  let minStock = product.product_price[0].stock;
  product.product_price.forEach(item => {
    if (item.stock < minStock) {
      minStock = item.stock;
    }
  });
  return minStock
};
export default ListProduct
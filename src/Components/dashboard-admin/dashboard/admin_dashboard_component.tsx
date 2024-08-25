import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCountProductQuery } from 'src/redux/rtkQuery/product'
import { useCountShopQuery } from 'src/redux/rtkQuery/shop'
import { useCountUserQuery } from 'src/redux/rtkQuery/user_customers'
import UserChart from './chartjs/user_chart_component'
import LineChart from './chartjs/user_chart_component'
import BarChart from './chartjs/shop_chart_component'
import MoneyLineChart from './chartjs/money_chart_component'
import UserLineChart from './chartjs/user_chart_component'
import ProductBarChart from './chartjs/product_chart_component'
import ShopBarChart from './chartjs/shop_chart_component'

const AdminDashboardComponent: React.FC = () => {
  const {data: countUser} = useCountUserQuery({refetchOnMountOrArgChange: true,})
  const {data: countShop} = useCountShopQuery({refetchOnMountOrArgChange: true,})
  const {data: countProduct} = useCountProductQuery({refetchOnMountOrArgChange: true,})
  return (
    <div>
      <div className=" mt-2 ms-2 flex items-center mb-4 text-gray-100 ">
        <Link to="/dashboard" className="me-2 text-gray-400">
          <FaHome />
        </Link>
      </div>

      <div className='grid grid-cols-12 gap-3 px-4'>
        <div className=' col-span-3 p-2 shadow-md rounded-lg border-t-4 border-blue-500 mb-4'>
          <div className='text-sm uppercase'>
            USER
          </div>
          <div className='py-1 text-2xl'>
            {countUser}
          </div>
          <div className='flex justify-between items-center'>
            <Link to='/dashboard/user' className='text-sm border-b mb-1 border-black hover:text-primary duration-300 hover:border-primary'>
              See all user
            </Link>
            <div>
              <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="add-users"><g><path fill="#00efd1" d="M498,217.8v75.7H418.7l-.2.3a79.79,79.79,0,0,0-50.5-18,78.816,78.816,0,0,0-12,.9,48.25,48.25,0,0,0-18-35.5h0V217.8a38.6,38.6,0,0,1,38.5-38.6,51.506,51.506,0,0,0,83,0A38.6,38.6,0,0,1,498,217.8Z"></path><circle cx="418" cy="119" r="42.9" fill="#edb288"></circle><path fill="#fedb41" d="M290,373.5a79.99,79.99,0,1,1,78,62.3,82.619,82.619,0,0,1-10-.6A79.989,79.989,0,0,1,290,373.5Z"></path><path fill="#00acea" d="M338,241.3a48.24,48.24,0,0,1,18,35.5,79.927,79.927,0,0,0-66,96.8H156V279a48.135,48.135,0,0,1,48.2-48.2,64.307,64.307,0,0,0,103.6,0A46.625,46.625,0,0,1,338,241.3Z"></path><circle cx="256" cy="155.4" r="53.6" fill="#edb288"></circle><path fill="#00efd1" d="M174,217.8v23.5a48.028,48.028,0,0,0-18,37.6v14.6H14V217.8a38.6,38.6,0,0,1,38.5-38.6,51.456,51.456,0,0,0,41.5,21,50.855,50.855,0,0,0,41.4-21A38.623,38.623,0,0,1,174,217.8Z"></path><circle cx="94" cy="119" r="42.9" fill="#edb288"></circle><path fill="#083863" d="M256 217a61.6 61.6 0 1 0-61.6-61.6A61.691 61.691 0 0 0 256 217zm0-107.1a45.55 45.55 0 1 1-45.6 45.5A45.644 45.644 0 0 1 256 109.9zM418 169.9A50.85 50.85 0 1 0 367.1 119 50.979 50.979 0 0 0 418 169.9zm0-85.7a34.9 34.9 0 1 1-34.9 34.9A34.932 34.932 0 0 1 418 84.2z"></path><path fill="#083863" d="M459.5 171.2h-4.1l-2.4 3.3a43.455 43.455 0 0 1-70 0l-2.4-3.3h-4.1A46.561 46.561 0 0 0 330 217.8v9.4a56.212 56.212 0 0 0-22.2-4.6h-4.1l-2.4 3.3a56.308 56.308 0 0 1-90.8 0l-2.4-3.3H204a56.212 56.212 0 0 0-22.2 4.6v-9.4a46.626 46.626 0 0 0-46.5-46.6h-4.1l-2.4 3.3a43.455 43.455 0 0 1-70 0l-2.4-3.3H52.3A46.584 46.584 0 0 0 6 217.8v83.7H148v80H283.8A88.187 88.187 0 0 0 357 443.2a80.23 80.23 0 0 0 11 .7 88.027 88.027 0 0 0 69.2-142.4H506V217.8A46.626 46.626 0 0 0 459.5 171.2zM22 285.5V217.8a30.763 30.763 0 0 1 26.9-30.4 59.294 59.294 0 0 0 90.2 0A30.688 30.688 0 0 1 166 217.8v19.9a55.758 55.758 0 0 0-18 41.2v6.6zm142-6.7a40.2 40.2 0 0 1 36.4-40 72.449 72.449 0 0 0 111.2 0 39.339 39.339 0 0 1 21.4 8.7l5-6.2h0l-5 6.2a40.177 40.177 0 0 1 14.1 22.8A88.128 88.128 0 0 0 280 355.8c0 3.2.2 6.4.5 9.6H164zm204 149a68.025 68.025 0 0 1-9-.6 71.978 71.978 0 0 1-61.2-55.5 70.481 70.481 0 0 1-1.8-15.9c0-35.3 26.3-65.9 61.1-71.2a78.786 78.786 0 0 1 10.9-.8 71.933 71.933 0 0 1 45.4 16.1h0A72.012 72.012 0 0 1 368 427.8zM490 285.5H420.9A88.251 88.251 0 0 0 368 267.9c-1.7 0-3.4.1-5.1.2A57.012 57.012 0 0 0 346 237.7V217.8a30.763 30.763 0 0 1 26.9-30.4 59.294 59.294 0 0 0 90.2 0A30.688 30.688 0 0 1 490 217.8zM94 169.9A50.85 50.85 0 1 0 43.1 119 50.979 50.979 0 0 0 94 169.9zm0-85.7A34.9 34.9 0 1 1 59.1 119 34.932 34.932 0 0 1 94 84.2z"></path><path fill="#083863" d="M403,348H376V320.7a8,8,0,0,0-16,0V348H333a8,8,0,0,0,0,16h27v27.2a8,8,0,1,0,16,0V364h27a8,8,0,0,0,0-16Z"></path></g></svg>
            </div>
          </div>
        </div>
        <div className=' col-span-3 p-2 shadow-md rounded-lg border-t-4 border-amber-500 mb-4 '>
          <div className='text-sm uppercase'>
            Shop
          </div>
          <div className='py-1 text-2xl'>
            {countShop}
          </div>
          <div className='flex justify-between items-center'>
            <Link to='/dashboard/shop' className='text-sm border-b mb-1 border-black duration-300  hover:text-amber-500 hover:border-amber-500'>
              See all shop
            </Link>
            <div>
              <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="shop"><path fill="#2a2f63" d="M63.86 16.25c0-.01 0-.02-.01-.03L56.94 2.28c-.25-.49-.74-.79-1.29-.79H8.79c-.53 0-1.02.29-1.27.76L.17 16.19c-.01.01-.01.03-.02.04-.04.08-.07.17-.1.26 0 .02-.01.04-.01.06-.03.09-.04.2-.04.3v5.93a8.98 8.98 0 0 0 4.01 7.48v30.82c0 .79.64 1.43 1.43 1.43h53.12c.79 0 1.43-.64 1.43-1.43V30.3c2.42-1.61 4.01-4.35 4.01-7.46v-5.98c0-.22-.05-.42-.14-.61zm-9.1-11.91 5.5 11.08H48.55L45.84 4.34h8.92zm-21.27 0h9.4l2.71 11.08H33.49V4.34zm0 13.94H46.1v4.41c0 3.43-2.79 6.23-6.22 6.23h-.17c-3.43 0-6.22-2.8-6.22-6.23v-4.41zM20.8 4.34h9.82v11.08H18.36L20.8 4.34zm-2.79 13.94h12.61v4.41c0 3.43-2.79 6.23-6.22 6.23h-.17c-3.43 0-6.22-2.8-6.22-6.23v-4.41zM9.65 4.34h8.22l-2.44 11.08H3.81L9.65 4.34zM2.87 22.78v-4.5h12.28v4.5c0 3.38-2.76 6.14-6.14 6.14-3.39.01-6.14-2.76-6.14-6.14zm20.15 36.87h-9.6V44.49h9.6v15.16zM25 41.63H11.44v-1.78H25v1.78zm32.13 18.02H25.88V44.49h.55c.79 0 1.43-.64 1.43-1.43v-4.64c0-.79-.64-1.43-1.43-1.43H10.01c-.79 0-1.43.64-1.43 1.43v4.64c0 .79.64 1.43 1.43 1.43h.55v15.17H6.88V31.52c.68.16 1.39.26 2.13.26 3.19 0 5.99-1.67 7.59-4.18 1.62 2.51 4.43 4.18 7.63 4.18h.17c3.22 0 6.04-1.68 7.65-4.21 1.62 2.53 4.44 4.21 7.66 4.21h.17c3.19 0 6-1.66 7.62-4.16a8.942 8.942 0 0 0 7.55 4.16c.72 0 1.41-.09 2.08-.25v28.12zm4-36.82c0 3.36-2.73 6.09-6.08 6.09-3.36 0-6.09-2.73-6.09-6.09v-4.55h12.17v4.55z"></path><path fill="#ffdb7c" d="M11.44 39.85H25v1.78H11.44zM13.42 44.49h9.6v15.17h-9.6z"></path><path fill="#f16e61" d="M55.05 31.78c-3.17 0-5.96-1.66-7.55-4.16-1.62 2.5-4.43 4.16-7.62 4.16h-.17c-3.22 0-6.04-1.68-7.66-4.21a9.051 9.051 0 0 1-7.65 4.21h-.17c-3.2 0-6.01-1.67-7.63-4.18-1.6 2.51-4.4 4.18-7.59 4.18-.74 0-1.45-.1-2.13-.26v28.13h3.68V44.49h-.55c-.79 0-1.43-.64-1.43-1.43v-4.64c0-.79.64-1.43 1.43-1.43h16.42c.79 0 1.43.64 1.43 1.43v4.64c0 .79-.64 1.43-1.43 1.43h-.55v15.17h31.25V31.53c-.67.16-1.36.25-2.08.25zm.12 11.39c0 .79-.64 1.43-1.43 1.43h-.16v12.63c0 .79-.64 1.43-1.43 1.43H34.92c-.8 0-1.44-.64-1.44-1.43V44.6h-.15c-.79 0-1.43-.64-1.43-1.43V38.6c0-.79.64-1.43 1.43-1.43h20.41c.79 0 1.43.64 1.43 1.43v4.57z"></path><path fill="#edeced" d="M15.15 18.28v4.5c0 3.38-2.76 6.14-6.14 6.14-3.39 0-6.14-2.76-6.14-6.14v-4.5h12.28zM17.87 4.34l-2.44 11.09H3.81L9.65 4.34zM30.62 4.34v11.09H18.36L20.8 4.34zM30.62 18.28v4.41c0 3.43-2.79 6.23-6.22 6.23h-.17c-3.43 0-6.22-2.8-6.22-6.23v-4.41h12.61zm15.48 0v4.41c0 3.43-2.79 6.23-6.22 6.23h-.17c-3.43 0-6.22-2.8-6.22-6.23v-4.41H46.1zM45.6 15.43H33.49V4.34h9.4zM60.26 15.43H48.55L45.84 4.34h8.92zM61.13 18.28v4.55c0 3.36-2.73 6.09-6.08 6.09-3.36 0-6.09-2.73-6.09-6.09v-4.55h12.17z"></path><path fill="#2a2f63" d="M53.74 37.17H33.33c-.79 0-1.43.64-1.43 1.43v4.57c0 .79.64 1.43 1.43 1.43h.15v12.63c0 .79.64 1.43 1.44 1.43h17.23c.79 0 1.43-.64 1.43-1.43V44.6h.16c.79 0 1.43-.64 1.43-1.43V38.6c0-.79-.64-1.43-1.43-1.43zm-3.02 18.61H36.35V44.6h14.37v11.18zm1.58-14.06H34.76v-1.7H52.3v1.7z"></path><path fill="#ffdb7c" d="M34.76 40.03H52.3v1.7H34.76zM36.35 44.6h14.37v11.19H36.35z"></path></svg>
            </div>
          </div>
        </div>
        <div className=' col-span-3 p-2 shadow-md rounded-lg border-t-4 border-green-500 mb-4'>
          <div className='text-sm uppercase'>
            product
          </div>
          <div className='py-1 text-2xl'>
            {countProduct}
          </div>
          <div className='flex justify-between items-center'>
            <Link to='/dashboard/product' className='text-sm border-b mb-1 border-black hover:text-green-500 hover:border-green-500 duration-300'>
              See all product
            </Link>
            <div>
              <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="product"><path fill="#FF8000" d="M28 42H4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V43a1 1 0 0 0-1-1zM20 36h24a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1H20a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1zM60 42H36a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V43a1 1 0 0 0-1-1z"></path><g fill="#4D4D4D"><path d="M29 36H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM18.115 17.668a1.002 1.002 0 0 0 1.277.609L43.9 9.599a1 1 0 0 0 .609-1.277l-2.002-5.656a.998.998 0 0 0-.512-.568 1.01 1.01 0 0 0-.765-.041l-24.509 8.678a1.005 1.005 0 0 0-.609 1.277l2.003 5.656zM61 36H35a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"></path></g><g fill="#CCC"><path d="M49.04 11.091h4v2h-4zM55.04 11.091h2v2h-2zM51.035 5.22l.958 1.755-3.51 1.916-.959-1.756zM54.546 3.301l.958 1.756-1.756.958-.958-1.756zM48.48 15.287l3.512 1.917-.958 1.756-3.512-1.918zM53.744 18.16l1.756.96-.959 1.754-1.755-.958z"></path></g><path fill="#FFF" d="M19.02 52h-6.04A2.984 2.984 0 0 1 10 49.02c0-1.683 1.337-3.02 2.98-3.02h6.04A2.984 2.984 0 0 1 22 48.98c0 1.683-1.337 3.02-2.98 3.02zm-6.04-4a.98.98 0 0 0-.98.98c0 .581.439 1.02.98 1.02h6.04a.98.98 0 0 0 .98-.98c0-.581-.439-1.02-.98-1.02h-6.04zM51.02 52h-6.04A2.984 2.984 0 0 1 42 49.02c0-1.683 1.337-3.02 2.98-3.02h6.04A2.984 2.984 0 0 1 54 48.98c0 1.683-1.337 3.02-2.98 3.02zm-6.04-4a.98.98 0 0 0-.98.98c0 .581.439 1.02.98 1.02h6.04a.98.98 0 0 0 .98-.98c0-.581-.439-1.02-.98-1.02h-6.04zM35.02 26h-6.04A2.984 2.984 0 0 1 26 23.02c0-1.683 1.337-3.02 2.98-3.02h6.04A2.984 2.984 0 0 1 38 22.98c0 1.683-1.337 3.02-2.98 3.02zm-6.04-4a.98.98 0 0 0-.98.98c0 .581.439 1.02.98 1.02h6.04a.98.98 0 0 0 .98-.98c0-.581-.439-1.02-.98-1.02h-6.04z"></path><path fill="#E57300" d="M28 33a23.8 23.8 0 0 1-9-1.756V35a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1v-9.462C41.184 30.052 35.001 33 28 33zM12 59a23.8 23.8 0 0 1-9-1.756V61a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1v-9.462C25.184 56.052 19.001 59 12 59zM44 59a23.8 23.8 0 0 1-9-1.756V61a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1v-9.462C57.184 56.052 51.001 59 44 59z"></path><path fill="#FFF" d="M37 30h4v2h-4zM21 56h4v2h-4zM53 56h4v2h-4z"></path></svg>
            </div>
          </div>
        </div>
        <div className=' col-span-3 p-2 shadow-md rounded-lg border-t-4 border-orange-500 mb-4'>
          <div className='text-sm uppercase'>
            MONEY
          </div>
          <div className='py-1 text-2xl'>
            100.000.000
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-sm border-b mb-1 border-black hover:text-orange-500 hover:border-orange-500 duration-300'>
              Updating for future
            </div>
            <div>
              <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 65" id="wallet"><circle cx="60.2" cy="28.3" r=".4" fill="#231f20"></circle><circle cx="54.7" cy="38.5" r=".4" fill="#231f20"></circle><circle cx="6.5" cy="15.3" r="1.5" fill="none" stroke="#fbd108" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle><path fill="none" stroke="#f16723" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M44.5 4.8h2.4M45.7 6V3.5"></path><circle cx="9.8" cy="4.7" r=".5" fill="#231f20"></circle><path fill="none" stroke="#4d9ad4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M52.2 21.1h2.5M53.4 22.3v-2.4"></path><path fill="#ef5224" d="m41.9 53.7-36.8 5c-.9.1-1.7-.6-1.7-1.5V27.5c0-.8.6-1.4 1.3-1.5l37.2-5.1c3.5 0 6.3 3.1 6.3 6.8v19.1c0 3.8-2.8 6.9-6.3 6.9z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M3.4 27.5c0-.8.6-1.4 1.3-1.5l37.2-5.1c3.5 0 6.3 3.1 6.3 6.8v19.1c0 3.8-2.8 6.8-6.3 6.8l-36.8 5c-.9.1-1.7-.6-1.7-1.5"></path><path fill="#fafdff" d="M21.4 9h19.9v27.6H21.4z" transform="rotate(33.613 31.395 22.792)"></path><path fill="#80c244" d="m32.1 39.8-14.6-9.1 15.2-23 14.4 9.5z"></path><path fill="#5bb947" d="M32.1 39.8 28.4 37l14.9-22.3 3.8 2.5z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M45.5 19.6 32.1 39.8 15.5 28.7 30.7 5.8l16.6 11-.5.8"></path><path fill="#fafdff" d="M12.4 8.3h19.9v27.6H12.4z" transform="rotate(13.993 22.386 22.095)"></path><path fill="#80c244" d="m28.7 37.9-16.8-3.7 6.7-26.8 16.7 4.2z"></path><path fill="#5bb947" d="m28.7 37.9-4.3-1.4 6.4-26 4.5 1.1z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="m32.2 23.7-3.5 14.2-19.3-4.8L14 14.7M14.7 11.9 16 6.3l19.4 4.8-2.6 10.3"></path><path fill="#ef5224" d="M45.1 59.1h-38c-2 0-3.6-1.6-3.6-3.6V29.9c0-2 1.6-3.6 3.6-3.6h38.1c3.9 0 7 3.1 7 7v18.9c-.1 3.8-3.2 6.9-7.1 6.9z"></path><path fill="#f16723" d="M48.2 59.1h-44c-.5 0-.8-.4-.8-.8V27.2c0-.5.4-.8.8-.8h44v32.7z"></path><path fill="#fafdff" d="M6.5 58.7H4.6c-.6 0-1.2-.5-1.2-1.2v-30c0-.6.5-1.2 1.2-1.2h1.9v32.4z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M3.4 38.6V27.8c0-.8.7-1.5 1.5-1.5h40.3c3.8 0 6.8 3.1 6.8 6.8v19.1c0 3.8-3.1 6.8-6.8 6.8H24.8M3.4 46.9v-6M22.1 59.1H5c-.8 0-1.5-.7-1.5-1.5v-8.3"></path><path fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" d="M12.7 29.4c-2.4 0-4.3 1.9-4.3 4.3M8.4 35.9v1M8.4 50v5.7"></path><ellipse cx="37.1" cy="52" fill="#fbd108" rx="7.1" ry="2.4" transform="rotate(-40.235 37.107 52.05)"></ellipse><path fill="#fbd108" d="M31.7 56.6c.9 1 4-.2 7-2.7s4.7-5.4 3.8-6.4l2.6 3.1c.9 1-.8 3.9-3.8 6.4s-6.1 3.7-7 2.7l-2.6-3.1z"></path><path fill="#fafdff" d="m37.8 59.3-.2.1c-1.1.9-2.8.8-3.7-.3l-1.4-1.7v-.1l3-.7 2.3 2.7z"></path><path fill="#f9ae19" d="m43.7 54.7.8-1.1c1.1-.9 1.3-2.6.3-3.7l-1.4-1.7h-.1L41.5 52l2.2 2.7z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M31.8 56.7c.9 1 4-.2 7-2.7s4.7-5.4 3.8-6.4l2.6 3.1c.9 1-.8 3.9-3.8 6.4-3 2.5-6.1 3.7-7 2.7l-2.6-3.1z"></path><ellipse cx="37.2" cy="52.2" fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" rx="7.1" ry="2.4" transform="rotate(-40.235 37.213 52.174)"></ellipse><ellipse cx="49.7" cy="44.8" fill="#fbd108" rx="7.1" ry="2.4"></ellipse><path fill="#fbd108" d="M42.7 44.8c0 1.3 3.2 2.4 7.1 2.4s7.1-1.1 7.1-2.4v4.1c0 1.3-3.2 2.4-7.1 2.4s-7.1-1.1-7.1-2.4v-4.1z"></path><path fill="#fafdff" d="M45.6 50.8h-.2c-1.5 0-2.7-1.2-2.7-2.7v-2.2c0-.1 0-.1.1-.1l2.8 1.4v3.6z"></path><path fill="#f9ae19" d="m53.1 51.1 1.3-.3c1.5 0 2.7-1.2 2.7-2.7v-2.2c0-.1 0-.1-.1-.1l-3.9 1.7v3.6z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M42.7 44.9c0 1.3 3.2 2.4 7.1 2.4s7.1-1.1 7.1-2.4V49c0 1.3-3.2 2.4-7.1 2.4s-7.1-1.1-7.1-2.4v-4.1z"></path><path fill="#fbd108" d="M42.7 49.1c0 1.3 3.2 2.4 7.1 2.4s7.1-1.1 7.1-2.4v4.1c0 1.3-3.2 2.4-7.1 2.4s-7.1-1.1-7.1-2.4v-4.1z"></path><path fill="#fafdff" d="M45.6 55.1h-.2c-1.5 0-2.7-1.2-2.7-2.7v-2.2c0-.1 0-.1.1-.1l2.8 1.4v3.6z"></path><path fill="#f9ae19" d="m53.1 55.5 1.3-.3c1.5 0 2.7-1.2 2.7-2.7v-2.2c0-.1 0-.1-.1-.1l-3.9 1.7v3.6z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M42.7 49.3c0 1.3 3.2 2.4 7.1 2.4s7.1-1.1 7.1-2.4v4.1c0 1.3-3.2 2.4-7.1 2.4s-7.1-1.1-7.1-2.4v-4.1z"></path><path fill="#fbd108" d="M42.7 53.5c0 1.3 3.2 2.4 7.1 2.4s7.1-1.1 7.1-2.4v4.1c0 1.3-3.2 2.4-7.1 2.4s-7.1-1.1-7.1-2.4v-4.1z"></path><path fill="#fafdff" d="M45.6 59.5h-.2c-1.5 0-2.7-1.2-2.7-2.7v-2.2c0-.1 0-.1.1-.1l2.8 1.4v3.6z"></path><path fill="#f9ae19" d="m53.1 59.9 1.3-.3c1.5 0 2.7-1.2 2.7-2.7v-2.2c0-.1 0-.1-.1-.1l-3.9 1.7v3.6z"></path><path fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M42.7 53.7c0 1.3 3.2 2.4 7.1 2.4s7.1-1.1 7.1-2.4v4.1c0 1.3-3.2 2.4-7.1 2.4s-7.1-1.1-7.1-2.4v-4.1z"></path><ellipse cx="49.7" cy="44.9" fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" rx="7.1" ry="2.4"></ellipse></svg>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 px-4'>
          <div className='col-span-6 p-2'>
              <UserLineChart/>
          </div>
          <div className='col-span-6 p-2'>
              <ShopBarChart/>
          </div>
          <div className='col-span-6 p-2'>
              <ProductBarChart/>
          </div>
          <div className='col-span-6 p-2'>
              <MoneyLineChart/>
          </div>
      </div>
    </div>
  )
}

export default AdminDashboardComponent
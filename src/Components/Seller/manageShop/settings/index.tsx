import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchIdentification, fetchShop, SelectIdentification, SelectLoadingShop, SelectShop } from '../../../../redux/features/shop'
import ProfileShop from './profile'
import IdentityInformation from './identityInformation'
import { Link, useSearchParams } from 'react-router-dom'

const ManageProfileShop: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [activeFilter, setActiveFilter] = useState('profile')
  const shop = useAppSelector(SelectShop)
  const identification = useAppSelector(SelectIdentification)
  const loading = useAppSelector(SelectLoadingShop)

  useEffect(() => {
    dispatch(fetchShop())
    dispatch(fetchIdentification())
  }, [dispatch])

  useEffect(() => {
    if (type === 'identity-information')
      setActiveFilter(type)
    else
      setActiveFilter('profile')
  },[type])
  console.log(identification);
  useEffect(() => {
    if (type === 'identity-information')
      setActiveFilter(type)
    else
      setActiveFilter('profile')
  },[type])
  
  return (
    <div className='font-normal'>
      <div className=' py-4 '>
        <div className=' flex'>
          <Link to={`/seller/settings/profile`}
            className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'profile' && 'text-primary border-b-4 border-b-primary font-bold'}`}>
            Thông tin cơ bản
          </Link>
          <Link to={`/seller/settings/profile?type=identity-information`}
            className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'identity-information' && 'text-primary border-b-4 border-b-primary font-bold'}`}>
            Thông tin Định Danh
          </Link>
        </div>
      </div>

      {!loading && activeFilter ==='profile' && <ProfileShop profileShop={shop} />}
      {!loading && activeFilter ==='identity-information' && <IdentityInformation identification={identification}  /> }


    </div>
  )
}

export default ManageProfileShop
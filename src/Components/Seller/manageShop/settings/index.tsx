import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { fetchIdentification, fetchShop, SelectIdentification, SelectLoadingShop, SelectShop } from '../../../../redux/features/shop'
import ProfileShop from './profile'
import IdentityInformation from './identityInformation'

const ManageProfileShop: React.FC = () => {
  const dispatch = useAppDispatch()
  const [activeFilter, setActiveFilter] = useState('profile')
  const shop = useAppSelector(SelectShop)
  const identification = useAppSelector(SelectIdentification)
  const loading = useAppSelector(SelectLoadingShop)
  useEffect(() => {
    dispatch(fetchShop())
    dispatch(fetchIdentification())
  }, [dispatch])
  console.log(identification);
  
  return (
    <div className='font-normal'>
      <div className=' py-4 '>
        <div className=' flex'>
          <p
            onClick={() => setActiveFilter('profile')}
            className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'profile' && 'text-primary border-b-4 border-b-primary font-bold'}`}>
            Thông tin cơ bản
          </p>
          <p
            onClick={() => setActiveFilter('identity-information')}
            className={`p-4 cursor-pointer hover:text-primary 
        ${activeFilter === 'identity-information' && 'text-primary border-b-4 border-b-primary font-bold'}`}>
            Thông tin Định Danh
          </p>
        </div>
      </div>

      {!loading && activeFilter ==='profile' && <ProfileShop profileShop={shop} />}
      {!loading && activeFilter ==='identity-information' && <IdentityInformation identification={identification}  /> }


    </div>
  )
}

export default ManageProfileShop
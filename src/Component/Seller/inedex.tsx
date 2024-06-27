import React from 'react'
import { Outlet } from 'react-router-dom'

const SellerComponent: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default SellerComponent
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminComponent: React.FC = () => {
  return (
    <div>
      <main className=' rounded-lg overflow-hidden shadow-lg'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminComponent
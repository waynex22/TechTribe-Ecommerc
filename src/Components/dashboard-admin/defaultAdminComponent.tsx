import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminComponent: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminComponent
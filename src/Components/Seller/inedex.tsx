import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import './style.css'
import { LoaderContex } from './loading'

const SellerComponent: React.FC = () => {
  const { isLoader } = useContext(LoaderContex)
  return (
    <div>
      <ScaleLoader loading={isLoader} cssOverride={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'wait'
      }} color="#36d7b7" />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default SellerComponent
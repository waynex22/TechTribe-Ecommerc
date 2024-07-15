import React from 'react'
import { useParams } from 'react-router-dom'
import EditProduct from './editProduct'

const GetIdEditProduct: React.FC = () => {
    const { idProduct } = useParams()
  return (
    <>
    {idProduct && <EditProduct idProduct={idProduct} />}
    </>
  )
}

export default GetIdEditProduct
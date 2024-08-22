import React from 'react'
import { useParams } from 'react-router-dom'
import EditVoucher from './editVoucher'

const Detailvoucher: React.FC = () => {
    const { idVoucher } = useParams()
  return (
    <>  {idVoucher &&
        <EditVoucher idVoucher={idVoucher} />
    }  </>
  )
}

export default Detailvoucher
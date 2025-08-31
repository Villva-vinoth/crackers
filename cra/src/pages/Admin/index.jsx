import Lottie from 'lottie-react'
import React from 'react'
import contactus from '../../assets/crackers.json'
import { NAME } from '../../../constant'
const AdminPage = () => {

  return (
    <div className='w-[100%] h-screen flex flex-col items-center justify-center'>
        <h1 className='text-center text-2xl'>Welcome to <span className='font-semibold'>{NAME.toUpperCase()}</span> ! Admin Panel</h1>
        <Lottie animationData={contactus} loop={true} style={{width:"600px",margin:"0 auto"}} />
    </div>
  )
}

export default AdminPage
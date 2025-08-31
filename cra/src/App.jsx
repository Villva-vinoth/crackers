import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { CommonHeader } from './pages/CommonHeader'
import { AboutPage } from './pages/About'
import { OrderPage } from './pages/Order'
import { Home } from './pages/Home'
import ProductsPage from './pages/Home/Product'
import ContactUs from './pages/Home/ContactUs'
import { color, NAME } from '../constant'
import Lottie from 'lottie-react'
import whatsapp from './assets/whatsapp.json'
import orders_now from './assets/order_now.json'
import LoginForm from './pages/login/Login'
import Sidebar from './pages/Admin/sidebar/Sidebar'
import AdminPage from './pages/Admin'
import Categories from './pages/Admin/categories/Categories'
import { FormProvider } from './context/FormProvider'
import Orders from './pages/Admin/Order'
import Products from './pages/Admin/product/Product'
import { UpOutlined } from '@ant-design/icons';
import ScrollToTopButton from './pages/Home/scroll'
import ProtectedRoute from './ProtectedRoute'
function App() {

  // document.getElementById('order_now').style.display="block"

  return (
    <div style={{
      overflow: 'hidden',
      backgroundColor: color.bgColor,
      position: "relative"
    }}>
      <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <CommonHeader />
              <Outlet />
              <AboutPage />
            </>} >
            <Route index element={<Home />} />
            <Route path='/products' element={<ProductsPage />} />

            <Route path='/contact' element={<ContactUs />} />

            <Route path='/order' element={<OrderPage />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>

          <Route path='/login' element={<LoginForm />} />

         <Route element={<ProtectedRoute />} >
           <Route path='/admin' element={
            <div className='flex flex-row'>
            <Sidebar />
            <div className='flex flex-col w-full'>
              <h1 className='text-2xl font-bold mb-4 text-center' id='admin_header'>{NAME.toUpperCase()}</h1>
            <Outlet />
            </div>
            </div>
          }>
            
            <Route index element={<AdminPage />} />
            <Route path='products' element={<Products />} />

            <Route path='categories' element={<Categories />} />
            <Route path='orders' element={<Orders />} />


            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>
         </Route>

        </Routes>
      </BrowserRouter>
      </FormProvider>
     <a href='https://wa.me/919842922113' target='_blank' style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
      id='whatsapp'
      >
        <Lottie animationData={whatsapp} style={{ width: '50px' }} />
        </a>
        <a href='/assets/SSSCrackersFireWorks.pdf' download={'SSSCrackersFireWorks.pdf'} style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        cursor: 'pointer',
      }} 
        id='order_now'
        
      >
        <Lottie animationData={orders_now} style={{ width: '100px' }} />
        </a>
        <ScrollToTopButton />
    </div>
  )
}

export default App

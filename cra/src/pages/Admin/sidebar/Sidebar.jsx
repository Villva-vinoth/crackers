import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, CloseOutlined, HomeOutlined,ProductOutlined,ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons'; // Icons for the toggle button
import { Modal } from 'antd';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const {pathname} = useLocation()

  useEffect(() => {
    const element =document.getElementById('order_now')
    const admin = document.getElementById('admin_header')
    const whatsapp = document.getElementById('whatsapp')
      if(whatsapp){
        whatsapp.style.display="none"
      }

      if(pathname.includes("/admin")){
        if(element)
        element.style.display="none";
      }

      if(pathname=="/admin"){
        if(admin){
          admin.style.display="none"
        }
      }
      else{
        if(admin){
          // admin.style.display="none"
          admin.style.display="block"
        }   

      }  
  }, [pathname]);
    

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const sidebarClass = "block p-2 hover:text-[red] rounded transition duration-200 flex items-center gap-2"
  const activeSidebarClass = "block p-2 hover:text-[red ] rounded transition duration-200 text-[black] bg-[#FF55BB] rounded-xl flex items-center gap-2"

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#40DFEF] text-white rounded lg:hidden"
      >
        {isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-screen w-64 bg-[#40DFEF] text-white p-4 transform transition-transform duration-200 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <h1 className="text-2xl font-bold mb-6 mt-10 md:mt-0">Menu</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className={pathname=="/admin" ? activeSidebarClass : sidebarClass}
              onClick={closeSidebar}
            >
              <HomeOutlined style={{fontSize:'20px'}} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className={pathname=="/admin/categories" ? activeSidebarClass : sidebarClass}
              onClick={closeSidebar}
            >
              <ProductOutlined style={{fontSize:'20px'}} />
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={pathname=="/admin/products" ? activeSidebarClass : sidebarClass}
              onClick={closeSidebar}
            >
              <ProductOutlined style={{fontSize:'20px'}} />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className={pathname=="/admin/orders" ? activeSidebarClass : sidebarClass}
              onClick={closeSidebar}
            >
              <ShoppingCartOutlined style={{fontSize:'20px'}} />
              Orders
            </Link>
          </li>
          <li>
            <Link
              // to="/"
              className={pathname=="/admin/" ? activeSidebarClass : sidebarClass}
              onClick={()=>{
                Modal.confirm({
                  title: 'Are you sure you want to logout?',
                  onOk: () => {
                    localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                    window.location.href = '/';
                  },
                })
              }}
            >
              <LogoutOutlined style={{fontSize:'20px'}} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
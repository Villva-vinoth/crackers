import React, { useEffect, useState } from 'react';
import { MenuOutlined, CloseOutlined, ProductOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu, Drawer, Button, Avatar } from 'antd';
import { color, NAME,APP_LOGO } from '../../../constant';
import { useLocation, useNavigate } from 'react-router';

export const CommonHeader = () => {


    const {pathname}= useLocation();
    const element =document.getElementById('order_now');
      if(pathname=="/order"){
        if(element)
        element.style.display="none";
      }
      else{
        if(element)
       element.style.display="block";
      }

    

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const commonNavClass = " hover:text-orange-500 hover:rounded-md p-2 cursor-pointer font-semibold flex items-center gap-2";
    const commonContainerClass = "container mx-auto px-4 flex justify-between items-center";
    const activeNavClass = " hover:text-[white] hover:rounded-md p-2 cursor-pointer font-semibold text-[black] bg-orange-500 rounded-xl flex items-center gap-2";


    const nav = useNavigate();

    // const {pathname}= useLocation();


    // Menu items without anchor tags
    const menuItems = [
        { key: 'home', label: <div className={pathname =="/" ? activeNavClass : commonNavClass} onClick={() =>{ nav('/');setIsMobileMenuVisible(false);}}><HomeOutlined style={{fontSize:'20px'}} />Home</div> },
        { key: 'products', label: <div className={pathname=="/products" ? activeNavClass : commonNavClass} onClick={() => {nav('/products');setIsMobileMenuVisible(false)}}><ProductOutlined style={{fontSize:'20px'}} /> Products</div> },
        // { key: 'chit-fund', label: <div className={commonNavClass}>Chit Fund</div> },
        { key: 'order', label: <div className={pathname == "/order" ? activeNavClass : commonNavClass} onClick={() => {nav('/order');setIsMobileMenuVisible(false)}}><ShoppingCartOutlined style={{fontSize:'20px'}} />Book Now</div> },
    ];

    return (
        <header className="py-4" style={{
            backgroundColor:color.headerBG,
            color:color.headerForeColor
        }}>
            <div className={commonContainerClass}>
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer justify-between gap-5">
                    <Avatar src={APP_LOGO} size={40} alt="Logo" />
                    <span className="text-xl font-bold" onClick={()=>{
                        nav('/')
                    }} onDoubleClick={() => {nav('/login');}}>{NAME.toUpperCase()}</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex ">
                        {menuItems.map((item) => (
                            <li key={item.key} className={commonNavClass}>{item.label}</li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Fullscreen Menu */}
                <div className="md:hidden">
                    <Button type="text" className="text-white" onClick={() => setIsMobileMenuVisible(true)}>
                        <MenuOutlined style={{ fontSize: '24px' ,color:"black" }} />
                    </Button>
                    <Drawer
                        title={<div className="flex justify-between items-center w-full"><span>Menus</span><CloseOutlined className="cursor-pointer" onClick={() => setIsMobileMenuVisible(false)} /></div>}
                        placement="right"
                        closable={false}
                        onClose={() => setIsMobileMenuVisible(false)}
                        open={isMobileMenuVisible}
                        width="50%"
                        style={{ backgroundColor: 'black', color: 'white',textAlign:"center" }}
                    >
                        <ul className="flex flex-col text-lg">
                            {menuItems.map((item) => (
                                <li key={item.key} className={commonNavClass}>{item.label}</li>
                            ))}
                        </ul>
                    </Drawer>
                </div>
            </div>
        </header>
    );
};
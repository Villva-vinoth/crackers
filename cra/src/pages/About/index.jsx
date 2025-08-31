import { Avatar } from 'antd';
import React from 'react';
import { ADDRESS, color, MAIL, NAME, PHONE_NUMBER1, PHONE_NUMBER2, PHONE_NUMBER3,APP_LOGO } from '../../../constant';
import {YoutubeOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined, BellOutlined, BookOutlined, ContactsOutlined, IdcardOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router';
export const AboutPage = () => {
    const hoverClass = `hover:text-[red] cursor-pointer`;
    const nav = useNavigate();
    return (
        <>
        <div className='w-[100%] mx-auto p-2'>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.55852215068!2d77.86404707502419!3d9.460053090619514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cd2b928cfcb7%3A0x642b70a1c2a04231!2sSri%20Sivasakthi%20Crackers!5e0!3m2!1sen!2sin!4v1742040075987!5m2!1sen!2sin" width="100%" height="300" style={{ border:0}}  allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
            <footer className="py-8" style={{
                backgroundColor:color.headerBG,
                color:color.headerForeColor
            }}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About Us Section */}
                        <div className='flex flex-col items-center gap-4'>
                            <div className='flex items-center gap-4'>
                                <Avatar src={APP_LOGO} shape='circle' size={40} />
                                <div className='text-xl font-bold'>{NAME.toUpperCase()}</div>
                            </div>
                            <div className='flex gap-4'>
                                <div className={hoverClass}><YoutubeOutlined style={{color:'red',fontSize:'30px'}}/></div>
                                <div className={hoverClass}><InstagramOutlined style={{color:'purple',fontSize:'30px'}} /></div>
                                <div className={hoverClass}><FacebookOutlined style={{color:'blue',fontSize:'30px'}} /></div>
                                <div className={hoverClass}><WhatsAppOutlined style={{color:'green',fontSize:'30px'}} /></div>

                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className=''>
                            <h3 className="md:text-lg  text-xl  font-bold mb-4 md:text-start text-center">Quick Links</h3>
                            <ul className="md:text-sm text-lg">
                                <li className="mb-2 md:text-start text-center"     
                                onClick={() => {
                                  const element =  document.getElementById("aboutus")
                                  if(element){
                                      element.scrollIntoView({ behavior: "smooth" });
                                  }
                                  else{
                                        nav('/');
                                        // window.scrollTo(0,20);
                                        setTimeout(() => {
                                            const newElement = document.getElementById("aboutus");
                                            if (newElement) {
                                              newElement.scrollIntoView({ behavior: "smooth" });
                                            }
                                          }, 500); 
                                  }
                                    
                            }}
                                ><div className={hoverClass+" flex items-center gap-2 justify-center md:justify-start"}>
                                    <BellOutlined style={{color:'#155dfc',fontSize:'20px'}}/>
                                    About us</div></li>
                                <li className="mb-2 md:text-start text-center"
                                 onClick={() => {
                                //     const element =  document.getElementById("products")
                                //   if(element){
                                //       element.scrollIntoView({ behavior: "smooth" });
                                //   }
                                //   else{
                                        nav('/products');
                                        // window.scrollTo(0,20);
                                        setTimeout(() => {
                                            const newElement = document.getElementById("products");
                                            if (newElement) {
                                              newElement.scrollIntoView({ behavior: "smooth" });
                                            }
                                          }, 500); 
                                //   }
                                 }}
                                ><div className={hoverClass+" flex items-center gap-2 justify-center md:justify-start"}>
                                    <BookOutlined style={{color:'#155dfc',fontSize:'20px'}}/>
                                    Products</div></li>
                                <li className='mb-2 md:text-start text-center'
                                onClick={()=>{
                                    nav('/contact');
                                    window.scrollTo(0,0);
                                }}
                                ><div className={hoverClass+" flex items-center gap-2 justify-center md:justify-start"}><ContactsOutlined style={{color:'#155dfc',fontSize:'20px'}}/>Contact us</div></li>
                            </ul>
                        </div>

                        {/* Contact Information Section */}
                        <div>
                            <h3 className="md:text-lg  text-xl font-bold mb-4  md:text-start text-center">Contact Information</h3>
                            <ul className="md:text-sm text-lg">
                                <li className="mb-2  md:text-start text-center"> <IdcardOutlined style={{color:'#155dfc',fontSize:'20px'}}/> Address : <span className='font-semibold'>{ADDRESS}</span></li>
                                <li className="mb-2  md:text-start text-center"><PhoneOutlined style={{color:'#155dfc',fontSize:'20px'}}/> Phone : <span className='font-semibold'>{PHONE_NUMBER1},{PHONE_NUMBER2},{PHONE_NUMBER3}</span></li>
                                <li className='mb-2  md:text-start text-center'><MailOutlined style={{color:'#155dfc',fontSize:'20px'}}/> Email: <span className='font-semibold'>{MAIL}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

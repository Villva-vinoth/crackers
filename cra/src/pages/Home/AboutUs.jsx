import React from 'react';
import { ABOUT, NAME, WHYCHOOSEUS } from '../../../constant';
// import fireworksImage from './fireworks.jpg'; // Replace with your image path
import CheckOutlined from '@ant-design/icons/CheckOutlined';
const AboutUs = () => {
    return (
        <div className="mx-auto flex flex-col py-10 px-2" id="aboutus">

        <h1 className='text-4xl font-bold text-center text-gray-800 mb-10'>About us</h1>

            {/* Image */}
          <div className='flex lg:flex-row flex-col justify-center w-[100%]'>
          <div className="flex justify-center items-center w-[100%] p-4">
                <img
                    src={"/assets/banner.jpeg"}
                    alt="Fireworks"
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>
            {/* Heading */}
            <div className='flex flex-col justify-center w-[100%] px-4'>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 px-">
                {NAME.toUpperCase()}    
                </h1>
                {/* Content */}
                <p className="text-gray-600 text-lg mb-6 ">
                    {ABOUT}
                </p>
                {/* <p className="text-gray-600 text-lg mb-6">
                    {ABOUT}
                </p> */}
                {/* Why Us Section */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">WHY US?</h2>
                <ul className="list-inside text-gray-600 text-lg space-y-2 mb-6">
                    {
                        WHYCHOOSEUS.map((item,index)=>{
                            return(
                                <li className='flex items-center gap-2' key={index}>  
                                <CheckOutlined style={{color:'green'}}/>
                                {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
          </div>
        </div>
    );
};

export default AboutUs;
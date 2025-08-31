import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import Lottie from 'lottie-react'; // Import Lottie
import thankYouAnimation from '../../assets/thankyou.json'; // Import your Lottie animation
import { ADDRESS, color, MAIL, NAME, PHONE_NUMBER1, PHONE_NUMBER2, PHONE_NUMBER3 } from '../../../constant';
import { IdcardOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';
import contactus from '../../assets/contactus.json'; // Import your Lottie animation
import axios from 'axios';
import { CONTACT_MAIL } from '../../../ApiConstant';

const { TextArea } = Input;

const ContactUs = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        const values = form.getFieldsValue(); // Get the latest values
        console.log('Form Values Before Reset:', values); 
        form.resetFields(); 
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
      try {
        console.log('Form Values:', values);
        const reponse = await axios.post(CONTACT_MAIL,values);
        if(reponse.status == 200)
            setIsModalVisible(false); 
            setIsSuccessModalVisible(true); 
            form.resetFields(); 
      } catch (error) {
        console.log(error)
        message.error("Message not Send !")

      }
    };


    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    return (
        <div className="min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">CONTACT US</h1>
            <div className="w-full mx-auto flex flex-col lg:flex-row gap-8">
                {/* Form Modal */}
                <Modal
                    title="SEND US A MESSAGE"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={null} // Remove default footer buttons
                >
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        {/* Name Field */}
                        <Form.Item
                            label="NAME"
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        {/* Email Field */}
                        <Form.Item
                            label="EMAIL"
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                        {/* Message Field */}
                        <Form.Item
                            label="MESSAGE"
                            name="message"
                            rules={[{ required: true, message: 'Please enter your message!' }]}
                        >
                            <TextArea rows={4} placeholder="Enter your message" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                SEND MESSAGE
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Success Modal */}
                <Modal
                    title="Thank You!"
                    open={isSuccessModalVisible}
                    onCancel={handleSuccessModalClose}
                    footer={null} // Remove default footer buttons
                >
                    <div className="text-center">
                        {/* Lottie Animation */}
                        <p className="text-lg text-gray-600 mt-4">
                            Thank you for contacting us! We will get back to you soon.
                        </p>
                        <Lottie
                            animationData={thankYouAnimation}
                            loop={true}
                            style={{ height: 200, margin: '0 auto' }}
                            onError={(error) => console.error('Lottie error:', error)}
                        />

                    </div>
                </Modal>

                <div className='w-full h-full mx-auto p-6'>
                    <Lottie
                        animationData={contactus}
                        loop={true}
                        style={{ height: 400, margin: '0 auto' }} // Set height here
                        onError={(error) => console.error('Lottie error:', error)}
                        onClick={showModal}
                    />
                </div>
                {/* Right Side - Contact Information */}
                <div className="w-full h-full mx-auto shadow rounded-md p-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        {NAME.toUpperCase()}
                    </h2>

                    <div className="space-y-4 text-gray-600 text-lg">
                        <p>
                            <span className="font-semibold flex flex-row items-center gap-4"> <IdcardOutlined style={{ color: color.color, fontSize: '30px' }} /> ADDRESS:</span>
                            <span className='pl-8 text-xl font-bold'>{ADDRESS}</span>
                        </p>
                        <p>
                            <span className="font-semibold flex flex-row items-center gap-4"><PhoneOutlined style={{ color: color.color, fontSize: '30px' }}/>PHONE:</span>
                            <ul className='list-none pl-8'>
                                <li className='pl-8 text-xl font-bold'>{PHONE_NUMBER1}</li>
                                <li className='pl-8 text-xl font-bold'>{PHONE_NUMBER2}</li>
                                <li className='pl-8 text-xl font-bold'>{PHONE_NUMBER3}</li>
                            </ul>
                        </p>
                        <p>
                            <span className="font-semibold flex flex-row items-center gap-4"><MailOutlined  style={{ color: color.color }}/>EMAIL:</span>
                            <span className='pl-8 text-xl font-bold'> {MAIL}</span>
                        </p>
                    </div>

                    {/* Send Message Button */}
                    <div className="mt-8 text-center">
                        <Button type="primary" onClick={showModal} className="w-[50%] lg:w-auto">
                            SEND MESSAGE
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.558461588251!2d77.86404707450298!3d9.460058382093669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cd2b928cfcb7%3A0x642b70a1c2a04231!2sSri%20Sivasakthi%20Crackers!5e0!3m2!1sen!2sin!4v1756666743634!5m2!1sen!2sin"  style={{border:0 , width:'100%', height:'5   00px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message, Flex, Modal, QRCode } from 'antd';
import { RECEIPT_NAME, UPIID } from '../../../constant';

const { Text } = Typography;

export const CustomerDetailsForm = ({ onSubmit, summaryProducts, totalAmount }) => {
        const [showQRModal, setShowQRModal] = useState(false);
    const [customerData, setCustomerData] = useState(null);

    const [form] = Form.useForm();

        const [isMobileDevice, setIsMobileDevice] = useState(false);

 useEffect(() => {
        const checkDeviceType = () => {
            // Method 1: Check user agent
            const userAgent = navigator.userAgent;
            const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            
            // Method 2: Check screen size and touch capability
            const hasTouchPoint = navigator.maxTouchPoints > 1;
            const isSmallScreen = window.innerWidth < 768;
            
            // Method 3: Check platform
            const isMobilePlatform = /Android|iPhone|iPad|iPod/i.test(navigator.platform);
            
            // Consider it mobile if multiple indicators suggest it
            // We'll use a weighted approach
            let mobileScore = 0;
            if (isMobileUserAgent) mobileScore += 2;
            if (hasTouchPoint) mobileScore += 1;
            if (isSmallScreen) mobileScore += 1;
            if (isMobilePlatform) mobileScore += 2;
            
            console.log('Mobile detection score:', mobileScore);
            
            // If score is 3 or more, consider it a mobile device
            setIsMobileDevice(mobileScore >= 3);
        };

        checkDeviceType();
        
        // Also check on window resize
        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);
    const upiLink = `upi://pay?pa=${UPIID}&pn=${encodeURIComponent(RECEIPT_NAME)}&am=${totalAmount}&cu=INR&tn=Payment for fireworks order`;


    const onFinish = (values) => {
        if (totalAmount < 2500) {
            message.error('Minimum booking value is ₹2500. Please add more items.');
            return;
        }
        setCustomerData(values);
    
        
        if (isMobileDevice) {
            // For mobile, proceed with direct UPI redirection
            console.log('Redirect to mobile UPI');
            window.location.href = upiLink; 
            onSubmit(values);
        } else {
            console.log('show QR modal');
            setShowQRModal(true);
        }
    };

     const handleQRPaymentSuccess = () => {
        setShowQRModal(false);
        onSubmit(customerData);
    };

    const handleQRPaymentCancel = () => {
        // Just close the modal without submitting
        setShowQRModal(false);
    };

    // Calculate dynamic booking details
    const noOfItems = summaryProducts.reduce((total, product) => total + product.qty, 0);
    const noOfProducts = summaryProducts.length;

    return (
        <>
        <Form form={form} onFinish={onFinish} layout="vertical">
            {/* Customer Details Section */}
            {/* <h3 className="text-lg font-semibold mb-2">Customer Details</h3> */}
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                    { required: true, message: 'Please enter your phone number' },
                    { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' },
                ]}
            >
                <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please enter your address' }]}
            >
                <Input.TextArea placeholder="Enter your address" />
            </Form.Item>
            <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please enter your city' }]}
            >
                <Input placeholder="Enter your city" />
            </Form.Item>
            <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: 'Please enter your state' }]}
            >
                <Input placeholder="Enter your state" />
            </Form.Item>
            <Form.Item
                label="Pincode"
                name="pincode"
                rules={[
                    { required: true, message: 'Please enter your pincode' },
                    { pattern: /^\d{6}$/, message: 'Please enter a valid 6-digit pincode' },
                ]}
            >
                <Input placeholder="Enter your pincode" />
            </Form.Item>

            {/* Booking Details Section */}
            <h3 className="text-lg font-semibold mt-6 mb-2 bg-[red] text-center">Booked Items</h3>
            <Flex gap={10} align="center" style={{ width: "100%" }} >
                <Text>No. of Items : </Text>
                <Form.Item name="noOfItems" initialValue={noOfItems} style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}
                >
                    <Text style={{ fontSize: "16px", fontWeight: "bold", color: "" }}>{noOfItems}</Text>
                </Form.Item>
            </Flex>
            <Flex gap={10} align="center" style={{ width: "100%" }}>
                <Text>No. of Products : </Text>
                <Form.Item labelAlign="right" name="noOfProducts" initialValue={noOfProducts} style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}
                >
                    <Text style={{ fontSize: "16px", fontWeight: "bold", color: "" }}>{noOfProducts}</Text> {/* Dynamic value */}
                </Form.Item>
            </Flex>
            <Flex gap={10} align="center" style={{ width: "100%" }}>
                <Text>Total Amount : </Text>
                <Form.Item
                    labelAlign="right"
                    name="total_amount"
                    style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}
                    initialValue={totalAmount.toFixed(3)}
                >
                    <Text style={{ fontSize: "16px", fontWeight: "bold", color: "green" }}>
                        ₹{totalAmount.toFixed(3)}
                    </Text>
                </Form.Item>
            </Flex>


            {totalAmount < 2500 && (
                <div className="text-red-500 mb-4">
                    Minimum booking value is ₹2500. Please add more items.
                </div>
            )}

            {/* Terms and Conditions Section */}
            <h3 className="text-lg font-semibold mt-6 mb-2 bg-[red] text-center">Booking Terms & Conditions</h3>
            <ul className="list-disc pl-6">
                <li>Shipping/Transportation</li>
                <ul className="list-disc pl-6">
                    <li>No door delivery</li>
                    <li>Transportation charges extra</li>
                    <li>Transit Insurance/Octar charge extra</li>
                    <li>Goods cannot be sent through Courier</li>
                    <li>Shipping of goods safely depends on the transporter</li>
                    <li>Delivery time</li>
                    <ul className="list-disc pl-6">
                        <li>Tamil Nadu - 3 Days</li>
                        <li>Kerala, Andhra, Karnataka - 6 Days</li>
                        <li>Rest of India - 2 weeks</li>
                    </ul>
                </ul>
                <li>Minimum Booking Value: ₹2500</li>
                <li>Modification Terms</li>
                <ul className="list-disc pl-6">
                    <li>
                        Due to the nature of the Fireworks industry, the products are subject to modification.
                    </li>
                    <li>
                        If the items you ordered are not available at the time of billing/packing, some other
                        product of the same or more value will be sent instead of the unavailable item.
                    </li>
                </ul>
                <li>Other Terms</li>
                <ul className="list-disc pl-6">
                    <li>E & O C</li>
                    <li>Agree you are 18 years & above</li>
                    <li>Prices are inclusive of 18% GST</li>
                    <li>Subject to Stakeful Jurisdiction</li>
                </ul>
            </ul>

            {/* Agreement Checkbox */}
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('You must agree to the terms'),
                    },
                ]}
            >
                <div className="mt-4">
                    <input type="checkbox" id="agreement" className="mr-2" />
                    <label htmlFor="agreement">I agree to Terms of booking agreement.</label>
                </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full mt-4"
                    disabled={totalAmount < 2500} // Disable if amount < 2500
                >
                    Click the button to send your Booking
                </Button>
            </Form.Item>
        </Form>
         <Modal
                title="Scan QR Code to Pay"
                open={showQRModal}
                onCancel={handleQRPaymentCancel}
                footer={[
                    <Button key="cancel" onClick={handleQRPaymentCancel}>
                        Cancel
                    </Button>,
                    <Button key="success" type="primary" onClick={handleQRPaymentSuccess}>
                        I've Completed Payment
                    </Button>,
                ]}
                width={400}
            >
                <div style={{ textAlign: 'center', padding: '20px 0' ,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <QRCode
                        value={upiLink} 
                        size={256}
                        icon="/fireworks-icon.png" // Optional: add your icon
                    />
                    <div style={{ marginTop: '16px' }}>
                        <Text strong>Amount: ₹{totalAmount.toFixed(2)}</Text>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                        <Text>Scan this QR code with any UPI app to complete your payment</Text>
                    </div>
                </div>
            </Modal>
        </>
    );
};

//  default CustomerDetailsForm;
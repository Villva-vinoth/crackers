import React, { useEffect, useState } from 'react';
import { Table, InputNumber, Button, Modal } from 'antd';
import { CustomerDetailsForm } from '../CustomerForm';
// import { PRODUCT as product, RECEIPT_NAME, UPIID  } from '../../../constant';
import { useLocation, useNavigate } from 'react-router';
import { useFormProvider } from '../../context/FormProvider';
import Lottie from 'lottie-react';
import thankYouAnimation from '../../assets/thankyou.json';
import axios from 'axios';
import { CREATE_ORDER, MAIL } from '../../../ApiConstant';
export const OrderPage = () => {


  const [products, setProducts] = useState({});

  const {products : product=[] } = useFormProvider();

    // const [convertedProducts, setConvertedProducts] = useState({});


    const {pathname} = useLocation()

  useEffect(() => {
    const element =document.getElementById('order_now')
    // const admin = document.getElementById('admin_header')

      if(pathname.includes("/order")){
        if(element)
        element.style.display="none";
      }
  }, [pathname]);

 useEffect(() => {
    if (product.length > 0) {
      const converted = {};
      
      product.forEach(product => {
        const category = product.category_name;
        if (!converted[category]) {
          converted[category] = [];
        }
        
        converted[category].push({
          code: product.code,
          product: product.name,
          rate: product.discount,
          qty: 0,
          amount: 0
        });
      });

      // console.log('Converted Products:', converted);
      
      setProducts(converted);
    }
  }, [product]);

  // console.log('Converted Products:', products);

  const [summaryVisible, setSummaryVisible] = useState(false);
  const [customerDetailsVisible, setCustomerDetailsVisible] = useState(false);
  const [summaryProducts, setSummaryProducts] = useState([]);

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleSuccessModalOpen =()=>{
        setIsSuccessModalVisible(true);
        setCustomerDetailsVisible(false);
        
    }
    const nav = useNavigate();
    const handleSuccessModalClose =()=>{
        setIsSuccessModalVisible(false);
        nav('/')
    }


  // Calculate total amount for the order page
  const calculateTotalAmount = () => {
    return Object.values(products)
      .flat()
      .reduce((total, product) => total + product.amount, 0);
  };

  // Calculate total amount for the summary table
  const calculateSummaryTotalAmount = () => {
    return summaryProducts.reduce((total, product) => total + product.amount, 0);
  };

  const handleQuantityChange = (value, category, index) => {
    const newProducts = { ...products };
    newProducts[category][index].qty = value;
    newProducts[category][index].amount = value * newProducts[category][index].rate;
    setProducts(newProducts);
  };

  const handleBookNow = () => {
    const selectedProducts = Object.entries(products).flatMap(([category, items]) =>
      items
        .filter(item => item.qty > 0)
        .map(item => ({ ...item, category }))
    );
    setSummaryProducts(selectedProducts);
    setSummaryVisible(true);
  };

  const handleRemove = (code) => {
    const newProducts = { ...products };
    for (const category in newProducts) {
      newProducts[category] = newProducts[category].map(product =>
        product.code === code ? { ...product, qty: 0, amount: 0 } : product
      );
    }
    setProducts(newProducts);
    setSummaryProducts(summaryProducts.filter(product => product.code !== code));
  };

  const handleContinueShopping = () => {
    setSummaryVisible(false);
  };

  const handleConfirmOrder = () => {
    setSummaryVisible(false);
    setCustomerDetailsVisible(true); // Open the CustomerDetailsForm
  };

  const handleCustomerDetailsSubmit =async (customerDetails) => {
    // Handle customer details submission
    // console.log('Customer Details:', customerDetails);
    // Navigate to deep UPI linking
    // console.log("products", summaryProducts);
    const result = {
      ...customerDetails,
      order_details: summaryProducts,
      totalAmount: calculateSummaryTotalAmount(),
    }

    try {
      const response = await axios.post(CREATE_ORDER, result);
    console.log("Order Response:", response.data);
    if(response.data.success){
      const mail = await axios.post(MAIL, response.data.data);
    }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error processing your order. Please try again later.");
      return; // Exit the function if there's an error
    }

    // handleConfirmOrder();
    handleSuccessModalOpen();
  };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    
    // Allow only numbers (0-9), backspace, tab, and arrow keys
    if (
      charCode > 31 && 
      (charCode < 48 || charCode > 57) && 
      charCode !== 46 // Allow decimal point if needed
    ) {
      e.preventDefault();
    }
  };

  // Handle paste event to prevent non-numeric input
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d*\.?\d*$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  const summaryColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹ ${amount.toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleRemove(record.code)}>
          Remove
        </Button>
      ),
    },
  ];

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Discount Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      render: (text, record, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleQuantityChange(value, record.category, index)}
          onKeyDown={handleKeyPress}
                      onPaste={handlePaste}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Page</h1>
      {Object.entries(products).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-center bg-[#40DFEF] p-2 text-[blue] rounded-lg">{category}</h2>
          <Table
            dataSource={items.map(item => ({ ...item, category }))}
            columns={columns}
            pagination={false}
            rowKey="code"
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: 'blue', // Set header background color
                      color: 'white', // Set header text color
                      fontWeight: 'bold', // Optional: Add bold text
                    }}
                  />
                ),
              },
            }}
          />
        </div>
      ))}
     <div className='fixed bottom-0 left-0 right-0 bg-white p-4 z-999'>
       <div className="mt-4">
        <strong>Total Amount: ₹ {calculateTotalAmount().toFixed(2)}</strong>
      </div>
      <Button type="primary" onClick={handleBookNow} className="mt-4">
        Book Now
      </Button>
     </div>

      {/* Summary Modal */}
      {/* <Modal
        title="Order Summary"
        visible={summaryVisible}
        onCancel={handleContinueShopping}
        footer={[
          <Button key="continue" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>,
        ]}
        bodyStyle={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {Object.entries(
          summaryProducts.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
          }, {})
        ).map(([category, items]) => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <Table
              dataSource={items}
              columns={summaryColumns}
              pagination={false}
              rowKey="code"
            />
          </div>
        ))}
        <div className="mt-4">
          <strong>Total Amount: ${calculateSummaryTotalAmount().toFixed(2)}</strong>
        </div>
      </Modal> */}
      <Modal
        title="Order Summary"
        open={summaryVisible}
        onCancel={handleContinueShopping}
        footer={[
          <Button key="continue" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmOrder}
            disabled={calculateSummaryTotalAmount() < 2500} // Disable if amount < 2500
          >
            Confirm Order
          </Button>,
        ]}
        styles={{
          body: {
            maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden'
          }
        }}
      // bodyStyle={{ }}
      >
        {Object.entries(
          summaryProducts.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
          }, {})
        ).map(([category, items], index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-center bg-[#FFD3A3] p-1 text-[blue] rounded-lg">{category}</h3>
            <Table
              dataSource={items}
              columns={summaryColumns}
              pagination={false}
              rowKey="code"
              // style={{  background:"red"}}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        backgroundColor: '#40DFEF', // Set header background color
                        color: 'white', // Set header text color
                        fontWeight: 'bold', // Optional: Add bold text
                      }}
                    />
                  ),
                },
              }}
            />
          </div>
        ))}
        <div className="mt-4">
          <strong>Total Amount: ₹ {calculateSummaryTotalAmount().toFixed(2)}</strong>
        </div>
        {calculateSummaryTotalAmount() < 2500 && (
          <div className="text-red-500 mt-2">
            Minimum booking value is ₹2500. Please add more items.
          </div>
        )}
      </Modal>

      {/* Customer Details Form */}
      <Modal
        title="Billing Details"
        open={customerDetailsVisible}
        onCancel={() => setCustomerDetailsVisible(false)}
        footer={null}
        styles={
          {
            body: {
              maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden'
            }
          }
        }
      >
        <CustomerDetailsForm
          onSubmit={handleCustomerDetailsSubmit}
          summaryProducts={summaryProducts} // Pass summary products
          totalAmount={calculateSummaryTotalAmount()} // Pass total amount
        />
      </Modal>
      <Modal
                title="Thank You!"
                    open={isSuccessModalVisible}
                    onCancel={handleSuccessModalClose}
                    footer={null} // Remove default footer buttons
                >
                    <div className="text-center">
                        {/* Lottie Animation */}
                        <p className="text-lg text-gray-600 mt-4">
                            Thank you for your order! Our team will review your order and get back to you soon.
                        </p>
                        <Lottie
                            animationData={thankYouAnimation}
                            loop={true}
                            style={{ height: 200, margin: '0 auto' }}
                            onError={(error) => console.error('Lottie error:', error)}
                        />

                    </div>
                </Modal>
    </div>
  );
};

// default OrderPage;
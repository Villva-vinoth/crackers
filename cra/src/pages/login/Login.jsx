import React from 'react';
import { Form, Input, Button, Flex } from 'antd';
import { LockFilled, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { LOGIN } from '../../../ApiConstant';



const LoginForm = () => {

  const nav = useNavigate();

  // const [form] = Form.useForm();
  const onFinish = async (values) => {
    // form.validateFields().then((values) => {
    //   console.log('Form values:', values);    
    // });
    // console.log('Success:', values);
    try {
       const response = await axios.post(LOGIN,values);
       console.log(response,"login response");
       if(response.status==200){
         nav('/admin');
         localStorage.setItem('token', `${response.data.email}-${new Date().getTime()}`);
       }
      else{
          alert('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }

    // nav('/admin');

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          // form={form}
        >
          <Flex vertical gap={10}>
            <label className="text-lg font-medium">
              <MailOutlined className="mr-2" />
              Email
            </label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
          </Flex>

          <Flex vertical gap={10}>
            <label className="text-lg font-medium">
              <LockFilled className="mr-2" />
              Password
            </label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Flex>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
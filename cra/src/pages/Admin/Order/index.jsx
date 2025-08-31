import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Popconfirm, message, Space, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { ORDER_HISTORY } from '../../../../constant';
import EditOrders from './EditOrder';
import { LIST_ORDER } from '../../../../ApiConstant';
import axios from 'axios';

const Orders = () => {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);



    const [orders,setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(LIST_ORDER);
            console.log(response.data.data,"orders data from api")
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        
    }

    useEffect(() => {
        fetchOrders();
    }, [isEditModalVisible]);

    const handleRefresh = () => {
        fetchOrders();
        message.success('Order list refreshed');
    }


const [searchText, setSearchText] = useState("");
const [searchedColumn, setSearchedColumn] = useState("");
const searchInput = useRef(null);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText("");
};

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : "",
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
});

    const  options = (type) =>{
        switch(type){
            case 0:
                return "Processing"
            case 1 :
                return "Order Confirmed"
            case 2 :
                return "Delivery"
            case 3 :
                return "Completed"
            case 4 : 
                return "Cancelled"
        }
    }

        const  payment_options = (type) =>{
        switch(type){
            case 0:
                return "Processing"
            case 1 :
                return "Success"
            case 2 :
                return "Cancelled"
        }
    }


       
    
    const handleOpen = (record, forWhat) => {
        if(forWhat === 'edit'){
        setSelectedRecord(record);
        setIsEditModalVisible(true);
        }
        else{
            // setIsAddModalVisible(true);
            console.log('Add:', record);
        }

    };

    // const handleDelete = (record) => {
    //     console.log('Delete:', record);
    //     message.success('Category deleted successfully!');
    // };   

    const columns = [
        {
            title: 'ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 100,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            ...getColumnSearchProps("order_id"), // ✅ enable type + search

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 200,
        },
         {
            title: 'phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 100,
        },
        {
            title: 'Amount Purchased',
            dataIndex: 'total_amount',
            key: 'total_amount',
            responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 50,
            render: (value) => `$${value}`, // Format as currency
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render :(values)=>(
              <div>{options(values)}</div>     
        ),
          
          responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
          width: 200,
      },
       {
          title: 'Payment Status',
          dataIndex: 'payment_status',
          key: 'payment_status',
          render :(values)=>(
              <div>{payment_options(values)}</div>     
        ),
          
          responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
          width: 200,
      },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <div>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleOpen(record,"edit")}
                    />
                </div>
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
        },
    ];

    return (
          <div style={{ padding: '20px' , overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Orders</h1>
            </div>
           <Button type="primary" style={{ marginBottom: 16 }}  onClick={() =>handleRefresh()}>
             <CheckCircleOutlined />   Refresh
            </Button>
            <Table
                dataSource={orders}
                columns={columns}
                // pagination={true}
                scroll={{ x: true,  y: 400 }}

                rowKey="id"
            />
              <EditOrders
                isModalVisible={isEditModalVisible}
                setIsModalVisible={setIsEditModalVisible}
                selectedRecord={selectedRecord}
            />
           
        </div>
    );
};

export default Orders;
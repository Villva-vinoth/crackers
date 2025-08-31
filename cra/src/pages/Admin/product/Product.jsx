import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Popconfirm, message, Space, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { PRODUCT } from '../../../../constant';
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
import axios from 'axios';
import { APIURL, DELETE_PRODUCT, LIST_CATEGORY, LIST_PRODUCT } from '../../../../ApiConstant';

const Products = () => {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isDelete,setIsDelete] = useState(false);

    const [products,setProducts] = useState([]);

     const fetchProducts = async () => {
        try {
            const response = await axios.get(LIST_PRODUCT);
            console.log(response.data.data,"Product data from api")
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
    }

    

    useEffect(() => {
        fetchProducts();
    }, [isDelete,isAddModalVisible,isEditModalVisible]);

    const handleOpen = (record, forWhat) => {
        if(forWhat === 'edit'){
        setSelectedRecord(record);
        setIsEditModalVisible(true);
        }
        else{
            setIsAddModalVisible(true);
            console.log('Add:', record);
        }

    };

    const handleDelete = async (record) => {
       try {
        setIsDelete(true);
        console.log('Delete:', record);
        await axios.delete(`${DELETE_PRODUCT}/${record.id}`);
        setTimeout(() => {
            setIsDelete(false);
        }, 2000);
        message.success('Product deleted successfully!');
       } catch (error) {
            console.error('Error deleting Product:', error);
       }
    };


const [category,setCategory] = useState([]);

 const fetchCategories = async () => {
        try {
            const response = await axios.get(LIST_CATEGORY);
            // console.log(response.data.data,"category data from api")
            const data = response.data.data.map(cat => ({
                value: cat.id,
                label: cat.name
            }));
            // console.log(data,"category data formatted")
            setCategory(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
    }

    useEffect(() => {
        fetchCategories();
    }, []);


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
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
                        ...getColumnSearchProps("id"), // ✅ enable type + search

        },
         {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            width: 100,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
                        ...getColumnSearchProps("code"), // ✅ enable type + search

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 200,
                        ...getColumnSearchProps("name"), // ✅ enable type + search

        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            // responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 200,
        },
        {
          title: 'Discount',
          dataIndex: 'discount',
          key: 'discount',
          // responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
          width: 200,
      },
       {
                   title: 'Image',
                   dataIndex: 'image',
                   key: 'image',
                   render: (image) => {
                        const url = APIURL + image;
                       return(
                       <img src={url} alt="Product" style={{ width: 50, height: 50, borderRadius: 4 }} />
                   )},
                   responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
       
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
                    <Popconfirm
                        title="Are you sure you want to delete this Product?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Popconfirm>
                </div>
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
        },
    ];

    return (
        <div style={{ padding: '20px' , overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Products</h1>
                <Button type="primary" onClick={() => handleOpen({},"add")}>Add Product</Button>
            </div>
            <Table
                dataSource={products}
                columns={columns}
                // pagination={true}
                scroll={{ x: true,  y: 400 }}

                rowKey="id"
            />
            <EditProducts
                isModalVisible={isEditModalVisible}
                setIsModalVisible={setIsEditModalVisible}
                selectedRecord={selectedRecord}
                category={category}
            />
             <AddProducts
                isModalVisible={isAddModalVisible}
                setIsModalVisible={setIsAddModalVisible}
                selectedRecord={selectedRecord}
                category={category}
            />
        </div>
    );
};

export default Products;
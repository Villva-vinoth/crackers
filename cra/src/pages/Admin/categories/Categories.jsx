import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Popconfirm, message, Space, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import EditCategories from './EditCategories';
import AddCategories from './AddCategories';
import { useFormProvider } from '../../../context/FormProvider';
import axios from 'axios';
import { LIST_CATEGORY, APIURL,DELETE_CATEGORY } from '../../../../ApiConstant';

const Categories = () => {



    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDelete,setIsDelete] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const [category,setCategory] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(LIST_CATEGORY);
            console.log(response.data.data,"category data from api")
            setCategory(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
    }

    useEffect(() => {
        fetchCategories();
    }, [isAddModalVisible,isEditModalVisible,isDelete]);

    // console.log(category,"category data");

    
    const handleOpen = (record, forWhat) => {
        if(forWhat === 'edit'){
        setSelectedRecord(record);
        setIsEditModalVisible(true);
        }
        else{
            setIsAddModalVisible(true);
        }

    };

    const handleDelete = async (record) => {
       try {
        setIsDelete(true);
        console.log('Delete:', record);
        await axios.delete(`${DELETE_CATEGORY}/${record.id}`);
        setTimeout(() => {
            setIsDelete(false);
        }, 2000);
        message.success('Category deleted successfully!');
       } catch (error) {
            console.error('Error deleting category:', error);
       }
    };


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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 200,
            ...getColumnSearchProps("name"), // ✅ enable type + search

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            responsive: ['md', 'lg', 'xl', 'xxl'], // Show on medium screens and larger
            width: 400,
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
                        title="Are you sure you want to delete this category?"
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
                <h1>Categories</h1>
                <Button type="primary" onClick={() => handleOpen({},"add")}>Add Category</Button>
            </div>
             <Table
                dataSource={category}
                columns={columns}
                // pagination={true}
                scroll={{ x: true,  y: 400 }}

                rowKey="id"
            />
            <EditCategories
                isModalVisible={isEditModalVisible}
                setIsModalVisible={setIsEditModalVisible}
                selectedRecord={selectedRecord}
            />
             <AddCategories
                isModalVisible={isAddModalVisible}
                setIsModalVisible={setIsAddModalVisible}
                selectedRecord={selectedRecord}
            />
        </div>
        
    );
};

export default Categories;
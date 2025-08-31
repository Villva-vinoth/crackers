import React, { useEffect, useState } from 'react'
import CustomForm from '../CustomForm/CustomForm'
import { EDIT_PRODUCT, LIST_CATEGORY } from '../../../../ApiConstant';
import axios from 'axios';

const EditProducts = ({isModalVisible,setIsModalVisible,selectedRecord,category}) => {



    const formItem =[
        {
            name:"image",
            label:"Image ",
            placeHolder:"Upload the Image",
            required:true,
            rules:[],
            type:"file"
        },
        {
            name:"name",
            label:"Name ",
            placeHolder:"Enter the Product Name",
            required:true,
            rules:[],
            type:"text"
        },
        {
            name:"code",
            label:"Product Code ",
            placeHolder:"Enter the Product Code",
            required:true,
            rules:[],
            type:"text"
        },
        {
            name:"price",
            label:"price",
            placeHolder:"Enter the Price",
            required:true,
            rules:[],
            type:"number"
        },
        {
            name:"discount",
            label:"Discount",
            placeHolder:"Enter the Discount",
            required:true,
            rules:[],
            type:"number"
        },
         {
            name:"quantity",
            label:"Quantity",
            placeHolder:"Enter the Quantity",
            required:true,
            rules:[],
            type:"text"
        },
        {
            name:"category",
            label:"category",
            placeHolder:"Select the Category",
            required:true,
            rules:[],
            type:"select",
            options:category
        },
    ]

    const data ={
        formItem:formItem,
        action:"edit",
        disableForm:false,
        selectedRecord:selectedRecord,
        isModalVisible,
        setIsModalVisible,
        message:"Product updated successfully!",
        title:"Edit Product",
        api:EDIT_PRODUCT,
        
    }

  return (
    <CustomForm {...data}/>
  )
}

export default EditProducts
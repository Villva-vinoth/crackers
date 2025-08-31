import React from 'react'
import CustomForm from '../CustomForm/CustomForm'
import { EDIT_ORDER } from '../../../../ApiConstant'

const EditOrders = ({isModalVisible,setIsModalVisible,selectedRecord}) => {

    const formItem =[
        {
            name:"order_id",
            label:"Order_id",
            placeHolder:"Enter the Order Id",
            required:true,
            rules:[],
            type:"text",
            // disabled:true,
        },
        {
            name:"name",
            label:"Name ",
            placeHolder:"Enter the Product Name",
            required:true,
            rules:[],
            type:"text",
            // disabled:true,
        },
        {
            name:"email",
            label:"Email",
            placeHolder:"Enter the Product Email",
            required:true,
            rules:[],
            type:"text",
            // disabled:true,
        },

        {
            name:"total_amount",
            label:"Total Amount",
            placeHolder:"Enter the Amount",
            required:true,
            rules:[],
            type:"number",
            // disabled:true,
        },
        {
            name:"phone_number",
            label:"Phone Number",
            placeHolder:"Enter the Phone Number",
            required:true,
            rules:[],
            type:"text",
            // disabled:true,
        },
        {
            name:"address",
            label:"Address",
            placeHolder:"Enter the Billing Address",
            required:true,
            rules:[],
            type:"textArea",
            // disabled:true,
        },
        {
            name:"status",
            label:"Status",
            placeHolder:"Select the Category",
            required:true,
            rules:[],
            type:"select",
            // disabled: selectedRecord && selectedRecord.status ==4 ? true : false,
            options:[
                {
                    value:0,
                    label:"Processing",
                    
                },
                {
                    value:1,
                    label:"Order Confirmed"
                },
                {
                    value:2,
                    label:"Delivery"
                },
                {
                    value:3,
                    label:"Completed"
                },
                {
                    value:4,
                    label:"Cancelled"
                },
                {
                    value:5,
                    label:"Rejected"
                },
            ]
        },
        {
            name:"payment_status",
            label:"Payment Status",
            placeHolder:"Select the Category",
            required:true,
            rules:[],
            type:"select",
            // disabled: selectedRecord && selectedRecord.status ==3 ? true : false,
            options:[
                {
                    value:0,
                    label:"Processing",
                },
                {
                    value:1,
                    label:"Paid"
                },
                {
                    value:2,
                    label:"Failed"
                },
            ]
        },
    ]

    const data ={
        formItem:formItem,
        action:"edit",
        disableForm:selectedRecord &&selectedRecord.status ==3 ? true :false,
        selectedRecord:selectedRecord,
        isModalVisible,
        setIsModalVisible,
        message:"Order updated successfully!",
        title:"Edit Order",
        api:EDIT_ORDER,
        
    }

  return (
    <CustomForm {...data}/>
  )
}

export default EditOrders
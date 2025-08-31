import React from 'react'
import CustomForm from '../CustomForm/CustomForm'
import { EDIT_CATEGORY } from '../../../../ApiConstant';
const EditCategories = ({isModalVisible,setIsModalVisible,selectedRecord}) => {
    const formItem =[
        {
            name:"image",
            label:"Image",
            placeHolder:"Upload the Image",
            required:true,
            rules:[],
            type:"file"
        },
        {
            name:"name",
            label:"Name",
            placeHolder:"Enter the Categories",
            required:true,
            rules:[],
            type:"text"
        },
        {
            name:"description",
            label:"Description",
            placeHolder:"Enter the Description",
            required:true,
            rules:[],
            type:"textArea"
        }
    ]

    const data ={
        formItem:formItem,
        action:"edit",
        disableForm:false,
        selectedRecord:selectedRecord,
        isModalVisible,
        setIsModalVisible,
        message:"Category updated successfully!",
        title:"Edit Category",
        api:EDIT_CATEGORY,
    }


  return (
    <CustomForm {...data}/>
  )
}

export default EditCategories
import React from 'react'
import CustomForm from '../CustomForm/CustomForm'
import { CREATE_CATEGORY } from '../../../../ApiConstant'

const AddCategories = ({isModalVisible,setIsModalVisible,selectedRecord}) => {
    const formItem =[
        {
            name:"image",
            label:"Image",
            placeHolder:"Upload the Image",
            required:true,
            rules:[
                {
                    required:true,
                    message:"Please Upload image"
                }
            ],
            type:"file"
        },
        {
            name:"name",
            label:"Name",
            placeHolder:"Enter the Categories",
            required:true,
            rules:[
                {
                    required:true,
                    message:"Please enter the image"
                }
            ],
            type:"text"
        },
        {
            name:"description",
            label:"Description",
            placeHolder:"Enter the Description",
            required:true,
            rules:[
                {
                    required:true,
                    message:"Please enter the description"
                }
            ],
            type:"textArea"
        }
    ]

    const data ={
        formItem:formItem,
        action:"create",
        disableForm:false,
        selectedRecord:undefined,
        isModalVisible,
        setIsModalVisible,
        message:"Category Added successfully!",
        title:"Add Category",
        api:CREATE_CATEGORY,
    }

    

  return (
    <CustomForm {...data}/>
  )
}

export default AddCategories
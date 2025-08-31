import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LIST_CATEGORY, LIST_PRODUCT } from "../../../ApiConstant";

export const FormProviderContext = createContext();



export const FormProvider = ({children})=>{

        const [isModalVisible, setIsModalVisible] = useState(false);
        const [selectedRecord, setSelectedRecord] = useState(null);


        const [products, setProducts] = useState([]);
        const [categories, setCategories] = useState([]);


        // console.log(isModalVisible)

         const fetchProducts = async () => {
        try {
            const response = await axios.get(LIST_PRODUCT);
            // console.log(response.data.data,"product data from api")
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
    }

     const fetchCategory = async () => {
        try {
            const response = await axios.get(LIST_CATEGORY);
            // console.log(response.data.data,"Category data from api")
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
    }

  useEffect(() => {
fetchProducts();
fetchCategory();
  }, []);
    
    return (
        <FormProviderContext.Provider value={{isModalVisible, setIsModalVisible,selectedRecord, setSelectedRecord,products, setProducts,categories, setCategories}}>
            {children}
        </FormProviderContext.Provider>
    )
}

export const useFormProvider = ()=>{
    const context = useContext(FormProviderContext);
    return context;
}
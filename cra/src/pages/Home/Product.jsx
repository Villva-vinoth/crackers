import { color, PRODUCT as PRODUCTS } from '../../../constant';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../../../ApiConstant';
// import axios from 'axios';
import { useFormProvider } from '../../context/FormProvider';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const {products =[]} = useFormProvider();

//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get(LIST_PRODUCT);
//             console.log(response.data.data,"product data from api")
//             setProducts(response.data.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
        
//     }
//   useEffect(() => {
// fetchProducts();
//   }, []);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = [...new Set(products.map(product => product.category_name))];
    setCategories(['All', ...uniqueCategories]);
  }, [products]);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category_name === selectedCategory);

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category_name]) {
      acc[product.category_name] = [];
    }
    acc[product.category_name].push(product);
    return acc;
  }, {});


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Products
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Explore our wide range of high-quality crackers and fancy items
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {selectedCategory === 'All' ? (
          // Show all products grouped by category
          Object.entries(groupedProducts).map(([category, products]) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-orange-200">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-4">
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={APIURL + product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                          
                        </div>
                        <div className="flex items-center mt-1">
                            <p className="text-lg font-semibold text-orange-600">₹{product.discount}</p>
                            <p className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</p>
                          </div>
                        {/* <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors duration-200">
                          Add to Cart
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show filtered products
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.code} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={APIURL + product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                      
                    </div>
                    <div className="flex items-center mt-1">
                        <p className="text-lg font-semibold text-orange-600">₹{product.discount}</p>
                        <p className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</p>
                      </div>
                    {/* <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors duration-200">
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Button */}
        <div className="mt-12 text-center fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate('/order')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
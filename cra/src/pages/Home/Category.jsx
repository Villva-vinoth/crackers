import { APIURL, LIST_CATEGORY } from '../../../ApiConstant';
import { useNavigate } from 'react-router';
import React, {  useState } from 'react';
import { useFormProvider } from '../../context/FormProvider';


const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const nav = useNavigate();

  const {categories=[]} = useFormProvider();

  console.log(categories,"categories from context");

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-2">
          Product Categories
        </h1>
        <p className="text-center text-orange-600 mb-10">
          Browse our wide range of firework categories
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={APIURL + category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-orange-700 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-orange-700">{selectedCategory.name}</h2>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <img 
                  src={APIURL + selectedCategory.image} 
                  alt={selectedCategory.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 mb-6">{selectedCategory.description}</p>
                <div className="flex justify-end">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors" onClick={() => {nav('/products')}}>
                    Explore Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

<div className="mt-12 text-center">
          <button
            onClick={() => nav('/products')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Explore All Products
          </button>
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
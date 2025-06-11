import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Category from "../components/Category";
import getAllCategoriesService from "../services/categories/getAllCategoriesService.js";
import Loader from "../components/Loader.jsx";
import scrollToPageTop from "../utils/scrollToPageTop.js";


const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAllCategories() {
    setIsLoading(true);
    const { data } = await getAllCategoriesService();
    // console.log(data);
    setIsLoading(false);
    setAllCategories(data);
    scrollToPageTop();
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <>
      
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="sm:text-3xl text-xl font-bold text-gray-900 mb-8">
          Shop by Category
        </h1>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCategories?.map((category) => (
              <Category key={category._id} category={category}></Category>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;

import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getCategoriesForHomePage from "../services/categories/getCategoriesForHomePage.js";
import Loader from "./Loader.jsx";

function HomeCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchAllCategories() {
    setIsLoading(true);
    const { data } = await getCategoriesForHomePage();
    setCategories(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-lime-200 to-green-100

">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="sm:text-3xl text-xl font-bold text-green-800">Browse Fresh Farm Categories</h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category) => (
              <Link to={`/categories/${category.value}`} key={category._id}>
                <div className="relative group cursor-pointer">
                  <div className="relative h-80 overflow-hidden rounded-xl shadow-md">
                    <img
                      src={category.image.url}
                      alt={category.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-green-300/20 group-hover:from-green-900/70 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-end p-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                        <button className="text-orange-200 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Explore</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <button
              onClick={() => navigate("/categories")}
              className="flex items-center space-x-2 text-green-700 hover:text-green-900 transition-colors duration-300 font-medium"
            >
              <span>See All Categories</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeCategories;

import { useEffect, useState } from "react";
import Loader from "./Loader.jsx";
import getAllFeaturedProductsService from "../services/products/getAllFeaturedProductsService.js";
import Product from "./Product.jsx";

function FeaturedProduts() {
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);

  async function fetchAllProducts() {
    const { data } = await getAllFeaturedProductsService();
    setProducts(data);
    setIsProductLoading(false);
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-green-100 via-lime-200 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sm:text-3xl text-xl font-bold text-green-800 mb-8 border-b-4 border-lime-400 inline-block pb-1">
          🌿 Featured Products
        </h2>
        {isProductLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProduts;

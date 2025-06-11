import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const navigate = useNavigate();
  const isLowStock = product.inStock <= 5;

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-green-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-green-200 overflow-hidden group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <div className="bg-rose-500 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
              {product.discount}% OFF
            </div>
          )}
          {isLowStock && (
            <div className="bg-yellow-400 animate-pulse text-black px-2 py-1 rounded text-xs font-bold shadow-md">
              Only {product.inStock} left!
            </div>
          )}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-base font-semibold text-green-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(Number(product.rating))
                    ? "text-yellow-500 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-lime-700">
            ₹{product.finalPrice}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.actualPrice}
            </span>
          )}
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-md transition-colors duration-200 shadow">
          View Details
        </button>
      </div>
    </div>
  );
}

export default Product;

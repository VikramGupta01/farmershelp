import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function Offer({ offer }) {
  return (
    <Link to={`/products?query=${offer.value}&page=1`} className="group">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="relative h-64 sm:h-72">
          <img
            src={offer.image.url}
            alt={offer.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-md font-bold clip-leaf">
            🌿 -{offer.discount}%
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-lime-100">
          <h3 className="text-2xl font-extrabold text-green-900 mb-2">{offer.title}</h3>
          <p className="text-sm text-green-800 mb-4">{offer.description}</p>

          <div className="flex justify-between items-center">
            <div className="text-lime-700 font-semibold flex items-center gap-2 transition-transform group-hover:translate-x-1 duration-300">
              Shop Fresh
              <ShoppingBag className="h-5 w-5" />
            </div>

            
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Offer;

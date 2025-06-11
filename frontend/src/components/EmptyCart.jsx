import { ShoppingCart, PackagePlus } from 'lucide-react';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 px-4 sm:px-6 bg-[#fdfdf5] rounded-2xl shadow-inner">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 shadow-md">
        <ShoppingCart className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-2">Your Cart is Empty</h2>

      <p className="text-green-700 text-center mb-6 max-w-md text-sm sm:text-base">
        You haven't added any fresh produce yet. <br />
        Browse our selection and add some goodness to your cart!
      </p>

      <a
        href="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-green-500 text-white px-5 py-2.5 rounded-full font-semibold shadow hover:from-lime-500 hover:to-green-600 transition"
      >
        <PackagePlus className="w-5 h-5" />
        Start Shopping
      </a>
    </div>
  );
}

export default EmptyCart;

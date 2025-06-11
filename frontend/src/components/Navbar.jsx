import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, ChevronDown, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cart from './Cart';
import checkLogin from '../services/users/checkLogin.js';
import getProductsByQueryService from '../services/products/getProductsByQueryService.js';
import getSearchSuggestionsService from '../services/products/getSearchSuggestionsService.js';
import { ToastContainer } from 'react-toastify';
import getAllCategoriesService from '../services/categories/getAllCategoriesService.js';
import getCategoriesForHomePage from '../services/categories/getCategoriesForHomePage.js';




const Navbar = () => {
  const [searchSuggestions,setSearchSuggestions] = useState([])
  const [categories,setCategories] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [totalItems,setTotalItem] = useState(0)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate = useNavigate();
  const location = useLocation();

 
  async function fetchAllCategories(){
    const {data} = await getCategoriesForHomePage()
    console.log(data)
    setCategories(data.slice(0,5))
  }
 
  useEffect(()=>{
    if(!searchQuery || searchQuery.length<3)
      return
    const timer = setTimeout(async ()=>{

      const data = await getSearchSuggestionsService(searchQuery,1)
      if(data.status==="success"){
        setSearchSuggestions(data.data)
        setShowSearchSuggestions(true)
      }else{
        setShowSearchSuggestions(false)
      }
      console.log(data)
    },300)
    return ()=> clearTimeout(timer)
  },[searchQuery])
  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(event.target )) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(()=>{
    fetchAllCategories()
  },[])
  function goAndHideCategories() {
    setShowCategories(false);
    navigate("/categories");
  }

  const isActivePath = (path) => {
    return location.pathname === path;
  };
  // for showing products by serach results
  async function searchQuerySubmit(e,type="onsubmit"){
    if(type==="onsumbit")
      e.preventDefault()
    if(!searchQuery)
     return
    setShowSearchSuggestions(false)
    navigate(`/products?query=${searchQuery}&page=1`)

  }

  return (
    <>
    {/* <ToastContainer></ToastContainer> */}
      <nav className="bg-gradient-to-r from-lime-100 via-green-50 to-lime-200 shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <Link to="/" className="sm:text-2xl w-[100px] sm:w-[140px] font-bold text-lime-800">
          <img src="/images/logo-shop.png" className='w-full ' alt="Farm Fresh" />
        </Link>
      </div>

      <div className="hidden md:flex items-center sm:space-x-6">
        <Link 
          to="/" 
          className={`text-lime-900 hover:text-amber-600 transition-colors duration-200 ${
            isActivePath('/') ? 'text-amber-700 font-semibold' : ''
          }`}
        >
          Home
        </Link>
        <div
          className="relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <Link
            to="/categories"
            className={`flex items-center space-x-1 text-lime-900 hover:text-amber-600 transition-colors duration-200 ${
              isActivePath('/categories') ? 'text-amber-700 font-semibold' : ''
            }`}
          >
            <span>Categories</span>
            <ChevronDown className="h-4 w-4" />
          </Link>
          {showCategories && (
            <div className="absolute top-full left-0 w-64 mt-1 bg-white rounded-xl shadow-lg py-2 z-50">
              {categories?.map((category) => (
                <Link
                  key={category.title}
                  to={`/categories/${category.value}`}
                  className="flex items-center px-4 py-2 hover:bg-lime-50"
                >
                  <img
                    src={category.image.url}
                    alt={category.title}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-3 text-lime-900">{category.title}</span>
                </Link>
              ))}
              <button 
                onClick={goAndHideCategories} 
                className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-lime-700 hover:text-amber-700 transition-colors duration-200"
              >
                See more
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <Link 
          to="/offers" 
          className={`text-lime-900 hover:text-amber-600 transition-colors duration-200 ${
            isActivePath('/offers') ? 'text-amber-700 font-semibold' : ''
          }`}
        >
          Offers
        </Link>
        <Link 
          to="/contact" 
          className={`text-lime-900 hover:text-amber-600 transition-colors duration-200 ${
            isActivePath('/contact') ? 'text-amber-700 font-semibold' : ''
          }`}
        >
          Contact
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div id="search-container" className="relative">
          <div onKeyDown={(e)=>e.key==="Enter" && searchQuerySubmit(e,"usingkeydown")} className="flex items-center">
            <input
              type="text"
              placeholder="Search vegetables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${
                isSearchOpen ? 'sm:w-40' : 'hidden'
              } transition-all duration-300 px-4 py-2 rounded-l-full border border-r-0 border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500`}
            />
            <button 
              onClick={() => {
                setShowSearchSuggestions(false)
                setIsSearchOpen(!isSearchOpen)
              }}
              className="p-2 hover:bg-lime-200 rounded-full"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-lime-700" />
            </button>
          </div>
          {showSearchSuggestions && searchQuery && (
            <div className="absolute top-full -left-5 w-[300px] mt-1 bg-white rounded-xl shadow-lg py-2 z-50">
              {searchSuggestions.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center px-4 py-2 hover:bg-lime-50 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/product/${product._id}`;
                    setShowSearchSuggestions(false);
                  }}
                >
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-lime-900">{product.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link 
          to="/profile?tab=me" 
          className={`p-2 hover:bg-lime-200 rounded-full ${
            isActivePath('/profile') ? 'bg-lime-200' : ''
          }`}
          aria-label="Profile"
        >
          <User className="h-5 w-5 text-lime-700" />
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2 hover:bg-lime-200 rounded-full relative"
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5 text-lime-700" />
        </button>
      </div>

      <div className="md:hidden flex items-center space-x-2">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 hover:bg-lime-200 rounded-full"
          aria-label="Toggle Search"
        >
          <Search className="h-5 w-5 text-lime-700" />
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2 relative bg-transparent"
          aria-label="Open Cart"
        >
          <ShoppingCart className="h-5 w-5 text-lime-700" />
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md text-lime-700 hover:text-lime-900 hover:bg-lime-200 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  </div>
</nav>



      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart setIsCartOpen={setIsCartOpen} 
        setTotalItem={setTotalItem}
        >
        </Cart>
      
      )}
    </>
  );
};

export default Navbar;
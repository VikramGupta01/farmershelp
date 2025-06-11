import React, { useEffect, useRef, useState } from 'react';
import { Timer, ShoppingBag, Gift, TrendingUp} from 'lucide-react';
import { Link } from 'react-router-dom';
import Offer from '../components/Offer';
import getAllOffersService from "../services/offers/getAllOffersService.js"
import scrollToPageTop from "../utils/scrollToPageTop.js"
import Loader from "../components/Loader.jsx"

const OffersPage = () => {

  const [offers,setOffers]=useState()
  const [isLoading,setisLoading]=useState(false)

  async function fetchAllOffers(){
    setisLoading(true)
    const data = await getAllOffersService()
    // console.log("Offer",data)
    setOffers(data.data)
    setisLoading(false)
  }

  useEffect(()=>{
    scrollToPageTop()
    fetchAllOffers()
  },[])
  return (
    <>
    

    <div className="min-h-screen bg-emerald-100">
  {/* Hero Section */}
  <div className="relative bg-gradient-to-r from-emerald-600 to-lime-600 text-white py-20">
    <div className="absolute inset-0">
      
    </div>
    <div className="relative max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Exclusive Offers & Deals</h1>
      <p className="text-2xl md:text-3xl text-indigo-100 max-w-2xl mx-auto">
        Discover amazing discounts and promotions tailored just for you
      </p>
    </div>
  </div>

  {/* Stats Section */}
  {/* <div className="max-w-7xl mx-auto px-6 -mt-14 z-10 relative">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition hover:scale-105">
        <Timer className="h-10 w-10 text-indigo-600 mx-auto mb-2" />
        <div className="text-3xl font-bold text-gray-900">24/7</div>
        <p className="text-sm text-gray-600">Limited Time Offers</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition hover:scale-105">
        <ShoppingBag className="h-10 w-10 text-indigo-600 mx-auto mb-2" />
        <div className="text-3xl font-bold text-gray-900">1000+</div>
        <p className="text-sm text-gray-600">Products on Sale</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition hover:scale-105">
        <Gift className="h-10 w-10 text-indigo-600 mx-auto mb-2" />
        <div className="text-3xl font-bold text-gray-900">30%</div>
        <p className="text-sm text-gray-600">Maximum Discount</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition hover:scale-105">
        <TrendingUp className="h-10 w-10 text-indigo-600 mx-auto mb-2" />
        <div className="text-3xl font-bold text-gray-900">50K+</div>
        <p className="text-sm text-gray-600">Happy Customers</p>
      </div>
    </div>
  </div> */}

  {/* Offers Section */}
  {isLoading ? (
    <Loader />
  ) : (
    <div className="max-w-7xl  mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {offers?.map((offer) => (
          <div
            key={offer._id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <Offer offer={offer} />
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    </>
  );
};

export default OffersPage;
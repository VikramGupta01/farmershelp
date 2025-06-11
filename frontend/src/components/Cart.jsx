import {useState, useEffect} from "react"
import { Trash2, X } from "lucide-react";
import checkLogin from "../services/users/checkLogin.js";
import { useNavigate } from "react-router-dom";
import getCartProductsService from "../services/cart/getCartProductsService.js";
import CartProduct from "./CartProduct.jsx";
import updateCartProductService from "../services/cart/updateCartProductService.js";
import deleteCartProductService from "../services/cart/deleteCartProductService.js";
import EmptyCart from "./EmptyCart.jsx";
import getCouponByNameService from "../services/coupons/getCouponsByNameService.js";
import createOrderService from "../services/orders/createOrderService.js";
import successToastMessage from "../utils/successToastMessage.js";
import createPaymentService from "../services/payment/createPaymentService.js";

function Cart({setIsCartOpen}) {
  const [cartProducts,setCartProducts]=useState([])
  const [totalProducts,setTotalProducts]=useState(0)
  const [totalAmount,setTotalAmount]=useState(0)
  const [finalAmount,setFinalAmount]=useState(0)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [coupon, setCoupon] = useState("");
  const [isValidCoupon, setisValidCoupon] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);

  const navigate = useNavigate()

  async function hasLoggedIn() {
    const data = await checkLogin()
    console.log("logged cart",data)
    if(data.status==="failed" && data.message==="Not Logged in"){
      setIsCartOpen(false)
      setIsLoggedIn(false)
      navigate("/userAuth")
    }else if(data.data.status==="success"){
      setIsCartOpen(true)
      setIsLoggedIn(true)
      setCartProducts(data.data.user.cart)
      setTotalAmount(data.data.user.cartAmount)
      setTotalProducts(data.data.user.cart.length)
    }
  }
  async function updateProductQuantity(id,formData){
    const data = await updateCartProductService(id,formData)
    setCartProducts(data.data.cart)
    setTotalAmount(data.data.cartAmount)
    if(finalAmount>0)
      setFinalAmount(data.data.cartAmount-discountPrice)
  }
  async function deleteCartProduct(id){
    const data = await deleteCartProductService(id)
    console.log(data)
    setCartProducts(data.data.cart)
    setTotalProducts(data.data.cart.length)
    setTotalAmount(data.data.cartAmount)
    if(finalAmount>0)
      setFinalAmount(data.data.cartAmount-discountPrice)
  }
  async function fetchAllCartProducts(){
    const {data} = await getCartProductsService()
    console.log(data.cart)
    setCartProducts(data.cart)
    setTotalProducts(data.cart.length)
  }

  async function fetchAndApplyCupon(){
    if(!coupon)
      return
    console.log(coupon)
    setIsApplied(false)
    setisValidCoupon(true)
    const data = await getCouponByNameService(coupon)
    if(data.status==="failed"){
      setisValidCoupon(false)
      return
    }
    setisValidCoupon(true)
    setIsApplied(true)
    console.log(data.data)
    setDiscountPrice(data.data.discountPrice)
    setFinalAmount(totalAmount-data.data.discountPrice)
    
  }
  async function submitOrder(){
    console.log(cartProducts)
    // no need to use form data
    const products = cartProducts.map(product=>({
        productId:product.productId,
        name:product.name,
        image:product.image,
        quantity:product.quantity,
        price:product.quantity*product.price
      }))
    const orderData = {
      products,
      orderStatus:"Order Placed",
      // orderPrice:finalAmount>0?finalAmount:totalAmount
      totalPrice:totalAmount,
      finalPrice:finalAmount>0?finalAmount:totalAmount
    }
    // console.log(products)
    // const data = await createOrderService(orderData)
    setIsProcessing(true)
    const data = await createPaymentService(orderData)
    console.log(data)
    if(data?.url){
      window.location.href = data.url
    }
    // if(data.status==="success")
    //   setCartProducts([])
    // fetchAllCartProducts()

    // successToastMessage("Order Confirmed successfully!")
  }
  useEffect(()=>{
    hasLoggedIn()
    console.log("hi")
    fetchAllCartProducts()
  },[])


    return (
      <>
      {
        isLoggedIn &&
        <div className="fixed inset-0 z-50 overflow-hidden">
  <div
    className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
    onClick={() => setIsCartOpen(false)}
  />
  <div className="absolute inset-y-0 right-0 max-w-full flex">
    <div className="relative w-screen max-w-md">
      <div className="h-full flex flex-col bg-[#fdfdf5] shadow-2xl rounded-l-3xl border-l-4 border-green-300">
        <div className="flex items-center justify-between px-5 py-5 bg-green-100 border-b border-green-300 rounded-t-3xl">
          <h2 className="text-xl font-bold text-green-800">
            🛒 Your Cart ({totalProducts})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-green-500 hover:text-green-700 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {cartProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* cart with items */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <ul className="divide-y divide-gray-200">
                {cartProducts.map((item) => (
                  <CartProduct
                    key={item._id}
                    item={item}
                    updateProductQuantity={updateProductQuantity}
                    deleteCartProduct={deleteCartProduct}
                  />
                ))}
              </ul>
            </div>

            {/* Coupon & Checkout */}
            <div className="border-t border-green-200 px-5 py-6 bg-white rounded-b-3xl shadow-inner">
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Have a coupon?"
                    className="flex-1 px-4 py-2 text-sm border border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={fetchAndApplyCupon}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-r-md hover:from-green-600 hover:to-green-700 transition"
                  >
                    {isApplied ? "Applied!" : "Apply"}
                  </button>
                </div>
                {!isValidCoupon && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid coupon code
                  </p>
                )}
                {isApplied && (
                  <p className="text-green-600 text-xs mt-2 font-medium animate-pulse">
                    ✅ Coupon applied successfully!
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-base font-semibold text-green-800 mb-4">
                <p>Subtotal</p>
                <div className="text-right">
                  {isApplied ? (
                    <>
                      <p className="line-through text-gray-400 text-sm">
                        ₹{totalAmount}
                      </p>
                      <p className="text-green-600 text-lg font-bold">
                        ₹{finalAmount}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold">₹{totalAmount}</p>
                  )}
                </div>
              </div>

              <button
                disabled={isProcessing}
                onClick={submitOrder}
                className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-white py-3 rounded-xl font-bold hover:from-lime-600 hover:to-green-600 transition-all duration-300 shadow-lg"
              >
                {isProcessing ? "Redirecting to payment..." : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
</div>

        
      }
      </>
    )
}

export default Cart

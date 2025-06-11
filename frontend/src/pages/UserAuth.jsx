import { Link, useNavigate } from "react-router-dom"
import checkLogin from "../services/users/checkLogin.js"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import scrollToPageTop from "../utils/scrollToPageTop.js"

function UserAuth() {
    const navigate = useNavigate()
    useEffect(()=>{
                scrollToPageTop()
              },[])
    async function checkIsLoggedIn() {
        const data = await checkLogin()
        if(data.data.status==="success")
          navigate("/profile")
      }
      useEffect(()=>{
        checkIsLoggedIn()
      },[])
        return (
          <>
          <Helmet>
  {/* Title */}
  <title>Login or Sign Up | Access Your Farmers Help Account</title>

 

  {/* Keywords */}
  <meta
    name="keywords"
    content="Farmers Help login, sign up Farmers Help, create account, user login, register Farmers Help, online shopping account, secure login"
  />

  {/* Open Graph */}
  <meta property="og:title" content="Login or Sign Up | Farmers Help" />

</Helmet>

        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-green-100 to-lime-200">
  <div className="max-w-md w-full flex flex-col gap-8 bg-gradient-to-bl from-green-50 to-lime-50 p-10 shadow-xl rounded-2xl transition-all duration-300">
    
    {/* Header */}
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-900 font-roboto tracking-tight">
        Start Ordering Today!
      </h2>
      <p className="mt-3 text-gray-600 text-base">
        Create an account to unlock exclusive deals and enjoy faster checkout.
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-4">
      <Link
        to="/login"
        className="w-full flex justify-center items-center py-3 px-4 text-base font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all duration-300"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="w-full flex justify-center items-center py-3 px-4 text-base font-semibold rounded-xl border border-lime-600 text-lime-600 bg-white hover:bg-blue-50 shadow-sm transition-all duration-300"
      >
        Sign Up
      </Link>
    </div>
  </div>
</div>

          </>
    )
}

export default UserAuth

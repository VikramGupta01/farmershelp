import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-500 text-lime-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <img
              src="/images/logo-shop.png"
              className="rounded-md max-w-[180px] shadow-lg"
              alt="Farm Fresh"
            />
            <p className="text-sm text-lime-200 leading-relaxed">
              Fresh vegetables directly from the farm to your doorstep. Eat
              healthy, live happy!
            </p>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4 underline underline-offset-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
              {/* <li>
                <Link to="/route-not-found" className="hover:text-white transition">
                  Shipping
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4 underline underline-offset-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="hover:text-white transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/profile?tab=orders" className="hover:text-white transition">
                  My Orders
                </Link>
              </li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4 underline underline-offset-4">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
             
              
              <Link
                to="https://www.instagram.com/farmershelpinfo01/"
                className="hover:text-yellow-300 transition"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                to="https://www.youtube.com/@FarmHelp-t2v6i"
                className="hover:text-yellow-300 transition"
              >
                <Youtube className="h-6 w-6" />
              </Link>
               <Link
                to="https://www.youtube.com/@FarmHelp-t2v6i"
                className="hover:text-yellow-300 transition"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                to="https://www.youtube.com/@FarmHelp-t2v6i"
                className="hover:text-yellow-300 transition"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-lime-600 mt-12 pt-6 text-sm text-center text-lime-200">
          <p>
            &copy; 2025 Farmers Help. All rights reserved. Developed by{" "}
            <span className="text-yellow-300 font-semibold">Code Crushers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

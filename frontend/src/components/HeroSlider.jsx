import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import getAllBanners from "../services/homebanners/getAllBanners.js";
import Loader from "./Loader.jsx";
import scrollToPageTop from "../utils/scrollToPageTop.js";
import { useNavigate } from "react-router-dom";

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  async function fetchAllBanners() {
    const { data } = await getAllBanners();
    setSlides(data);
    setCurrentSlide(0);
    scrollToPageTop();
  }

  useEffect(() => {
    fetchAllBanners();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="relative bg-green-100 h-[600px] overflow-hidden">
      {slides.length === 0 ? (
        <Loader />
      ) : (
        slides.map((slide, index) => (
          <div
            key={slide?._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${slide?.image.url}")`,
              }}
            >
              {/* Change overlay from black to a leafy green shade */}
              <div className="absolute inset-0 bg-green-900 bg-opacity-40"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="text-white max-w-xl bg-green-800 bg-opacity-60 p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-100">
                  {slide?.heading}
                </h1>
                <p className="text-lg md:text-xl mb-6 text-green-100">
                  {slide?.description}
                </p>
                <button
                  onClick={() => navigate("/offers")}
                  className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-yellow-300 transition duration-300 shadow-md"
                >
                  <span>Shop Fresh</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Slider dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-yellow-400 scale-125"
                : "bg-yellow-200 hover:bg-yellow-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;

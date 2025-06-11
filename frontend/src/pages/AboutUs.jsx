import { useEffect } from "react";
import scrollToPageTop from "../utils/scrollToPageTop.js";

function AboutUs() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16 bg-gradient-to-br from-lime-100 via-emerald-50 to-slate-100">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-sm">
          Welcome to the Farmers Help
        </h2>

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
          This project is created by <span className="font-semibold text-blue-600">Code Crusher</span> as part of a
          academic project. It is purely for <span className="italic font-medium text-blue-500">testing and experimentation</span> — not intended for commercial use.
        </p>

        <p className="text-gray-600 text-sm md:text-base mb-8">
          Built with modern web technologies and crafted to be responsive, clean, and efficient. The goal is to explore design, animation, and logic integration across frontend and backend layers.
        </p>

        

        \
      </div>
    </section>
  );
}

export default AboutUs;

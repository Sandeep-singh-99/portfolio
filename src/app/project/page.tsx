import React from "react";
import Image from "next/image";
function Project() {
  return (
    <div className="px-5 md:px-32 py-10">
      <h1 className="text-4xl font-semibold text-center" data-aos="fade-up">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div
          className="w-full h-[350px] rounded-lg overflow-hidden border border-gray-800 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          data-aos="fade-up" // Add animation when card appears
        >
          <img
            className="w-full h-[60%] object-cover"
            src={
              "https://images.pexels.com/photos/29343550/pexels-photo-29343550/free-photo-of-scenic-mountain-road-in-majestic-forest-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={"banner"}
          />
          <div className="p-6 bg-[#09090b] h-[40%] flex flex-col justify-between">
            <p className="text-gray-700 text-lg mb-4 overflow-y-auto">
              ShopWiz- E-Commerce App
            </p>
            <button
              className="bg-slate-500 text-white py-2 px-6 rounded-md text-sm font-semibold transform transition-all duration-300 hover:bg-slate-600"
              data-aos="zoom-in" // Zoom-in effect on button
            >
              View Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;

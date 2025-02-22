'use client'
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
          data-aos="fade-up"
        >
          <div className="relative w-full h-[60%]">
            <Image
              src=""
              alt="banner"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="p-6 bg-[#09090b] h-[40%] flex flex-col justify-between">
            <p className="text-gray-700 text-lg mb-4 overflow-y-auto">
              ShopWiz - E-Commerce App
            </p>
            <button
              className="bg-slate-500 text-white py-2 px-6 rounded-md text-sm font-semibold transform transition-all duration-300 hover:bg-slate-600"
              data-aos="zoom-in"
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

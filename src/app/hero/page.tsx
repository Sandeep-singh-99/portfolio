"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, lazy, Suspense } from "react";
import { Spin } from "antd";

const Typewriter = lazy(() => import("typewriter-effect"));

interface HomeData {
  _id: string;
  name: string;
  techStack: string[];
  description: string;
  profileImage: string;
  resumeFile: string;
}

export default function Hero() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin-data/home-section", {
        cache: "no-store", // Ensure fresh data
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data: HomeData[] = await response.json();
      setHomeData(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
      setError("Failed to load hero section. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-900 text-white flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-500 opacity-20 blur-3xl rounded-full"
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "30%", left: "40%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-3xl rounded-full"
          initial={{ scale: 0, x: "50%", y: "50%" }}
          animate={{ scale: 1.3 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          style={{ bottom: "20%", right: "30%" }}
        />
      </motion.div>

      <div
        className="relative z-10 flex flex-col md:flex-row items-center gap-20 text-center md:text-left"
        data-aos="fade-up"
      >
        <div>
          <h1 className="text-4xl md:text-5xl mb-2 font-semibold">
            Hi, I am <span className="text-blue-400">{homeData.name}</span>
          </h1>

          <h2 className="text-3xl text-blue-400 font-semibold mb-5 md:mb-10">
            <Suspense fallback={<span>Loading skills...</span>}>
              <Typewriter
                options={{
                  strings: homeData.techStack[0].split(",").slice(0, 3), 
                  autoStart: true,
                  loop: true,
                  cursor: "_",
                }}
              />
            </Suspense>
          </h2>

          <Link
            href={homeData.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-gray-800 via-black to-gray-800 border border-slate-500 text-white px-8 py-3 rounded-lg relative overflow-hidden group"
          >
            Download Resume
          </Link>
        </div>
        <motion.div
          className="order-first md:order-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={homeData.profileImage}
            alt="Profile image"
            width={400}
            height={400}
            quality={85} 
            placeholder="blur" 
            blurDataURL="/placeholder-image.jpg" 
          />
        </motion.div>
      </div>
    </div>
  );
}

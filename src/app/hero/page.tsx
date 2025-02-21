"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
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
        className="relative z-10 flex  flex-col md:flex-row items-center gap-20 text-center md:text-left"
        data-aos="fade-up"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Hi, I am <span className="text-blue-400">Sandeep</span>
          </h1>
          <h2 className="text-2xl font-semibold">Web Developer</h2>
          <div className="mt-4">
            <Link href="/about" className="text-blue-400 hover:underline">
              About me
            </Link>
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            Resume
          </button>
        </div>
        <motion.div
          className="order-first md:order-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/profile.svg"
            alt="profile image"
            width={400}
            height={400}
            quality={100}
          />
        </motion.div>
      </div>
    </div>
  );
}

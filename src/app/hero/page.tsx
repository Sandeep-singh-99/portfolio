import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS animation
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}> 
      {/* Set image as a background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -10,
        }}
      >
        <Image
          src="/img.jpg"
          alt="background image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Your content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="flex md:justify-evenly flex-col md:flex-row justify-center gap-8 items-center h-screen"
          data-aos="fade-up" 
        >
          <div className="text-center md:text-left">
            <h1 className="md:text-5xl text-4xl font-semibold">Hi, I am <span className="text-blue-500">Sandeep </span></h1>
            <h1 className="text-2xl font-semibold">Web Developer</h1>
            <div>
              <Link href="/about">
                <p className="text-blue-500">About me</p>
              </Link>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Resume 
            </button>
          </div>

          <div className="order-first md:order-none">
            <Image
              src={"/profile.svg"}
              alt="profile image"
              width={500}
              height={500}
              quality={100}
              data-aos="fade-left" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

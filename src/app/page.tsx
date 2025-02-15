import Image from "next/image";

export default function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Set image as a background */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 // Ensures the image stays in the background
      }}>
        <Image
          src="/img.jpg"
          alt="background image"
          layout="fill"  // Fills the entire container
          objectFit="cover"  // Ensures the image covers the full area without distortion
          quality={100}
        />
      </div>

      {/* Your content goes here */}
      <h1 className="text-4xl text-white" style={{ position: 'relative', zIndex: 1 }}>
        Sandeep Singh
      </h1>
    </div>
  );
} 
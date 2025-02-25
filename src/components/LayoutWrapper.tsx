'use client'
import { useState, useEffect } from "react";
import NavBarWrapper from "@/components/NavBarWrapper";
import Splash from "@/app/splash-screen/page";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 6000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Splash /> : (
        <>
          <NavBarWrapper />
          {children}
        </>
      )}
    </>
  );
}

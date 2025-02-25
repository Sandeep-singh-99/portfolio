'use client'
import React, { useEffect, useState } from "react";

interface AboutSection {
  description: string;
}

function About() {
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin-data/home-section");
      const data: AboutSection[] = await response.json();
      setAboutData(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Failed to fetch about data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-5 md:px-32" data-aos="fade-up">
      <div className="flex flex-col justify-center gap-10 items-center h-fit py-10">
        <h1 className="text-4xl font-semibold">About Me</h1>
        <p className="text-lg text-center">
          {aboutData?.description}
        </p>
      </div>
    </div>
  );
}

export default About;

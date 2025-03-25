"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SkillImage {
  skillImage: string;
}

interface Skill {
  _id: string;
  skillName: string;
  skillImages: SkillImage[];
}

const Skill = () => {
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin-data/skill-section");
      if (!response.ok) throw new Error("Failed to fetch skills");
      const data = await response.json();
      setSkillData(data);
    } catch (error) {
      setError("Unable to load skills. Please try again later.");
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    hover: {
      scale: 1.1,
      y: -5,
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-10 px-5 md:px-32 overflow-hidden">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-semibold text-center mb-6">Skills</h1>

        {skillData.map((skill) => (
          <motion.div
            key={skill._id}
            variants={container}
            initial="hidden"
            animate="visible"
            data-aos="fade-up"
            data-aos-delay="100"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {skill.skillImages.map((image, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover="hover"
                className="flex flex-col justify-center items-center p-4 rounded-lg 
                  bg-gradient-to-r from-white/10 to-white/30 
                  backdrop-blur-lg shadow-md border border-white/20"
              >
                <Image
                  src={image.skillImage}
                  alt={`${skill.skillName} icon`}
                  width={70}
                  height={70}
                  className="mb-2 object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skill;

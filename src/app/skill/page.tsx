import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const skillImage = [
  {
    name: "React",
    src: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  },
  {
    name: "Node.js",
    src: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  },
  {
    name: "Express.js",
    src: "/assets/pngegg.png",
  },
  {
    name: "MongoDB",
    src: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
  },
  {
    name: "Flutter",
    src: "https://cdn.worldvectorlogo.com/logos/flutter.svg",
  },
  {
    name: "Dart",
    src: "https://cdn.worldvectorlogo.com/logos/dart.svg",
  },
  {
    name: "Firebase",
    src: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
  },
  {
    name: "Git",
    src: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
  },
  {
    name: "GitHub",
    src: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
  },
  {
    name: "Yarn",
    src: "/assets/yarn2.png",
  },
  {
    name: "Netlify",
    src: "https://cdn.worldvectorlogo.com/logos/netlify.svg",
  },
  {
    name: "Vercel",
    src: "https://cdn.worldvectorlogo.com/logos/vercel.svg",
  },
  {
    name: "HTML5",
    src: "/assets/html-5--v1.png",
  },
  {
    name: "CSS3",
    src: "/assets/css3.png",
  },
  {
    name: "JavaScript",
    src: "/assets/javascript.png",
  },
  {
    name: "TypeScript",
    src: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  },
  {
    name: "Tailwind CSS",
    src: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
  },
  {
    name: "Material-UI",
    src: "https://cdn.worldvectorlogo.com/logos/material-ui-1.svg",
  },
];
const Skill = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    whileHover: {
      scale: 1.1,
      y: -10,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-10 px-5 md:px-32 overflow-hidden">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-semibold text-center mb-6">Skills</h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {skillImage.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover="whileHover"
              className="flex flex-col justify-center items-center p-4 rounded-lg bg-white shadow-md"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Image
                src={skill.src}
                alt={skill.name}
                width={60}
                height={60}
                className="mb-2"
              />
              <p className="text-center text-black font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skill;

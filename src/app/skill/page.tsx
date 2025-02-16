import React from "react";
import Image from "next/image";
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

function Skill() {
  return (
    <div className="py-10 px-5 md:px-32">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-semibold text-center">Skill</h1>
        <div data-aos="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center space-y-3 lg:grid-cols-6 gap-5">
            {skillImage.map((skill, index) => (
              <div key={index} className="flex items-center flex-col">
                <Image
                  src={skill.src}
                  alt={skill.name}
                  width={40}
                  height={40}
                />
                <p className="text-center">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skill;

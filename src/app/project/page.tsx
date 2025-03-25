"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; 


interface ProjectData {
  title: string;
  description: string;
  imageSrc: string;
  hostUrl: string;
}

const projects: ProjectData[] = [
  {
    title: "ShopWiz - E-Commerce App",
    description: "A fully functional e-commerce platform with a modern UI.",
    imageSrc: "https://images.pexels.com/photos/31042266/pexels-photo-31042266/free-photo-of-expansive-golden-field-under-soft-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", 
    hostUrl: "https://shopwiz.example.com", 
  },
];

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div
      className="w-full h-[350px] rounded-lg overflow-hidden border border-gray-800 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      data-aos="fade-up"
    >
      <div className="relative w-full h-[60%]">
        <Image
          src={project.imageSrc}
          alt={`${project.title} banner`}
          fill 
          style={{ objectFit: "cover" }} 
          priority={true} 
          placeholder="blur" 
          blurDataURL="/placeholder-image.jpg" 
          quality={75} 
        />
      </div>
      <div className="p-6 bg-[#09090b] h-[40%] flex flex-col justify-between">
        <p className="text-gray-300 text-lg mb-4 overflow-y-auto">
          {project.title}
        </p>
        <Link href={project.hostUrl} passHref legacyBehavior>
          <button
            className="bg-slate-500 text-white py-2 px-6 rounded-md text-sm font-semibold transform transition-all duration-300 hover:bg-slate-600"
            data-aos="zoom-in"
            aria-label={`View ${project.title} live demo`}
          >
            View Host
          </button>
        </Link>
      </div>
    </div>
  );
}

function Project() {
  return (
    <div className="px-5 md:px-32 py-10">
      <h1
        className="text-4xl font-semibold text-center mb-10"
        data-aos="fade-up"
      >
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Project;

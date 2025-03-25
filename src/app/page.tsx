"use client";

import React, { useEffect } from "react";
import About from "./about/page";
import Skill from "./skill/page";
import Project from "./project/page";
import Contact from "./contact/page";
import Hero from "./hero/page";

import "aos/dist/aos.css";
import Aos from "aos";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000 }); 
    return () => {
      Aos.refresh(); 
    };
  }, []);

  return (
    <div>
      <section id="profile" role="region" aria-label="Profile Section">
        <Hero />
      </section>
      <section id="about" role="region" aria-label="About Section">
        <About />
      </section>
      <section id="skill" role="region" aria-label="Skills Section">
        <Skill />
      </section>
      <section id="project" role="region" aria-label="Projects Section">
        <Project />
      </section>
      <section id="contact" role="region" aria-label="Contact Section">
        <Contact />
      </section>
    </div>
  );
}
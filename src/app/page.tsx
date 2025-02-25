"use client";

import React, { useEffect } from "react";
import About from "./about/page";
import Skill from "./skill/page";
import Project from "./project/page";
import Contact from "./contact/page";

import "aos/dist/aos.css";
import Aos from "aos";
import Hero from "./hero/page";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section id="profile">
        <Hero/>
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skill">
        <Skill />
      </section>
      <section id="project">
        <Project />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

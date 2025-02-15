import Profile from "./profile/page";
import About from "./about/page";
import Skill from "./skill/page";
import Project from "./project/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <div>
      <section id="profile">
        <Profile />
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

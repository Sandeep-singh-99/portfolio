import React from "react";

function Contact() {
  return (
    <div className="px-5 md:px-32 py-10" data-aos="fade-up">
      <div className="flex flex-col justify-center gap-5 items-center h-fit">
        <h1 className="text-4xl text-center font-semibold">
          Lets Get In Touch
        </h1>
        <p className="text-center text-lg">
          As of now, Im not looking for any new job opportunities, but my inbox
          is always open if you want to communicate with me. Hit me up if you
          have some question, want a collaboration or just play a game of chess.
          Ill try to get back to you as soon as I can.
        </p>
        <h1 className="text-3xl font-bold">Here are my Socials</h1>
        <div className="flex gap-5 items-center">
          <a
            href="https://www.linkedin.com/in/abhishek-singh-8b5b7a1b1/"
            target="_blank"
            rel="noreferrer"
            className="text-2xl"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/Abhisheksingh_0"
            target="_blank"
            rel="noreferrer"
            className="text-2xl"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;

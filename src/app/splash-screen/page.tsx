"use client";

import { useEffect, useState } from "react";
import anime from "animejs";

export default function Splash() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    anime
      .timeline({ easing: "easeOutExpo", duration: 2000 })
      .add({
        targets: ".letter",
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(300),
      })
      .add({
        targets: ".letter",
        scale: [1, 1.5],
        duration: 1000,
        easing: "easeInOutQuad",
      })
      .add({
        targets: ".letter",
        scale: [1.5, 1],
        duration: 1000,
        easing: "easeInOutQuad",
        complete: () => setShowContent(true),
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black relative overflow-hidden">
      {!showContent ? (
        <div className="flex text-white text-6xl font-bold space-x-2">
          {["S", "A", "N", "D", "E", "E", "P"].map((letter, index) => (
            <span key={index} className="letter opacity-0">
              {letter}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

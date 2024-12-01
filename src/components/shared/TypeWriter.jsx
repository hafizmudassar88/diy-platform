'use client'
import React from "react";
import { TypeAnimation } from "react-type-animation";

function TypeWriter({ strings=[], delay = 1500, speed = 60, deletionSpeed = 40, className='text-white text-xl' }) {
  // Flatten the sequence by inserting the delay after each string
  const sequence = strings.reduce((acc, str) => [...acc, str, delay], []);

  return (
    <div className={className}>
      <TypeAnimation
        sequence={sequence}
        speed={speed}
        deletionSpeed={deletionSpeed}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ display: "inline-block" }}
      />
    </div>
  );
}

export default TypeWriter;

import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full-stack Developer",
          "Data Enthusiast",
          "Backend Engineer",
          "Python Developer",
          "Problem Solver",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
      }}
    />
  );
}

export default Type;

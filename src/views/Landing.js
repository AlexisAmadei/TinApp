import React from "react";

import ResponsiveAppBar from "../components/AppBar";
import { Container } from "@mui/material";

import "./css/Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <ResponsiveAppBar
        displayAccount={false}
        logout={false}
      />
      <Container>
        <div className="landing-body">
          <h1>Welcome to alexisamadei.fr</h1>
          <div className="self-presentation">
            <h2>About Me</h2>
            <h4>Hi, I'm Alexis Amadei, web developer</h4>
            <p>
              And i love creating
              web applications. My journey in development started several years ago,
              and I've been honing my skills ever since.
            </p>
            <p>
              When I'm not coding, you can find me playing music and especially drums with my band LavaBow, or playing video games with my friends.
            </p>
            <p>This web app is like a playground for me for testing new things and recreating cool stuff</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
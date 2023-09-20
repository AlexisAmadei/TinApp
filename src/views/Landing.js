import React from "react";
import ResponsiveAppBar from "../components/AppBar";
import "./css/Landing.css";

export default function Landing() {
  return (
    <div className="">
      <ResponsiveAppBar
        displayAccount={false}
      />
      <div className="landing-body">
        <p>EN DEV</p>
      </div>
    </div>
  );
};
import React from "react";
import ResponsiveAppBar from "../components/AppBar";

export default function Landing() {
  return (
    <div>
      <ResponsiveAppBar
        displayAccount={false}
      />
      <div className="landing-body">
        <p>EN DEV</p>
      </div>
    </div>
  );
};
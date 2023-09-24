import React from "react";
import { Outlet, useNavigate } from "react-router-dom";


import ResponsiveAppBar from "../components/AppBar";
// import { Container } from "@mui/material";

export default function ConnectedLayout({ user }) {
  const navigate = useNavigate();
  if (user) {
    return (
      <div>
        <ResponsiveAppBar
          displayAccount={false}
          logout={true}
        />
        <Outlet />
        {/* footer */}
      </div>
    );
  } else {
    navigate("/security");
    return null;
  }
}
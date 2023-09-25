import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ResponsiveAppBar from "../components/AppBar";

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
      </div>
    );
  } else {
    navigate("/security");
    return null;
  }
}
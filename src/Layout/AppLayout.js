import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import "./SideDrawer.css"

export default function AppLayout({ user }) {
  const navigate = useNavigate();
  if (user) {
    return (
      <div className="appLayout-wrapper">
        <div className="side-drawer">
          <div className="drawer-header">
          <a href="/white-rabbit/">
            <HomeIcon style={{ fontSize: 50 }} />
          </a>
          </div>
        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    );
  } else {
    navigate("/security");
    return null;
  }
}
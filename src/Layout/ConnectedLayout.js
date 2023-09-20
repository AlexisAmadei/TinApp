import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { auth } from "../.config/firebaseConfig";
import { signOut } from "firebase/auth";
import ResponsiveAppBar from "../components/AppBar";

export default function ConnectedLayout({ user }) {
  const navigate = useNavigate();
  if (user) {
    return (
      <div>
        <ResponsiveAppBar
          displayAccount={false}
        />
        <Outlet />
        <div className="logout">
          <button id="button" onClick={() => {
            signOut(auth)
            navigate("/")
          }}>
            Déconnexion
          </button>
        </div>
      </div>
    );
  } else {
    navigate("/security");
    return null;
  }
}
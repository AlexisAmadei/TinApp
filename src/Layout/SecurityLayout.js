import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function SecurityLayout({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  if (user) return null;
  return <Outlet />;
}
import * as React from "react";
import { useState, useEffect } from "react";

import { Container } from "@mui/material";

import "./css/WhiteRabbit.css";

export default function WhiteRabbit() {
  const [showNotification, setShowNotification] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowNotification(true);
  //   }, 1000);
  //   setTimeout(() => {
  //     setShowNotification(false);
  //   }, 4000);
  // }, []);
  return (
    <Container>
      <div className="connected-wrapper">
        <p>Hi neo !</p>
        {showNotification && (
          <div className="connected-notification">
            <p>Connecté !</p>
          </div>
        )}
      </div>
    </Container>
  )
}
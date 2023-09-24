import * as React from "react";
import { useEffect } from "react";

import { Container } from "@mui/material";

import "./css/WhiteRabbit.css";

export default function WhiteRabbit() {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".connected-notification").classList.add("notification-animation-enter");
    }, 0);
    setTimeout(() => {
      document.querySelector(".connected-notification").classList.add("notification-animation-exit");
    }, 3000);
  }, []);
  return (
    <Container>
      <div className="connected-wrapper">
        <p>Hi neo !</p>
          <div className="connected-notification">
            <p>Connecté !</p>
          </div>
      </div>
    </Container>
  )
}
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../.config/firebaseConfig";

import "./css/Terrier.css";

export default function Terrier() {
  const [showConnexion, setShowConnexion] = useState(false);
  const [askAccount, setAskAccount] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--x", e.clientX + "px");
      document.documentElement.style.setProperty("--y", e.clientY + "px");
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = (e) => {
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
  }

  if (!showConnexion && !askAccount) {
    return (
      <div className="terrier-wrapper">
        <div className="terrier-header">
          <h1 style={{ fontFamily: "Creepster", fontSize: "5rem" }}>Le Terrier</h1>
        </div>
        <div className="terrier-body">
          <button id="button" onClick={() => setShowConnexion(true)}>
            Connexion
          </button>
          <button id="button" onClick={() => setAskAccount(true)}>
            Ask for an account
          </button>
        </div>
        <div className="light-halo" />
      </div>
    );
  } else if (showConnexion) {
    return (
      <div className="terrier-wrapper">
        <form id="connexion-form" onSubmit={handleLogin}>
          <h1>Connexion</h1>
          <input type="text" label="email" placeholder="Email" />
          <input type="password" label="password" placeholder="Mot de passe" />
          <button id="button">Se connecter</button>
        </form>
      </div>
    );
  }
}

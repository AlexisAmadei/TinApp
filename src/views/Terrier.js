import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../.config/firebaseConfig";

import "./css/Terrier.css";
import askAccountCreate from "../utils/askAccount";

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

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("pwd");

    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error(error);
      })
  };

  const handleAskAccount = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    console.log(askAccountCreate(email));
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
  } else if (showConnexion && !askAccount) {
    return (
      <div className="terrier-wrapper">
        <div className="login-box">
          <button id="return-button" onClick={() => { setShowConnexion(false) }}><p>← Go Back</p></button>
          <h1>Login</h1>
          <form onSubmit={handleLogin} >
            <div className="user-box">
              <input type="text" label="email" placeholder="Email" name="email" required />
            </div>
            <div className="user-box">
              <input type="password" label="password" placeholder="Mot de passe" name="pwd" required />
            </div>
            <input type="submit" className="button" value="Connexion" />
          </form>
        </div>
      </div>
    );
  } else if (askAccount && !showConnexion) {
    return (
      <div className="terrier-wrapper">
        <div className="login-box">
          <button id="return-button" onClick={() => { setAskAccount(false) }}><p>← Go Back</p></button>
          <h1>Ask for an account</h1>
          <form onSubmit={handleAskAccount} >
            <div className="user-box">
              <input type="text" label="email" placeholder="Email" name="email" required />
            </div>
            <input type="submit" className="button" value="Validate" />
          </form>
        </div>
      </div>
    )
  }
}

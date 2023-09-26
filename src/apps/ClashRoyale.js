import React, { useState } from "react";

import { Container } from "@mui/material";
import './css/ClashRoyale.css';

import { db } from '../.config/firebaseConfig'
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AppCR() {
  const user = getAuth().currentUser;
  const [userCR, setUserCR] = useState("");
  const [getStarted, setGetStarted] = useState(false);

  async function setupUser() {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      clashRoyale: userCR
    })
  }

  return (
    <div className="cr-app-wrapper">
      <div className="cr-app-header">
        <h1>Clash Royale Companion</h1>
        <Container>
          <div id="get-started">
            <button onClick={() => setGetStarted(true)}>Commencer</button>
            {getStarted && (
              <div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
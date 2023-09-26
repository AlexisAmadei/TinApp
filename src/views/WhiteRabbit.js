import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ActionAreaCard from "../components/AppCard";
import { Container } from "@mui/material";

import { db } from '../.config/firebaseConfig'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import "./css/WhiteRabbit.css";

export default function WhiteRabbit() {
  const navigate = useNavigate();
  const [fakeLoading, setFakeLoading] = useState(true);
  const user = getAuth().currentUser;

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".connected-notification").classList.add("notification-animation-enter");
    }, 0);
    setTimeout(() => {
      document.querySelector(".connected-notification").classList.add("notification-animation-exit");
    }, 2000);
    setTimeout(() => {
      document.querySelector(".connected-notification").classList.add("notification-remove");
    }, 2300);
    setTimeout(() => {
      setFakeLoading(false);
    }, 2400);
  }, []);

  useEffect(() => {
    async function handleNewUser() {
      const querySnapshot = await getDocs(collection(db, "users"));
      if (querySnapshot.empty) {
        await setDoc(doc(db, "users", user.uid), {
          pseudo: user.uid,
          apps: []
        });
      }
    }
    handleNewUser();
  }, [user.uid]);

  function launchApp(appName) {
    navigate('/app/' + appName);
  }

  return (
    <Container>
      <div className="connected-wrapper">
        {fakeLoading && (
          <div>
            <p>Chargement des apps...</p>
          </div>
        )}
        {!fakeLoading && (
          <div className="cards-container">
            <ActionAreaCard
              title={"Clash Royale"}
              description={"Get your clash royale stats from here !"}
              img={"https://supercell.com/images/8654bffbaa77efb91243d3706b739c25/1050/og_clashroyale.d235f90b.webp"}
              onClick={() => launchApp("clash-royale")}
            />
          </div>
        )}
        <div className="connected-notification">
          <p>Connecté !</p>
        </div>
      </div>
    </Container>
  )
}
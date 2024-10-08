import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ActionAreaCard from "../components/AppCard";
import { Container } from "@mui/material";

import { db } from '../.config/firebaseConfig'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import "./css/WhiteRabbit.css";
import { useCookies } from "react-cookie";

export default function WhiteRabbit() {
  const navigate = useNavigate();
  const user = getAuth().currentUser;
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (user) {
      setCookie('user', user.uid);
    }
  }, [user])

  useEffect(() => {
    async function handleNewUser() {
      const querySnapshot = await getDocs(collection(db, "users"));
      if (!querySnapshot.docs.find(doc => doc.id === user.uid)) {
        await setDoc(doc(db, "users", user.uid), {
          apps: {
            clashRoyale: "",
            clashOfClans: "",
            myWorld: "",
          },
        });
      }
      if (querySnapshot.docs.find(doc => doc.id === user.uid)) {
        const userData = querySnapshot.docs.find(doc => doc.id === user.uid).data();
        if (!userData.apps) {
          await setDoc(doc(db, "users", user.uid), {
            apps: {
              clashRoyale: "",
              clashofClans: "",
              myWorld: "",
            },
          });
        }
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
        <div className="cards-container">
          <ActionAreaCard
            title={"Clash Royale"}
            description={"Get your clash royale stats from here !"}
            img={"https://supercell.com/images/8654bffbaa77efb91243d3706b739c25/1050/og_clashroyale.d235f90b.webp"}
            onClick={() => launchApp("clash-royale")}
          />
          <ActionAreaCard
            title={"My World !"}
            description={"Track all the countries you've visited !"}
            img={"https://services.meteored.com/img/article/climateclock-en-nueva-york-que-hay-que-tomar-en-cuenta-281551-1_1024.jpeg"}
            onClick={() => launchApp("my-world")}
          />
          <ActionAreaCard
            title={"Clash of Clans"}
            description={"Get your clash of clans stats from here !"}
            img={"https://supercell.com/images/4c0ab0c1fb2958e72103f81632fee096/og_clashofclans.f3149338.jpg"}
            onClick={() => launchApp("clash-of-clans")}
          />
        </div>
      </div>
    </Container>
  )
}
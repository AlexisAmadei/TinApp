import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import RefreshIcon from '@mui/icons-material/Refresh';

import { db } from '../.config/firebaseConfig'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import './css/ClashRoyale.css';

export default function AppCR() {
  const user = getAuth().currentUser;
  const [userCR, setUserCR] = useState("");
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [stats, setStats] = useState({
    pseudo: "",
    trophies: "",
    level: "",
    wins: "",
    losses: "",
    draws: "",
  });

  useEffect(() => {
    async function getUserData() {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const querySnapshot = await getDoc(userRef);
        const userData = querySnapshot.data();

        // Check if user data contains the 'clashRoyale' field
        if (userData && userData.clashRoyale) {
          setUserCR(userData.clashRoyale);
        }
      }
    }

    getUserData();
  }, [user]);

  useEffect(() => {
    async function updateUserData() {
      if (user && userCR) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          clashRoyale: userCR,
        });
      }
    }

    updateUserData();
  }, [userCR, user]);

  function changeID() {
    if (inputValue === "") {
      alert("Please enter a valid ID");
      return;
    }
    setUserCR(inputValue);
    setEdit(false);
  }

  // stats functions
  useEffect(() => {
    async function getStats() {
      if (!userCR) return;
      const url = `https://proxy.royaleapi.dev/v1/players/%23${userCR}`;
      const api_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjliYzhjYTIwLTRlY2ItNDdkOC05MjI0LTU0NjgzMGY0NjA1MSIsImlhdCI6MTY5NTc3MTg3Mywic3ViIjoiZGV2ZWxvcGVyL2U4YzEzNDQzLTc0MDktMTYyNC1kNWNmLTZjZTI5OWQ0NGQ3MiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.AzxWS4CKqNAD2aSlACOHuvFqqAHrAFrzBYM-Gqai_C9xx5sijxQCOTCAloeWiFMD-aFZE-HxEPFNfhaLE96vhw"
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${api_key}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => parseStats(result))
        .catch(error => console.log('error', error));
    }
    getStats();
  }, [userCR]);

  function parseStats(stats) {
    const { name, trophies, expLevel, wins, losses, battleCount, threeCrownWins, totalDonations, role, clan } = stats;
    setStats({
      pseudo: name,
      trophies: trophies,
      level: expLevel,
      wins: wins,
      losses: losses,
      total: battleCount,
      perfectWins: threeCrownWins,
      donations: totalDonations,
      role: role,
      clan: clan.name,
    });
  }

  return (
    <div className="cr-app-wrapper">
      <div className="cr-app-header">
        <h1>Clash Royale Companion</h1>
        <Container>
          <div id="get-started">
            {!edit && (
              <div id="savedID">
                <p>Current save ID: <span>#{userCR}</span></p>
                <EditIcon onClick={() => {
                  setEdit(true);
                }} />
              </div>
            )}
            {edit && (
              <div id="editID">
                <p>{"Edit your ID : #"}</p>
                <input
                  type="text"
                  placeholder="#"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <CheckCircleIcon onClick={changeID} />
              </div>
            )}
          </div>
          <div className="stats">
            <h3>Your stats: </h3>
            <div className="container-stats">
              <p>Pseudo: {stats.pseudo}</p>
              <p>Trophies: {stats.trophies}</p>
              <p>Max trophies: {stats.maxTrophies}</p>
              <p>Account Level: {stats.level}</p>
              <p>Total battles: {stats.total}</p>
              <p>Wins: {stats.wins}</p>
              <p>Losses: {stats.losses}</p>
              <p>Perfect win: { }</p>
            </div>
          </div>
          <div className="stats">
            <h3>Clan stats: </h3>
            <div className="container-stats">
              <p>Clan Name: {stats.clan}</p>
              <p>Role: {stats.role}</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
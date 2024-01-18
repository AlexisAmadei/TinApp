import React, { useState, useEffect } from "react";

import { Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { db } from '../.config/firebaseConfig'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import Loading from '../components/Loading';
import './css/ClashRoyale.css';

import checkApiResponse from '../utils/reponseCheck';

export default function ClashofClans() {
  const user = getAuth().currentUser;
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [userCoc, setUserCoc] = useState("");
  const [apiStatus, setApiStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [stats, setStats] = useState({
    tag: "",
    name: "",
    townHallLevel: "",
    expLevel: "",
    trophies: "",
    bestTrophies: "",
    warStars: "",
    clan: {
      tag: "",
      name: "",
      clanLevel: "",
      badgeUrls: {
        small: "",
        large: "",
        medium: "",
      },
    },
    league: {
      id: "",
      name: "",
      iconUrls: {
        small: "",
        tiny: "",
        medium: "",
      },
    },
  });

  useEffect(() => {
    async function getUserData() {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const querySnapshot = await getDoc(userRef);
        const userData = querySnapshot.data();
        if (userData && userData.apps.clashofClans) {
          setUserCoc(userData.apps.clashofClans);
        }
      }
    }
    getUserData();
  }, [user]);

  useEffect(() => {
    async function updateUserData() {
      if (user && userCoc) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          "apps.clashofClans": userCoc,
        });
      }
    }
    updateUserData();
  }, [userCoc, user]);

  function changeID() {
    if (inputValue === "") {
      alert("Please enter a valid ID");
      return;
    }
    setUserCoc(inputValue);
    setEdit(false);
  }

  useEffect(() => {
    async function getStats() {
      if (!userCoc) return;
      const url = `https://cocproxy.royaleapi.dev/v1/players/%23${userCoc}`;
      const api_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVjYjMxYmY3LWEyNDktNDI2NS04ODRiLTc2MWJlMmE5NmJjYyIsImlhdCI6MTcwNTI0MTY2Mywic3ViIjoiZGV2ZWxvcGVyLzE1OWViMzIxLTA5ZTUtM2MzMS1mZTcxLTg2OGNkY2IyNWZmZSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.rvSo0osVB76lKZjxNU9dFZfXFARfDG4l-i3DN0FgHZpM96GNlBxzejlfkrkI-qnVrkqCsfSvgQcgZ2YOCLjREg"
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
  }, [userCoc]);

  function parseStats(stats) {
    console.log(stats);
  }

  return (
    <div className="cr-app-wrapper">
      <div className="cr-app-header">
        <h1>Clash of Clans Companion</h1>
      </div>
      <Container>
        <p>{userCoc}</p>
      </Container>
    </div>
  );
}
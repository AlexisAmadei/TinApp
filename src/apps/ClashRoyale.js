import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { db } from '../.config/firebaseConfig'
import { doc, query, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import './css/ClashRoyale.css';

export default function AppCR() {
  const user = getAuth().currentUser;
  const [userCR, setUserCR] = useState("");
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function getCurrentID() {
      const userRef = doc(db, "users", user.uid);
      const querySnapshot = await getDoc(userRef);
      setUserCR(querySnapshot.data().clashRoyale);
      console.log("db id", userCR);
    }
    getCurrentID();
  }, [user.uid]);

  useEffect(() => {
    async function updateID() {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        clashRoyale: userCR,
      });
    }
    updateID();
  }, [userCR]);

  function changeID() {
    console.log("input", inputValue)
    setUserCR(inputValue);
    setEdit(false);
  }

  return (
    <div className="cr-app-wrapper">
      <div className="cr-app-header">
        <h1>Clash Royale Companion</h1>
        <Container>
          <div id="get-started">
            {!edit && (
              <div id="savedID">
                <p>Current save ID: <span>{userCR}</span></p>
                <EditIcon onClick={() => {
                  setEdit(true);
                }} />
              </div>
            )}
            {edit && (
              <div id="editID">
                <p>{"Edit your ID :"}</p>
                  <input
                    type="text"
                    placeholder="Enter your ID"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                  />
                <CheckCircleIcon onClick={changeID} />
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
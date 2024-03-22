// doc reference: https://github.com/PokeAPI/pokeapi-js-wrapper?tab=readme-ov-file#usage

import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";

import './css/Pokedle.css'
import back1 from '../assets/pokedle/1back.webp'

export default function Pokedle() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <Container>
      <div className="pokedle-header">
        <img src="https://pokedle.net/img/Logo.61061752.webp"
          alt="Pokedle Logo"
          className="pokedle-App-Logo"
          height={'70px'}
        />
      </div>
      <div className="pokedle-game">
        <h1>Guess a Pokemon !</h1>
      </div>
      {!isGameStarted && (
        <div className="pokedle-button-container" onClick={()=>setIsGameStarted(true)}>
          <div className="button-game">
            <img className="button-img" src={back1} width={'100%'} />
            <div className="button-title">CLASSIC</div>
            <div className="button-description">Get clues on every try</div>
          </div>
        </div>
      )}
      {isGameStarted && (
        <div className="pokedle-game">
          <div className="pokedle-loading-box">
            <div className="pokedle-loading-box-text">
              Loading...
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

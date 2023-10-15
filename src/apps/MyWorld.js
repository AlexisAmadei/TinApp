import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import WorldMap from "react-svg-worldmap";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { db } from '../.config/firebaseConfig'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import countriesList from '../assets/json/countries.json';
import './css/MyWorld.css';

export default function MyWorld() {
  const countryList = countriesList;
  const [country, setCountry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [travelMethod, setTravelMethod] = useState("");
  const [formData, setFormData] = useState({});
  const [errorForm, setErrorForm] = useState("");
  const [validateForm, setValidateForm] = useState("");
  const [data, setData] = useState([]);
  const user = getAuth().currentUser;

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleTravelMethod = (event) => {
    setTravelMethod(event.target.value);
  };

  useEffect(() => {
    async function getAppData() {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const querySnapshot = await getDoc(userRef);

        if (querySnapshot.exists()) {
          const userData = querySnapshot.data();
          if (userData && userData.apps && userData.apps.myWorld) {
            setData(userData.apps.myWorld);
          } else {
            setData([]);
          }
        } else {
          setData([]);
        }
      }
    }
    getAppData();
  }, [user]);

  async function updateUserData() {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "apps.myWorld": data,
      });
    }
  }

  function handleSubmit() {
    if (country && purpose && travelMethod) {
      setFormData({
        country: country,
        purpose: purpose,
        travelMethod: travelMethod
      });
      data.push({ country: country.toLowerCase()});
      setValidateForm("Country added !");
      updateUserData();
    } else {
      setErrorForm("Veuillez remplir tous les champs");
    }
    setTimeout(() => {
      setErrorForm("");
      setValidateForm("");
    }, 3000);
    setCountry("");
    setPurpose("");
    setTravelMethod("");
  }

  const stylingFunction = (context) => {
    return {
      fill: context.value === 1 ? "red" : context.value === 2 ? "green" : "blue",
      fillOpacity: 1,
      stroke: "green",
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: "pointer"
    }
  };

  return (
    <div className="my-world-wrapper">
      <div className="app-header">
        <h1>Welcome to My World!</h1>
      </div>
      <div className="edit-map">
        <FormControl className="form-control">
          <InputLabel htmlFor="country-select">Pays</InputLabel>
          <Select
            fullWidth={true}
            native={false}
            value={country}
            onChange={handleCountryChange}
            label="Pays"
            inputProps={{
              id: "country-select",
            }}
          >
            <MenuItem value="">
              <em>Choisissez un pays</em>
            </MenuItem>
            {countryList.map((country) => (
              <MenuItem key={country.name} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-control">
          <InputLabel htmlFor="purpose-select">Purpose</InputLabel>
          <Select
            fullWidth={true}
            native={false}
            value={purpose}
            onChange={handlePurposeChange}
            label="Purpose"
            inputProps={{
              id: "purpose-select",
            }}
          >
            <MenuItem value="">
              <em>Choose a purpose</em>
            </MenuItem>
            <MenuItem value="vacation">Vacation</MenuItem>
            <MenuItem value="lived">Lived</MenuItem>
            <MenuItem value="wish">Wish</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-control">
          <InputLabel htmlFor="travel-method">How ?</InputLabel>
          <Select
            fullWidth={true}
            native={false}
            value={travelMethod}
            onChange={handleTravelMethod}
            label="Travel method"
            inputProps={{
              id: "travel-method",
            }}
            required
          >
            <MenuItem value="">
              <em>Choose a travel method</em>
            </MenuItem>
            <MenuItem value="plane">Plane</MenuItem>
            <MenuItem value="car">Car</MenuItem>
            <MenuItem value="boat">Boat</MenuItem>
            <MenuItem value="bus">Bus</MenuItem>
            <MenuItem value="legs">My own legs</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          label="Submit"
          onClick={() => { handleSubmit() }}
        >Add Country</Button>
      </div>
      <p style={{color:"red", fontWeight:"bolder", textAlign:'center'}}>{errorForm}</p>
      <p style={{color:"green", fontWeight:"bolder", textAlign:'center'}} >{validateForm}</p>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <WorldMap
          data={data}
          styleFunction={stylingFunction}
        />
      </Container>
    </div>
  );
}

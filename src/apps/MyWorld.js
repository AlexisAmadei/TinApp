import React from "react";
import Container from "@mui/material/Container";
import WorldMap from "react-svg-worldmap";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import countriesList from '../assets/json/countries.json';
import './css/MyWorld.css';

export default function MyWorld() {
  const countryList = countriesList;
  const [country, setCountry] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [travelMethod, setTravelMethod] = React.useState("");
  const [formData, setFormData] = React.useState({});
  const [errorForm, setErrorForm] = React.useState("");
  const [validateForm, setValidateForm] = React.useState("");
  const [data, setData] = React.useState([]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleTravelMethod = (event) => {
    setTravelMethod(event.target.value);
  };

  function handleSubmit() {
    if (country && purpose && travelMethod) {
      setFormData({
        country: country,
        purpose: purpose,
        travelMethod: travelMethod
      });
      data.push({ country: country.toLowerCase(), value: 100 });
      setValidateForm("Country added !");
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
          color="red"
        />
      </Container>
    </div>
  );
}

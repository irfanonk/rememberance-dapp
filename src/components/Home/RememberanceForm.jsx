import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const defaultValues = {
  firstName: "",
  lastName: "",
  birthCity: "",
  birthCountry: "",
  birthDate: "",
  deathDate: "",
  notes: "",
};
const RememberanceForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <form onSubmit={handleSubmit}>
      <Item>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="name-input"
              name="firstName"
              label="First Name"
              type="text"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <TextField
              fullWidth
              id="lastName-input"
              name="lastName"
              label="Last Name"
              type="text"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="birthCity-input"
              name="birthCity"
              label="City of Birth"
              type="text"
              value={formValues.birthCity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <TextField
              fullWidth
              id="birthCountry-input"
              name="birthCountry"
              label="Contry of Birth"
              type="text"
              value={formValues.birthCountry}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <TextField
              fullWidth
              id="birthDate-input"
              name="birthDate"
              label="Date of Birth"
              type="text"
              value={formValues.birthDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <TextField
              fullWidth
              id="deathDate-input"
              name="deathDate"
              label="Date of Death"
              type="text"
              value={formValues.deathDate}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="notes-input"
              name="notes"
              label="Notes"
              type="text"
              multiline
              minRows={3}
              value={formValues.notes}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Item>
    </form>
  );
};
export default RememberanceForm;
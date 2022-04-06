import React, { useContext, useState } from "react";
import { Grid, Button, Card, CardHeader } from "@mui/material";
import TextField from "@mui/material/TextField";
import { web3Context } from "../../contex/web3Context";

export default function SearchForm({ handleSubmit }) {
  const { networkId } = useContext(web3Context);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    birthCity: "PENNSYLVANIA",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value.toUpperCase(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Object.keys(formValues).forEach(
      (k) => (formValues[k] = formValues[k].trim())
    );
    handleSubmit(formValues);
  };

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ margin: 5, padding: 2, minWidth: "100%", height: "auto" }}>
        <CardHeader title="Search" subheader="Search for a rememberance" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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

          <Grid
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {!networkId ? (
              <Button
                disabled={true}
                variant="contained"
                color="primary"
                type="submit"
              >
                Install Metamask
              </Button>
            ) : (
              <Button
                disabled={
                  !formValues.firstName &&
                  !formValues.lastName &&
                  !formValues.birthCity
                }
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}

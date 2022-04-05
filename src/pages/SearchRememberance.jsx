import { Container, Grid, Typography, Alert } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import RememberanceCard from "../components/MyRememberance/RememberanceCard";
import SearchBar from "../components/SearchRememberance/SearchForm";
import { web3Context } from "../contex/web3Context";

export default function SearchRememberance() {
  const { filterEpitaphs, getEpitaphs, account } = useContext(web3Context);

  const [filteredEpitaphs, setFilteredEpitaphs] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      // const filter = await filterEpitaphs("kamil", "kamil");
      // console.log("filter", filter);
    })();

    return () => {};
  }, []);

  const handleSubmit = async (formValues) => {
    console.log("formValues", formValues);
    setMessage("");
    const { firstName, lastName, birthCity } = formValues;
    let epitaphs = [];
    try {
      const filter = await filterEpitaphs(firstName, lastName, birthCity);
      console.log("filter", filter);
      if (filter.length > 0) {
        for (let i = 0; i < filter.length; i++) {
          const { args, transactionHash } = filter[i];
          // console.log("args", args);
          epitaphs.push({
            id: i,
            firstName: args.firstNameStr,
            lastName: args.lastNameStr,
            birthCity: args.birthCityStr,
            birthCountry: args.birthCountry,
            birthDate: args.birthDate,
            deathDate: args.deathDate,
            notes: args.notes,
            txHash: transactionHash,
          });
          setFilteredEpitaphs([...epitaphs]);
          // console.log("epitaphs", epitaphs);
        }
      } else {
        setFilteredEpitaphs([]);
        setMessage("No records found!");
      }
      // setFilteredEpitaphs(filter);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Grid
        sx={{ flexGrow: 1, justifyContent: "center" }}
        container
        spacing={2}
      >
        <SearchBar handleSubmit={handleSubmit} />
      </Grid>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {filteredEpitaphs &&
              filteredEpitaphs.map((epitaph, index) => (
                <Grid key={index} item>
                  <RememberanceCard epitaph={epitaph} />
                </Grid>
              ))}
            {message && (
              <Alert severity="error">
                <Typography>{message}</Typography>
              </Alert>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import RememberanceCard from "../components/MyRememberance/RememberanceCard";
import SearchBar from "../components/SearchRememberance/SearchForm";
import { web3Context } from "../contex/web3Context";

export default function SearchRememberance() {
  const { filterEpitaphs, getEpitaphs, account } = useContext(web3Context);

  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    (async () => {
      // const filter = await filterEpitaphs("kamil", "kamil");
      // console.log("filter", filter);
    })();

    return () => {};
  }, []);

  const handleSubmit = async (formValues) => {
    console.log("submit", formValues);
    const { firstName, lastName, birthCity } = formValues;
    try {
      const filter = await filterEpitaphs(firstName, lastName, birthCity);
      console.log("filter", filter);
      // setFilteredEvents(filter);
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
            {filteredEvents ? (
              filteredEvents.map((epitaph, index) => (
                <Grid key={index} item>
                  <RememberanceCard epitaph={epitaph} />
                </Grid>
              ))
            ) : (
              <Typography variant="h5" gutterBottom>
                No results found!
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

import { Container, Grid, Typography, Alert } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import RememberanceCard from "../components/MyRememberance/RememberanceCard";
import SearchBar from "../components/SearchRememberance/SearchForm";
import { web3Context } from "../contex/web3Context";
import { startBlockNumber } from "../contracts/constants";

export default function SearchRememberance() {
  const { filterEpitaphs, getEpitaphs, getBlock, account } =
    useContext(web3Context);

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
    setMessage("");
    const { firstName, lastName, birthCity } = formValues;
    const block = await getBlock();
    const endBlokcNumber = block.number;

    let epitaphs = [];

    try {
      for (let i = startBlockNumber; i < endBlokcNumber; i += 5000) {
        const _startBlock = i;
        const _endBlock = Math.min(endBlokcNumber, i + 4999);
        const filter = await filterEpitaphs(
          firstName,
          lastName,
          birthCity,
          _startBlock,
          _endBlock
        );
        // console.log("filter", filter);
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
          }
        } else {
          setFilteredEpitaphs([]);
          setMessage("No records found!");
        }
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

import { Grid, Container, Typography } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import RememberanceCard from "../components/MyRememberance/RememberanceCard";
import { web3Context } from "../contex/web3Context";

export default function MyRememberance() {
  const { getEpitaphs, account } = useContext(web3Context);

  const [rememberances, setRememberances] = useState([]);

  useEffect(() => {
    if (account) {
      (async () => {
        let epitaphs = [];
        try {
          const epitaph = await getEpitaphs(account);
          console.log("epitaph, ", epitaph);
          epitaphs.push({
            id: 0,
            firstName: epitaph.firstName,
            lastName: epitaph.lastName,
            birthCity: epitaph.birthCity,
            birthCountry: epitaph.birthCountry,
            birthDate: epitaph.birthDate,
            deathDate: epitaph.deathDate,
            notes: epitaph.notes,
          });
          setRememberances(epitaphs);
        } catch (error) {
          console.log("error", error);
        }
      })();
    }

    return () => {};
  }, [account]);

  return (
    <Container sx={{ padding: 2 }}>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {rememberances.length > 0 ? (
              rememberances.map((epitaph, index) => (
                <Grid key={index} item>
                  <RememberanceCard epitaph={epitaph} />
                </Grid>
              ))
            ) : (
              <Typography variant="h5" gutterBottom>
                You have no rememberances added yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

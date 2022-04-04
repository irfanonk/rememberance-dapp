import { Grid, Container, Typography } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import RememberanceCard from "../components/MyRememberance/RememberanceCard";
import { web3Context } from "../contex/web3Context";

export default function MyRememberance() {
  const { getAddressEpitaphCount, getEpitaphs, account } =
    useContext(web3Context);

  const [rememberances, setRememberances] = useState({});
  const [message, setMessage] = useState(
    "You have no rememberances added yet."
  );

  useEffect(() => {
    console.log("rememberances", rememberances);
    if (account) {
      (async () => {
        let epitaphs = [];
        try {
          const count = await getAddressEpitaphCount(account);
          if (count > 0) {
            setMessage("Getting your rememberances...");
            for (let i = 0; i < count; i++) {
              const epitaph = await getEpitaphs(account, i);
              epitaphs.push({
                id: i,
                firstName: epitaph.firstName,
                lastName: epitaph.lastName,
                birthCity: epitaph.birthCity,
                birthCountry: epitaph.birthCountry,
                birthDate: epitaph.birthDate,
                deathDate: epitaph.deathDate,
                notes: epitaph.notes,
              });
              setRememberances([...epitaphs]);
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      })();
    }

    return () => {};
  }, [account]);
  console.log("rememberances", rememberances);

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
                {message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

import { Grid, Container, Typography } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import RememberanceCard from "../components/MyRememberance/RememberanceCard";
import { web3Context } from "../contex/web3Context";

export default function MyRememberance() {
  const { getAddressEpitaphCount, getEpitaphs, account } =
    useContext(web3Context);

  const [rememberances, setRememberances] = useState([]);
  const [message, setMessage] = useState(
    "Please connect to MetaMask to add a CryObit (Obituary That lives forever on the block-chain)."
    );

  useEffect(() => {
    if (account) {
      (async () => {
        let epitaphs = [];
        try {
          setMessage("You have no CryObits.");
          const count = await getAddressEpitaphCount(account);
          if (count > 0) {
            setMessage("Getting your CryObits...");
            for (let i = 0; i < count; i++) {
              const epitaph = await getEpitaphs(account, i);
              // console.log("epitaph", epitaph);
              epitaphs.push({
                id: i,
                firstName: epitaph.firstName,
                lastName: epitaph.lastName,
                birthCity: epitaph.birthCity,
                birthCountry: epitaph.birthCountry,
                birthDate: epitaph.birthDate,
                deathDate: epitaph.deathDate,
                imageUri: epitaph.imageUri,
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

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <Grid sx={{ flexGrow: 1 }} spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            xs={12}
            justifyContent="center"
            alignItems="center"
            spacing={1}
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

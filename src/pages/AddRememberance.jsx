import { Container, Modal, Box, Typography, Link, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RememberanceForm from "../components/AddRemembarence/RememberanceForm";
import { web3Context } from "../contex/web3Context";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export default function AddRememberance() {
  const navigate = useNavigate();
  const { createEpitaph } = useContext(web3Context);
  const [isCreating, setIsCreating] = useState(false);
  const [txHash, setTxHash] = useState("");
  const onRememberanceSumbit = async (formValues) => {
    console.log("formValues", formValues);
    setIsCreating(true);
    try {
      const result = await createEpitaph(formValues);
      console.log("result", result);
      setIsCreating(false);
      setTxHash(result.transactionHash);
    } catch (error) {
      console.log("error", error);
      setIsCreating(false);
    }
  };
  const handleClose = () => {
    navigate("/");
  };
  return (
    <Container>
      <Modal
        open={txHash}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You have successfully created your rememberance!
          </Typography>
          <Link
            href={`https://rinkeby.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopenner noreferrer"
            underline="none"
          >
            <Typography
              id="modal-modal-description"
              sx={{ my: 2, display: "flex", gap: 1 }}
            >
              {txHash}
              <TravelExploreIcon />
            </Typography>
          </Link>
          <Button
            sx={{ textAlign: "center", minWidth: "100%" }}
            disabled={isCreating}
            onClick={handleClose}
            variant="contained"
            color="primary"
            type="submit"
          >
            Close
          </Button>
        </Box>
      </Modal>
      <RememberanceForm
        isCreating={isCreating}
        onRememberanceSumbit={onRememberanceSumbit}
      />
    </Container>
  );
}

import {
  Container,
  Modal,
  Box,
  Typography,
  Link,
  Button,
  Paper,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RememberanceForm from "../components/AddRemembarence/RememberanceForm";
import { web3Context } from "../contex/web3Context";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Web3Storage } from "web3.storage";
export default function AddRememberance() {
  console.log("env", process.env);
  const navigate = useNavigate();
  const { createEpitaph } = useContext(web3Context);
  const [isCreating, setIsCreating] = useState(false);
  const [upload, setUpload] = useState({
    isUploading: false,
    isUploaded: false,
  });
  const [txHash, setTxHash] = useState("");

  const onRememberanceSumbit = async (formValues) => {
    console.log("formValues", formValues);
    setIsCreating(true);
    setUpload({ isUploading: true, isUploaded: false });

    try {
      // const ipfs = create({
      //   url: "https://ipfs.infura.io:5001/api/v0",
      // });
      // console.log("ipfs", ipfs);
      // const imageUpload = await ipfs.add(formValues.picture);

      const client = new Web3Storage({
        token: process.env.REACT_APP_WEB3_STORAGE_TOKEN,
      });
      console.log("client", client);

      const fileName = formValues.picture.name;
      const fileType = formValues.picture.type;

      const newFile = new File([formValues.picture], fileName, {
        type: fileType,
      });

      const cid = await client.put([newFile], {
        name: formValues.picture.name,
      });
      // console.log("cid", cid, fileName);
      const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
      formValues.imageUri = imageURI;

      setUpload({ isUploading: false, isUploaded: true });

      // console.log("formValues", formValues);

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
      <Dialog
        fullWidth={false}
        maxWidth={"xl"}
        open={txHash}
        onClose={handleClose}
      >
        <DialogTitle color="text.primary" sx={{ textAlign: "center" }}>
          You have successfully created your CryObit!
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            <Link
              href={`https://testnet.bscscan.com/address/${txHash}`}
              target="_blank"
              rel="noopenner noreferrer"
              underline="none"
              sx={{ display: "flex", gap: 1 }}
            >
              <Typography noWrap>{txHash}</Typography>
              <TravelExploreIcon />
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <RememberanceForm
        isCreating={isCreating}
        upload={upload}
        onRememberanceSumbit={onRememberanceSumbit}
      />
    </Container>
  );
}

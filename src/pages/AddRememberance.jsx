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
// import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { Web3Storage } from "web3.storage";
export default function AddRememberance() {
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
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY0QzlhMzcwNjUyNjA5ODQwMjNjMzQwNmE1M0M4MDE0OTU0Y0RjRjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDkzMjY1NzU2NTYsIm5hbWUiOiJyZW1lbWJlcmFuY2UifQ.zK888SqV4gkQULvuu506ggjMDfXzQdtZkGVDIN9ypr0",
      });
      const fileName = formValues.picture.name;
      const fileType = formValues.picture.type;

      const newFile = new File([formValues.picture], fileName, {
        type: fileType,
      });
      setUpload({ isUploading: false, isUploaded: true });

      const cid = await client.put([newFile], {
        name: formValues.picture.name,
      });
      // console.log("cid", cid, fileName);
      const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;

      formValues.imageUri = imageURI;

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
          {/* <Paper variant="elevation">
            <img
              src={
                "https://bafybeiaxmgtzusnsiqtnz6rgugjbc3xv3p7e57mw6jxo5yjyyvwgcbybmu.ipfs.dweb.link/sword-and-shield.jpg"
              }
            />
          </Paper> */}
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
        upload={upload}
        onRememberanceSumbit={onRememberanceSumbit}
      />
    </Container>
  );
}

import React, { useState, useContext } from "react";
import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { CircularProgress, LinearProgress } from "@mui/material";
import { web3Context } from "../../contex/web3Context";
import { DropzoneArea } from "react-mui-dropzone";
const defaultValues = {
  firstName: "",
  lastName: "",
  birthCity: "",
  birthCountry: "",
  birthDate: "1940-01-01",
  deathDate: "2020-01-01",
  notes:
    "",
  picture: "",
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RememberanceForm = ({ onRememberanceSumbit, isCreating, upload }) => {
  const { networkId, account, isSupportMetaMask } = useContext(web3Context);

  const [formValues, setFormValues] = useState(defaultValues);

  const [isSumModalOpen, setIsSumModalOpen] = useState(false);

  const handleClose = () => setIsSumModalOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: name !== "notes" ? value.toUpperCase() : value,
    });
  };
  const handleDropChange = (files) => {
    const { name, value } = files.target;
    // console.log("files", files.target);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const reader = new FileReader();

    reader.readAsDataURL(formValues.picture);
    reader.onload = (loadEvt) => {
      // console.log("onload", loadEvt.target?.result);
      setFormValues({
        ...formValues,
        pictureUrl: loadEvt.target?.result,
      });
      setIsSumModalOpen(true);
    };
  };

  const onCreateClick = () => {
    Object.keys(formValues).forEach(
      (k) =>
        typeof formValues[k] === "string" &&
        (formValues[k] = formValues[k].trim())
    );
    // console.log("formValues", formValues);
    onRememberanceSumbit(formValues);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isSumModalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", display: "flex" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button autoFocus color="inherit" onClick={onCreateClick}>
              {isCreating ? <CircularProgress color="inherit" /> : "Create"}
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          {upload.isUploading ? (
            <>
              <LinearProgress />
              <Chip
                color="primary"
                label="Uploading image..."
                variant="outlined"
              />
            </>
          ) : upload.isUploaded ? (
            <>
              <Chip
                color="warning"
                label="Waiting for transaction to be confirmed..."
                variant="outlined"
              />
            </>
          ) : (
            ""
          )}
        </Box>
        <List>
          <Typography
            sx={{ p: 2, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Please review your information!
          </Typography>
          <ListItem>
            <ListItemText
              primary={formValues.firstName + " " + formValues.lastName}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={formValues.birthCity + " / " + formValues.birthCountry}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={formValues.birthDate + " " + formValues.deathDate}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={formValues.notes} />
          </ListItem>
          <Divider />
          <ListItem sx={{ justifyContent: "center" }}>
            <Paper style={{ textAlign: "center" }} variant="elevation">
              <img
                style={{ maxWidth: 350, maxHeight: "100%" }}
                src={formValues.pictureUrl}
              />
            </Paper>
          </ListItem>
        </List>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="birthCountry-input"
                name="birthCountry"
                label="Country of Birth"
                type="text"
                value={formValues.birthCountry}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="outlined"
                name="birthDate"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                value={formValues.birthDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                fullWidth
                id="outlined"
                name="deathDate"
                label="Date of Death"
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                value={formValues.deathDate}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                id="notes-input"
                name="notes"
                label="Paste Official Obituary first then add personal remembrances last."
                type="text"
                multiline
                minRows={3}
                value={formValues.notes}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DropzoneArea
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                maxFileSize={2097152} //2mb
                filesLimit={1}
                dropzoneText="Please add your loved one's picture"
                showFileNames
                showAlerts
                onChange={(files) =>
                  handleDropChange({
                    target: { name: "picture", value: files[0] },
                  })
                }
              />
            </Grid>

            <Grid
              container
              item
              direction="row"
              justifyContent="center"
              alignItems="center"
              margin={5}
            >
              {!isSupportMetaMask ? (
                <Button
                  disabled={true}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Install Metamask
                </Button>
              ) : !account ? (
                <Button
                  disabled={true}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Connect Metamask
                </Button>
              ) : (
                <Button
                  disabled={
                    Object.values(formValues).filter(
                      (v) => !v || (typeof v === "string" && v.trim() === "")
                    ).length > 0
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
        </>
      </form>
    </>
  );
};
export default RememberanceForm;

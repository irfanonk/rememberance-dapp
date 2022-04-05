import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

const defaultValues = {
  firstName: "Jane",
  lastName: "Kennedy",
  birthCity: "Pennsylvania",
  birthCountry: "USA",
  birthDate: "1970-01-01",
  deathDate: "2020-01-01",
  notes:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
};
const RememberanceForm = ({ onRememberanceSumbit, isCreating }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const [isSumModalOpen, setIsSumModalOpen] = useState(false);

  const handleClose = () => setIsSumModalOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSumModalOpen(true);
  };
  const onCreateClick = () => {
    onRememberanceSumbit(formValues);
  };

  return (
    <>
      <Modal
        open={isSumModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please confirm your submission
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {formValues.firstName} {formValues.lastName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {formValues.birthCity} {formValues.birthCountry}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {formValues.birthDate} {formValues.deathDate}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {formValues.notes}
          </Typography>
          <Button
            sx={{ textAlign: "center", minWidth: "100%" }}
            disabled={isCreating}
            onClick={onCreateClick}
            variant="contained"
            color="primary"
            type="submit"
          >
            {isCreating ? <CircularProgress /> : "Create"}
          </Button>
        </Box>
      </Modal>
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
                label="Notes"
                type="text"
                multiline
                minRows={3}
                value={formValues.notes}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              container
              item
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      </form>
    </>
  );
};
export default RememberanceForm;

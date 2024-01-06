"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { editSchedule, postSchedule } from "../api/api";
import timeArray from "../constants/time.constant";
import frequency from "../constants/frequency.constant";
import {
  monthFrequencyRepeat,
  dayFrequencyRepeat,
} from "../constants/repeat.constant";
import EditIcon from "@mui/icons-material/Edit";

export default function CustomizedDialogs(props: any) {
  const editModeProp = props.editModeProp;
  const editScheduleId = props.editScheduleId;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "",
    repeat: "",
    time: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validateFields = () => {
    let errorMessage = "";

    switch (true) {
      case formData.title === "":
        errorMessage = "Title is a required field.";
        break;
      case formData.description === "":
        errorMessage = "Description is a required field.";
        break;
      case formData.subject === "":
        errorMessage = "Subject is a required field.";
        break;
      case formData.frequency === "":
        errorMessage = "Frequency is a required field.";
        break;
      case formData.time === "":
        errorMessage = "Time is a required field.";
        break;
      default:
        break;
    }

    if (errorMessage !== "") {
      alert(errorMessage);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const postNewSchedule = async (event: any) => {
    event.preventDefault();
    if (editModeProp) {
      editSchedule(editScheduleId, formData);
    } else {
      await postSchedule(formData);
      validateFields();
    }
    handleClose();
  };
  return (
    <React.Fragment>
      {editModeProp ? (
        <>
          <Box onClick={handleClickOpen}>
            <EditIcon />
          </Box>
        </>
      ) : (
        <Button variant="contained" onClick={handleClickOpen}>
          ADD
        </Button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editModeProp ? "Edit Schedule" : "Add Schedule"}
        </DialogTitle>
        <DialogContent className="add-schecdule">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Title
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                id="title"
                name="title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              Description
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                id="description"
                name="description"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              Subject
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                id="subject"
                name="subject"
                fullWidth
                value={formData.subject}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              Frequency
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <Select
                  required
                  label="Frquency"
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                >
                  {frequency.map((freq, index) => {
                    return (
                      <MenuItem key={index} value={freq}>
                        {freq}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            {(formData.frequency === "Monthly" ||
              formData.frequency === "Weekly") && (
              <>
                <Grid item xs={4}>
                  Repeat
                </Grid>
                <Grid item xs={8}>
                  {formData.frequency === "Monthly" ? (
                    <FormControl fullWidth>
                      <Select
                        required
                        label="Time"
                        id="repeat"
                        name="repeat"
                        value={formData.repeat}
                        onChange={handleChange}
                      >
                        {monthFrequencyRepeat.map((repeat: any, index) => (
                          <MenuItem key={index} value={repeat}>
                            {repeat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Container>
                      <FormGroup>
                        {dayFrequencyRepeat.map((repeat, index) => (
                          <Box key={index}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={`day${repeat}`}
                                  name="repeat"
                                  value={repeat}
                                  checked={formData.repeat === repeat}
                                  onChange={handleChange}
                                />
                              }
                              label={<span>{repeat.slice(0, 1)}</span>}
                            />
                          </Box>
                        ))}
                      </FormGroup>
                    </Container>
                  )}
                </Grid>
              </>
            )}

            <Grid item xs={4}>
              Time
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <Select
                  required
                  label="Time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  {timeArray.map((time, index) => {
                    return (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={postNewSchedule}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

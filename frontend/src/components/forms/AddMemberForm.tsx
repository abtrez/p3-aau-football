"use client";

import {
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  Box,
  Typography,
  Alert,
  Button,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import addPlayerToTeam from "@/lib/fetchPerson";

interface AddMemberFormProps {
  teamId: string;
}

export default function AddMemberForm({ teamId }: AddMemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [playerAdded, setPlayerAdded] = useState(false);
  const [positionGroup, setPositionGroup] = useState("");
  const [position, setPosition] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formValues = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    // Create payload with the form data
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      role: "PLAYER",
      teamId: teamId,
      positionGroup: formData.get("positionGroup"),
      position: formData.get("position"),
      shirtNumber: formData.get("shirtNumber"),
    };

    const response = await addPlayerToTeam(payload);
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      setPlayerAdded(true);
      formValues.reset();
      setPositionGroup("");
      setPosition("");
    }
    setLoading(false);
  }
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        p: 4,
        borderRadius: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ mb: 0.5, textAlign: "center" }}>
          Add team member
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Fill out the details below to add a new player to your team.
        </Typography>
        <Alert
          sx={{ mb: 3 }}
          severity="error"
          className="text-center"
          hidden={errorMessage == ""}
        >
          {errorMessage}
        </Alert>
        <Alert
          sx={{ mb: 3 }}
          severity="success"
          className="text-center"
          hidden={!playerAdded}
        >
          Player has successfully been added to the team
        </Alert>

        {/* First + Last name */}
        <FormGroup row sx={{ gap: 2, mb: 2 }}>
          <FormControl fullWidth required>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName" name="firstName" />
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" name="lastName" />
          </FormControl>
        </FormGroup>

        {/* Position group and position */}
        <FormGroup row sx={{ gap: 2, mb: 2 }}>
          {/* Hidden role field */}
          <Input id="role" name="role" value="PLAYER" type="hidden" />

          <FormControl fullWidth required>
            <InputLabel htmlFor="positionGroup">Position group</InputLabel>
            <Select
              id="positionGroup"
              name="positionGroup"
              value={positionGroup}
              label="positionGroup"
              defaultValue=""
              onChange={(event) => {
                setPositionGroup(event.target.value as string);
              }}
            >
              <MenuItem value="DEF">DEF</MenuItem>
              <MenuItem value="MID">MID</MenuItem>
              <MenuItem value="FOW">FOW</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="position">Position</InputLabel>
            <Select
              id="position"
              name="position"
              value={position}
              label="Position"
              defaultValue=""
              onChange={(event) => {
                setPosition(event.target.value as string);
              }}
            >
              <MenuItem value="CB">CB</MenuItem>
              <MenuItem value="LB">LB</MenuItem>
              <MenuItem value="RB">RB</MenuItem>
              <MenuItem value="LWB">LWB</MenuItem>
              <MenuItem value="RWB">RWB</MenuItem>
              <MenuItem value="CDM">CDM</MenuItem>
              <MenuItem value="CM">CM</MenuItem>
              <MenuItem value="CAM">CAM</MenuItem>
              <MenuItem value="LM">LM</MenuItem>
              <MenuItem value="LM">RM</MenuItem>
              <MenuItem value="LW">LW</MenuItem>
              <MenuItem value="RW">RW</MenuItem>
              <MenuItem value="LA">LA</MenuItem>
              <MenuItem value="RA">RA</MenuItem>
              <MenuItem value="ST">CF</MenuItem>
              <MenuItem value="CF">ST</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>

        {/* Shirt number */}
        <FormGroup sx={{ gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="shirtNumber">Shirt number</InputLabel>
            <Input id="shirtNumber" name="shirtNumber" type="number" />
          </FormControl>
        </FormGroup>

        {/* Submit button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Adding team member..." : "Add team member"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

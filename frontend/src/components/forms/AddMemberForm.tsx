"use client";

import {
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";

interface AddMemberFormProps {
  teamId: string;
}

export default function AddMemberForm({ teamId }: AddMemberFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Add the team's ID from the leaders session which comes from the prop
    formData.append("teamId", teamId);

    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const addedTeamId = formData.get("teamId");
    const shirtNumber = formData.get("shirt-number");
    const positionGroup = formData.get("position-group");
    const position = formData.get("position");
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

        {/* First + Last name */}
        <FormGroup row sx={{ gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input id="first-name" name="first-name" />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input id="last-name" name="last-name" />
          </FormControl>
        </FormGroup>

        {/* Position group and position */}
        <FormGroup row sx={{ gap: 2, mb: 2 }}>
          {/* Hidden role field */}
          <Input id="role" name="role" value="PLAYER" type="hidden" />

          <FormControl fullWidth>
            <InputLabel htmlFor="position-group">Position group</InputLabel>
            <Select
              id="position-group"
              name="position-group"
              label="Position group"
              defaultValue=""
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
              label="Position"
              defaultValue=""
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
              <MenuItem value="ST">ST</MenuItem>
              <MenuItem value="CF">CF</MenuItem>
              <MenuItem value="LW">LW</MenuItem>
              <MenuItem value="RW">RW</MenuItem>
              <MenuItem value="LA">LA</MenuItem>
              <MenuItem value="RA">RA</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>

        {/* Shirt number */}
        <FormGroup sx={{ gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="shirt-number">Shirt number</InputLabel>
            <Input
              id="shirt-number"
              name="shirt-number"
              type="number"
              inputProps={{ min: 1 }}
            />
          </FormControl>
        </FormGroup>

        {/* Submit button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained">
            Add new team member
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

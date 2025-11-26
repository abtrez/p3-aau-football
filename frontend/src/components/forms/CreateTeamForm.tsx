"use client";

import { addTeam } from "@/lib/fetchTeam";
import {
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  Typography,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useState } from "react";

export function CreateTeamForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [competitionCreated, setTeamCreated] = useState(false);

  return (
    <Paper elevation={3} className="w-95 h-110 p-10">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setErrorMessage("");
          setTeamCreated(false);

          const formValues = event.currentTarget;
          const formData = new FormData(event.currentTarget);

          const name = formData.get("name")?.toString();
          const abbreviation = formData.get("abbreviation")?.toString();
          const yearEstablished = Number(formData.get("yearEstablished"));
          const department = formData.get("department")?.toString();

          if (!name || !abbreviation || !yearEstablished || !department) {
            throw new Error("No correct values");
          }

          const response = await addTeam(
            name,
            abbreviation,
            yearEstablished,
            department,
            [],
            ""
          );

          if (response.error) {
            setErrorMessage(response.error);
          } else {
            setTeamCreated(true);
            formValues.reset();
          }

          setLoading(false);
        }}
      >
        <FormGroup className="gap-5">
          <Typography variant="h4" className="text-center">
            Create new team
          </Typography>
          <Alert
            severity="error"
            className="text-center"
            hidden={errorMessage == ""}
          >
            {errorMessage}
          </Alert>
          <Alert
            severity="success"
            className="text-center"
            hidden={competitionCreated == false}
          >
            Team created
          </Alert>
          <FormControl required>
            <InputLabel htmlFor="name">Team name</InputLabel>
            <Input id="name" name="name" type="text" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="abbreviation">Abbreviation</InputLabel>
            <Input id="abbreviation" name="abbreviation" type="text" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="yearEstablished">Year established</InputLabel>
            <Input id="yearEstablished" name="yearEstablished" type="number" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="department">Department</InputLabel>
            <Input id="department" name="department" type="text" />
          </FormControl>
          <FormControl>
            <Button variant="contained" type="submit" loading={loading}>
              Create Competition
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </Paper>
  );
}

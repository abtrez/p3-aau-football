"use client";

import { addCompetition } from "@/lib/fetchCompetition";
import {
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { useState } from "react";

export function CreateCompetitionForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [competitionCreated, setCompetitionCreated] = useState(false);
  const [currentSeason, setCurrentSeason] = useState("");

  console.log(currentSeason);

  return (
    <Paper elevation={3} className="w-95 h-110 p-10">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setErrorMessage("");
          setCompetitionCreated(false);

          const formValues = event.currentTarget;
          const formData = new FormData(event.currentTarget);

          const name = formData.get("name")?.toString();
          const season = formData.get("season")?.toString();

          if (!name || !season) {
            throw new Error("No correct values");
          }

          const response = await addCompetition(name, season);

          if (response.error) {
            setErrorMessage(response.error);
          } else {
            setCompetitionCreated(true);
            formValues.reset();
            setCurrentSeason("");
          }

          setLoading(false);
        }}
      >
        <FormGroup className="gap-5">
          <Typography variant="h4" className="text-center">
            Create new competition
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
            Competition created
          </Alert>
          <FormControl required>
            <InputLabel htmlFor="name">Competition name</InputLabel>
            <Input id="name" name="name" type="text" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="season">Season</InputLabel>
            <Select
              id="season"
              name="season"
              value={currentSeason}
              label="Season"
              onChange={(event) => {
                setCurrentSeason(event.target.value as string);
              }}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  const thisYear = new Date().getFullYear() + index;
                  const nextYear = thisYear + 1;
                  const season = `${thisYear}/${nextYear.toString().slice(2)}`;

                  return (
                    <MenuItem key={index} value={season}>
                      {season}
                    </MenuItem>
                  );
                })}
            </Select>
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

"use client";

import { addMatch } from "@/lib/fetchMatch";
import { Competition } from "@/lib/schemas/competitionSchema";
import { Team } from "@/lib/schemas/teamSchema";
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
import React, { useState } from "react";

export function CreateMatchForm({
  homeTeamId,
  opponentTeams,
  competition,
}: {
  homeTeamId: string;
  opponentTeams: Team[];
  competition: Competition;
}) {
  const [season, setSeason] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [venue, setVenue] = useState("");
  const [kickoff, setKickoff] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [matchCreated, setMatchCreated] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    setErrorMessage("");
    setMatchCreated(false);

    if (!awayTeam || !venue || !kickoff) {
      setErrorMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    const formValues = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    // Create payload with the form data
    const payload = {
      season,
      competition: competition || null,
      homeTeam: homeTeamId,
      awayTeam: awayTeam,
    };

    const response = await addMatch({
      season,
      competition,
      homeTeam: homeTeamId,
      awayTeam,
      venue,
      kickoff: new Date(kickoff).toISOString(),
    });

    if (response.error) {
      if (response.error) {
        setErrorMessage(response.error);
      }
    } else {
      setMatchCreated(true);
      event.currentTarget.reset();
      setSeason("");
      setAwayTeam("");
      setVenue("");
      setKickoff("");
    }

    setLoading(false);
  }

  return (
    <Paper elevation={3} className="w-[90%] max-w-3xl mx-auto p-8 my-10">
      <form onSubmit={handleSubmit}>
        <FormGroup className="gap-5">
          <Typography variant="h4" className="text-center">
            Create new match
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
            hidden={!matchCreated}
          >
            Match created
          </Alert>
          <FormControl required>
            <InputLabel htmlFor="awayTeam">Opponent team</InputLabel>
            <Select
              id="awayTeam"
              name="awayTeam"
              value={awayTeam}
              label="awayTeam"
              onChange={(event) => {
                setAwayTeam(event.target.value as string);
              }}
            >
              {opponentTeams.map((team) => {
                if (team.id === homeTeamId) return null;
                return (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="venue">venue</InputLabel>
            <Input
              id="venue"
              name="venue"
              type="text"
              onChange={(event) => {
                setVenue(event.target.value as string);
              }}
            />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="kickoff" shrink>
              kickoff
            </InputLabel>
            <Input
              id="kickoff"
              name="kickoff"
              type="datetime-local"
              onChange={(event) => {
                setKickoff(event.target.value as string);
              }}
            />
          </FormControl>
          <FormControl>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create match"}
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </Paper>
  );
}

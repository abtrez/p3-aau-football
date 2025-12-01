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
import { useState } from "react";

export function CreateMatchForm({
  homeTeam,
  teams,
  competitions,
}: {
  homeTeam: Team;
  teams: Team[];
  competitions: Competition[];
}) {
  const [season, setSeason] = useState("");
  const [competition, setCompetition] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [venue, setVenue] = useState("");
  const [kickoff, setKickoff] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [matchCreated, setMatchCreated] = useState(false);

  return (
    <Paper elevation={3} className="w-[90%] max-w-3xl mx-auto p-8 my-10">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setErrorMessage("");
          setMatchCreated(false);

          if (!season || !competition || !awayTeam || !venue || !kickoff) {
            throw new Error("Please fill all fields");
          }

          const response = await addMatch({
            season,
            competition,
            homeTeam: homeTeam.id,
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
            setCompetition("");
            setAwayTeam("");
            setVenue("");
            setKickoff("");
          }

          setLoading(false);
        }}
      >
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
            hidden={matchCreated == false}
          >
            Match created
          </Alert>
          <FormControl required>
            <InputLabel htmlFor="season">Season</InputLabel>
            <Select
              id="season"
              name="season"
              value={season}
              label="Season"
              onChange={(event) => {
                setSeason(event.target.value as string);
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
          <FormControl required>
            <InputLabel htmlFor="competition">Competition</InputLabel>
            <Select
              id="competition"
              name="competition"
              value={competition}
              label="competition"
              onChange={(event) => {
                setCompetition(event.target.value as string);
              }}
            >
              {competitions.map((competition) => {
                return (
                  <MenuItem key={competition.id} value={competition.id}>
                    {competition.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
              {teams.map((team) => {
                if (team.id === homeTeam.id) return null;
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

"use client";

import { authClient } from "@/lib/auth/auth-client";
import { fetchTeams } from "@/lib/fetchTeam";
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

const teams: Team[] = await fetchTeams();

export function CreateMatchForm({ homeTeam }: { homeTeam: Team }) {
  const [currentTeam, setCurrentTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [matchCreated, setMatchCreated] = useState(false);

  return (
    <Paper elevation={3} className="w-95 h-110 p-10">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setErrorMessage("");
          setMatchCreated(false);

          const formValues = event.currentTarget;
          const formData = new FormData(event.currentTarget);

          const team = formData.get("team")?.toString();

          if (!team) {
            throw new Error("No correct values");
          }

          const response = await authClient.createMatch.team({
            season: String,
            competitionId: String,
            homeTeam: team,
            awayTeam: team,
            venue: venue,
            team: team,
          });

          if (response.error) {
            if (response.error.message) {
              setErrorMessage(response.error.message);
            } else {
              setErrorMessage("Error creating match");
            }
          } else {
            setMatchCreated(true);
            formValues.reset();
            setCurrentTeam("");
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
            <InputLabel htmlFor="season">season</InputLabel>
            <Input id="season" name="season" type="season" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="competition">competition</InputLabel>
            <Input id="competition" name="competition" type="competition" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="team">away Team</InputLabel>
            <Select
              id="team"
              name="team"
              value={currentTeam}
              label="Team"
              onChange={(event) => {
                setCurrentTeam(event.target.value as string);
              }}
            >
              {teams.map((team) => {
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
            <Input id="venue" name="venue" type="venue" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="kickoff">kickoff</InputLabel>
            <Input id="kickoff" name="kickoff" type="kickoff" />
          </FormControl>
          <FormControl>
            <Button variant="contained" type="submit" loading={loading}>
              Create match
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </Paper>
  );
}

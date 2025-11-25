"use client";

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
} from "@mui/material";
import { useState } from "react";

export function SignUpForm({ teams }: { teams: Team[] }) {
  const [currentTeam, setCurrentTeam] = useState("");

  return (
    <Paper elevation={3} className="w-100 h-100 p-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          console.log({
            email: formData.get("email"),
            password: formData.get("password"),
            teamId: formData.get("team"),
          });
        }}
      >
        <FormGroup className="gap-5">
          <Typography variant="h4" className="text-center">
            Create new user
          </Typography>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" name="email" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password" type="password" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="team">Team</InputLabel>
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
          <FormControl>
            <Button variant="contained" type="submit">
              Create User
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </Paper>
  );
}

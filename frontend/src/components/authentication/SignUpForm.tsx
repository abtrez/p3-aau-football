"use client";

import { authClient } from "@/lib/auth/auth-client";
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

export function SignUpForm({ teams }: { teams: Team[] }) {
  const [currentTeam, setCurrentTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  return (
    <Paper elevation={3} className="w-95 h-110 p-10">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setErrorMessage("");
          setUserCreated(false);

          const formValues = event.currentTarget;
          const formData = new FormData(event.currentTarget);

          const email = formData.get("email")?.toString();
          const password = formData.get("password")?.toString();
          const team = formData.get("team")?.toString();

          if (!email || !password || !team) {
            throw new Error("No correct values");
          }

          const response = await authClient.signUp.email({
            name: email,
            email: email,
            password: password,
            team: team,
          });

          if (response.error) {
            if (response.error.message) {
              setErrorMessage(response.error.message);
            } else {
              setErrorMessage("Error creating user");
            }
          } else {
            setUserCreated(true);
            formValues.reset();
            setCurrentTeam("");
          }

          setLoading(false);
        }}
      >
        <FormGroup className="gap-5">
          <Typography variant="h4" className="text-center">
            Create new user
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
            hidden={userCreated == false}
          >
            User created
          </Alert>
          <FormControl required>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" name="email" type="email" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password" type="password" />
          </FormControl>
          <FormControl required>
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
            <Button variant="contained" type="submit" loading={loading}>
              Create User
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </Paper>
  );
}

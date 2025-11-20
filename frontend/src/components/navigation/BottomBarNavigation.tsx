"use client";

import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Link from "next/link";

export default function BottomBarNavigation() {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          href="/"
          label="Matches"
          icon={<CalendarTodayIcon />}
        ></BottomNavigationAction>

        <BottomNavigationAction
          component={Link}
          href="/competitions"
          label="Competitions"
          icon={<EmojiEventsOutlinedIcon />}
        ></BottomNavigationAction>

        <BottomNavigationAction
          component={Link}
          href="/teams"
          label="Teams"
          icon={<GroupsOutlinedIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          component={Link}
          href="/teams/cssc"
          label="My team"
          icon={<StarBorderOutlinedIcon />}
        ></BottomNavigationAction>
      </BottomNavigation>
    </Paper>
  );
}

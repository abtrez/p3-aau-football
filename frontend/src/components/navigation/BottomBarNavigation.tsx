import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

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
          label="Matches"
          icon={<CalendarTodayIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Competitions"
          icon={<EmojiEventsOutlinedIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Teams"
          icon={<GroupsOutlinedIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="My team"
          icon={<StarBorderOutlinedIcon />}
        ></BottomNavigationAction>
      </BottomNavigation>
    </Paper>
  );
}

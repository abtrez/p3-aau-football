"use client";

import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import Link from "next/link";
import { auth } from "@/lib/auth/auth";
type SessionType = Awaited<ReturnType<typeof auth.api.getSession>>;
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

interface BottomBarNavigationProps {
  session: SessionType | null;
}

export default function BottomBarNavigation({
  session,
}: BottomBarNavigationProps) {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const isLoggedIn = !!session?.user;

  async function handleLogout() {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  }
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

        {isLoggedIn ? (
          <BottomNavigationAction
            label="Logout"
            onClick={handleLogout}
            icon={<LogoutIcon />}
          />
        ) : (
          <BottomNavigationAction
            component={Link}
            href="/sign-in"
            label="Log in"
            icon={<LoginIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}

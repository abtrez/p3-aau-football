import Link from "next/link";
import { Fab } from "@mui/material";
import type { ElementType } from "react";

interface FloatingActionButtonProps {
  icon: ElementType;
  link: string;
}

export default function FloatingActionButton({
  icon: Icon,
  link,
}: FloatingActionButtonProps) {
  return (
    <Link href={link}>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 75,
          right: 16,
        }}
      >
        <Icon />
      </Fab>
    </Link>
  );
}

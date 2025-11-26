import { z } from "zod";

export const positionGroupEnum = z.enum(["DEF", "MID", "FOW"]);

export const positionEnum = z.enum([
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "LM",
  "ST",
  "CF",
  "LW",
  "RW",
  "LA",
  "RA",
]);

export const addPlayerToTeamSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  teamId: z.string(),
  role: z.literal("PLAYER"),
  positionGroup: positionGroupEnum,
  position: positionEnum,
  shirtNumber: z.int(),
});

export type AddPlayerToTeam = z.infer<typeof addPlayerToTeamSchema>;

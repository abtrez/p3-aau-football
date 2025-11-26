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
  "RM",
  "LW",
  "RW",
  "LA",
  "RA",
  "CF",
  "ST",
]);

export const addPlayerToTeamSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  teamId: z.string(),
  role: z.literal("PLAYER"),
  positionGroup: positionGroupEnum,
  position: z.preprocess(
    (value) => (value === "" || value == null ? null : value),
    positionEnum.nullable(),
  ),
  shirtNumber: z.preprocess(
    (value) => (value === "" || value == null ? null : Number(value)),
    z.number().int().nullable(),
  ),
});

export type AddPlayerToTeam = z.infer<typeof addPlayerToTeamSchema>;

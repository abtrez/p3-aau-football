import { z } from "zod";

export const playerRoleSchema = z.object({
    type: z.literal("PLAYER"),
    shirtNumber: z.number().int().nonnegative(),
    positionGroup: z.enum(["DEF", "MID", "FOW"]),
    position: z.enum(["CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM",
        "LM", "ST", "CF", "LW", "RW", "LA", "RA"])
});

export const roleSchema = z.discriminatedUnion("type", [
    playerRoleSchema
]);

export type Role = z.infer<typeof roleSchema>;
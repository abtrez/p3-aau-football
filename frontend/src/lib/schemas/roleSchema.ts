import { z } from "zod";

export const playerRoleSchema = z.object({
    type: z.literal("PLAYER"),
    name: z.string(),
    shirtNumber: z.number().int().nonnegative(),
    positionGroup: z.enum(["DEF", "MID", "FOW"]),
    position: z.enum(["CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM",
        "LM", "ST", "CF", "LW", "RW", "LA", "RA"])
});

export const leaderRoleSchema = z.object ({
    type: z.literal("LEADER"),
    name: z.string()
})

export const coachRoleSchema = z.object ({
    type: z.literal("COACH"),
    name: z.string(),
    isAssistant: z.boolean().nullable().optional()
})

export const roleSchema = z.discriminatedUnion("type", [
    playerRoleSchema,
    leaderRoleSchema,
    coachRoleSchema
]);

export type Role = z.infer<typeof roleSchema>;
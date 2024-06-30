import { z } from "zod";

export const userSchema = z.object({
  photoURL: z.string({
    required_error: "Photo is required",
  }),
  displayName: z
    .string({
      required_error: "Display name is required",
    })
    .min(1, { message: "Display name is required" }),
  phoneNumber: z.string().nullable(),
  email: z.string({
    required_error: "Email is required",
  }),
});

export type UserSchema = z.infer<typeof userSchema>;

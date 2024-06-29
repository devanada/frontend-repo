import { z } from "zod";

export interface IUser {
  photoURL: string;
  displayName: string;
  phoneNumber: string | null;
  email: string;
}

export const userSchema = z.object({
  photoURL: z.string({
    required_error: "Photo is required",
  }),
  displayName: z
    .string({
      required_error: "Display name is required",
    })
    .min(1, { message: "Display name is required" }),
  phoneNumber: z.string({
    required_error: "Phone number is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
});

export type UserSchema = z.infer<typeof userSchema>;

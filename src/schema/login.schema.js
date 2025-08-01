import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z.string(),
});

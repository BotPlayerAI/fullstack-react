import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: "First name must be at least 3 characters.",
    })
    .max(100, {
      message: "First name cannot be more than 100 characters",
    }),
  LastName: z
    .string()
    .max(100, {
      message: "Last name cannot be more than 100 characters",
    })
    .optional(),
  email: z.string().email(),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
  }),
});

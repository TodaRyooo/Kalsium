import { z } from "zod";

export const SignUpScheme = z.object({
  username: z.email({ message: "You must enter it in your email address format." }),
  password: z
    .string()
    .min(8, {
      message: "More than 8 characters are required.",
    })
    .refine((val) => !/[\s ]/.test(val), {
      message: "Spaces are not allowed.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: "Uppercase, lowercase, and numbers are required.",
    }),
});

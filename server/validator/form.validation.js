import z from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(5, { message: "User Name must have atleast 5 charecter" })
    .max(15, { message: "User Name can't have more than 15 charecters" }),
  password: z
    .string()
    .min(6, { message: "Password must have atleast 6 charecter" })
    .max(10, { message: "Password can't have more than 10 charecters" }),
});

export const signupSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must have atleast 3 charecters" })
    .max(20, { message: "Name can't have more than 20 charecters" }),
  email: z.string().trim().email({ message: "Please enter a valid email" }),
});

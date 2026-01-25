import * as z from "zod";

export const FormSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }).describe("Email"),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters long",
    }).describe("Password"),
})
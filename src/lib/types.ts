import * as z from "zod";

export const FormSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }).describe("Email"),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters long",
    }).describe("Password"),
})

export const SignUpFormSchema = z.object({
    email: z.string().email({
        message: "Invalid Email",
    }).describe("Email"),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters long",
    }).describe("Password"),
    confirmPassword: z.string().min(5, {
        message: "Confirm Password must be at least 5 characters long",
    }).describe("Confirm Password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
})
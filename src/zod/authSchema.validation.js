import { passwordRegex } from "../utils/commonRegex";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(2, { message: "Password is required" })
});

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, { message: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(passwordRegex, {
        message:
          "Minimum 6 characters with a combination of capital letters, small letters, numbers, and special characters"
      }),
    confirmPassword: z.string({
      required_error: "Confirm password is required"
    }),
    phoneNumber: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match"
      });
    }
  });

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
});

const setNewPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "New password must be at least 6 characters long" })
      .regex(passwordRegex, {
        message:
          "Minimum 6 characters with a combination of capital letters, small letters, numbers, and special characters"
      }),

    confirmPassword: z.string({
      required_error: "Confirm password is required"
    })
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match"
      });
    }
  });

const resetPasswordSchema = z
  .object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "New password must be at least 6 characters long" })
      .regex(passwordRegex, {
        message:
          "Minimum 6 characters with a combination of capital letters, small letters, numbers, and special characters"
      }),

    confirmPassword: z.string({
      required_error: "Confirm password is required"
    })
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match"
      });
    }
  });

export const authValidationSchema = {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  setNewPasswordSchema,
  resetPasswordSchema
};

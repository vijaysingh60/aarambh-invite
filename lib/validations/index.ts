import { z } from "zod";

export const RSVPFormSchema = z.object({
  name: z.string().min(1, "Name is required").optional().or(z.literal("")),
  rollNumber: z.string().min(3, "Roll number is required"),
  batch: z.string().optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number").optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  status: z.enum(["ATTENDING", "NOT_ATTENDING"]),
  notes: z.string().optional(),
});

export const ContributionFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rollNumber: z.string().optional(),
  amount: z.number().positive("Amount must be positive").optional(),
  transactionId: z.string().min(1, "Transaction ID is required"),
  paymentDate: z.string().min(1, "Payment date is required"),
});

export const StudentImportSchema = z.object({
  name: z.string().min(2),
  rollNumber: z.string().min(3),
  batch: z.string().min(4),
  background: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  mobile: z.string().optional(),
});

export const EventSettingsSchema = z.object({
  eventName: z.string().min(1),
  university: z.string().min(1),
  date: z.string().min(1),
  day: z.string().min(1),
  time: z.string().min(1),
  venue: z.string().min(1),
  description: z.string().optional(),
  contributionReceiver: z.string().min(1),
  contributionBatch: z.string().min(1),
  contributionPhone: z.string().min(1),
  contributionRequired: z.boolean(),
  scisConnectUrl: z.string().optional(),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RSVPFormData = z.infer<typeof RSVPFormSchema>;
export type ContributionFormData = z.infer<typeof ContributionFormSchema>;
export type StudentImportData = z.infer<typeof StudentImportSchema>;
export type EventSettingsData = z.infer<typeof EventSettingsSchema>;
export type AdminLoginData = z.infer<typeof AdminLoginSchema>;

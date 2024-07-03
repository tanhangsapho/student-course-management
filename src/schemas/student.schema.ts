import mongoose from "mongoose";
import { z } from "zod";

export const StudentSchema = z.object({
  fullName: z.object({
    en: z
      .string()
      .min(5, { message: "English name must be at least 5 characters" })
      .max(30),
    km: z
      .string()
      .min(5, { message: "Khmer name must be at least 5 characters" })
      .max(30),
  }),
  DOB: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: "Invalid date format (DD-MM-YYYY)",
    })
    .refine(
      (dateStr) => {
        const parts = dateStr.split("-");
        if (parts.length !== 3) return false;
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
        // Check if month is within valid range (1 to 12)
        return (
          month >= 1 &&
          month <= 12 &&
          !isNaN(new Date(year, month - 1, day).getTime())
        );
      },
      {
        message: "Invalid date format (DD-MM-YYYY) or month out of range",
      }
    ),
  gender: z.enum(["Male", "Female", "Other"]),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must be numeric" })
    .min(8)
    .max(20),
  isDeleted: z.boolean().optional().default(false),
  courseEnrolled: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId format",
      })
    )
    .optional(),
});

export const StudentUpdateSchema = z.object({
  fullName: z.object({
    en: z.string().min(5).max(30).optional(),
    km: z.string().min(5).max(30).optional(),
  }),
  DOB: z.date().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  phoneNumber: z.string().min(8).max(20).optional(),
});

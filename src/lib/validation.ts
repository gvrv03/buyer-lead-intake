import { z } from "zod";

export const buyerSchema = z
  .object({
    fullName: z.string().min(2).max(80),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().regex(/^\d{10,15}$/),
    city: z.enum(["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"]),
    propertyType: z.enum(["Apartment", "Villa", "Plot", "Office", "Retail"]),
    bhk: z.enum(["Studio", "One", "Two", "Three", "Four"]).optional(),
    purpose: z.enum(["Buy", "Rent"]),
    budgetMin: z.number().int().positive().optional(),
    budgetMax: z.number().int().positive().optional(),
    timeline: z.enum(["0-3m", "3-6m", ">6m", "Exploring"]),
    source: z.enum(["Website", "Referral", "Walk_in", "Call", "Other"]),
    status: z
      .enum([
        "New",
        "Qualified",
        "Contacted",
        "Visited",
        "Negotiation",
        "Converted",
        "Dropped",
      ])
      .optional(),
    notes: z.string().max(1000).optional(),
    tags: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .transform((val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string")
          return val
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
        return [];
      }),
  })
  .refine(
    (data) => {
      if (data.budgetMin && data.budgetMax) {
        return data.budgetMax >= data.budgetMin;
      }
      return true;
    },
    { message: "budgetMax must be ≥ budgetMin" }
  )
  .refine(
    (data) => {
      if (["Apartment", "Villa"].includes(data.propertyType)) {
        return !!data.bhk;
      }
      return true;
    },
    { message: "BHK required for Apartment/Villa" }
  );

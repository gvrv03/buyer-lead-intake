// lib/validators/buyer.ts
import { z } from 'zod';

// enums that match Prisma enums (strings used by API)
export const City = z.enum(["CHANDIGARH","MOHALI","ZIRAKPUR","PANCHKULA","OTHER"]);
export const PropertyType = z.enum(["APARTMENT","VILLA","PLOT","OFFICE","RETAIL"]);
export const BHK = z.enum(["BHK_1","BHK_2","BHK_3","BHK_4","STUDIO"]);
export const Purpose = z.enum(["BUY","RENT"]);
export const Timeline = z.enum(["ZERO_TO_3M","THREE_TO_6M","GREATER_6M","EXPLORING"]);
export const Source = z.enum(["WEBSITE","REFERRAL","WALK_IN","CALL","OTHER"]);
export const Status = z.enum(["NEW","QUALIFIED","CONTACTED","VISITED","NEGOTIATION","CONVERTED","DROPPED"]);

export const BuyerBase = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional().or(z.literal("")).transform(v => v === "" ? undefined : v),
  phone: z.string().regex(/^\d{10,15}$/, "phone must be numeric 10-15 digits"),
  city: City,
  propertyType: PropertyType,
  bhk: BHK.optional(),
  purpose: Purpose,
  budgetMin: z.number().int().nonnegative().optional().nullable(),
  budgetMax: z.number().int().nonnegative().optional().nullable(),
  timeline: Timeline,
  source: Source,
  notes: z.string().max(1000).optional().nullable(),
  tags: z.array(z.string()).optional(),
  status: Status.optional()
});

// refine: bhk required iff propertyType is APARTMENT or VILLA
export const BuyerCreate = BuyerBase.superRefine((data, ctx) => {
  if ((data.propertyType === "APARTMENT" || data.propertyType === "VILLA") && !data.bhk) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['bhk'],
      message: "bhk is required for Apartment/Villa"
    });
  }
  // budgetMax >= budgetMin
  if (typeof data.budgetMin === "number" && typeof data.budgetMax === "number") {
    if (data.budgetMax < data.budgetMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['budgetMax'],
        message: "budgetMax must be >= budgetMin",
      });
    }
  }
});

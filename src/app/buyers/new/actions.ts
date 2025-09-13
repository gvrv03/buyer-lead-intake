"use server";

import { buyerSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

type CreateBuyerResult = { buyer: any } | { error: string };

export async function createBuyer(
  data: unknown,
  demoUserId: any
): Promise<CreateBuyerResult> {
  const parsed = buyerSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Validation failed" };
  }
console.log(demoUserId);

  const buyer = parsed.data;

  // DEMO: Hardcoded ownerId (replace with real user ID when auth is ready)
 

  try {
    // Convert tags string -> string[]
    const tagsArray =
      typeof buyer.tags === "string"
        ? buyer.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
        : Array.isArray(buyer.tags)
        ? buyer.tags
        : [];

    const newBuyer = await prisma.buyer.create({
      data: {
        fullName: buyer.fullName,
        email: buyer.email || null,
        phone: buyer.phone,
        city: buyer.city,
        propertyType: buyer.propertyType,
        bhk: buyer.bhk || null,
        purpose: buyer.purpose,
        budgetMin: buyer.budgetMin || null,
        budgetMax: buyer.budgetMax || null,
        timeline: buyer.timeline,
        source: buyer.source,
        status: buyer.status || "New",
        notes: buyer.notes || null,
        tags: tagsArray,
        ownerId: demoUserId,
      },
    });

    // Create history entry
    await prisma.buyerHistory.create({
      data: {
        buyerId: newBuyer.id,
        changedBy: demoUserId,
        diff: { created: newBuyer },
      },
    });

    return { buyer: newBuyer };
  } catch (e: any) {
    console.error(e.message);
    return { error: "Database error" };
  }
}

export const deleteBuyer = async (buyerId: string) => {
  try {
    const { error } = await supabase.from("Buyer").delete().eq("id", buyerId);

    if (error) {
      console.error("Error deleting buyer:", error.message);
      throw new Error(error.message);
    }

    // Revalidate buyers list page after delete
    revalidatePath("/buyers");

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export async function updateBuyer(id: string, data: unknown) {
  const parsed = buyerSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Validation failed" };
  }

  try {
    const updatedBuyer = await prisma.buyer.update({
      where: { id },
      data: parsed.data,
    });

    return { buyer: updatedBuyer };
  } catch (e) {
    console.error(e);
    return { error: "Database error" };
  }
}

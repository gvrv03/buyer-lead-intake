"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { createBuyer, updateBuyer } from "@/app/buyers/new/actions";
import { useAuth } from "@/context/AuthContext";

export type BuyerFormType = z.infer<typeof buyerSchema>;

interface BuyerFormProps {
  buyerId?: string;
  initialData?: Partial<BuyerFormType>;
}

export default function CreateEditForm({ buyerId, initialData }: BuyerFormProps) {
  const router = useRouter();
  const isEditing = Boolean(buyerId);
  const [isLoading, setIsLoading] = useState(false);
const {user }= useAuth() 
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<BuyerFormType>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      propertyType: "",
      bhk: "",
      purpose: "",
      budgetMin: 0,
      budgetMax: 0,
      timeline: "",
      source: "",
      notes: "",
      tags: "",
      status: "New",
    },
  });

  // Reset form when editing with data
  useEffect(() => {
    setTimeout(() => {
        if (initialData) {
            reset({
              ...initialData,
              tags: Array.isArray(initialData.tags)
                ? initialData.tags.join(", ")
                : initialData.tags ?? "",
            });
          } 
    }, 500);
  }, [initialData, reset]);

  const propertyType = watch("propertyType");

  const onSubmit = async (data: BuyerFormType) => {
    try {
      setIsLoading(true);

      const payload = {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags.join(",") : data.tags || "",
      };

      const res = isEditing
        ? await updateBuyer(buyerId!, payload)
        : await createBuyer(payload,user?.id);

      if ("error" in res && res.error) {
        toast.error(res.error);
      } else {
        toast.success(
          isEditing ? "Buyer updated successfully." : "Buyer created successfully."
        );
        router.push("/buyers");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/buyers">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Buyers
          </Button>
        </Link>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Essential contact details and lead info</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <FormField label="Full Name *" error={errors.fullName?.message}>
            <Input {...register("fullName")} placeholder="Enter full name" />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <Input type="email" {...register("email")} placeholder="buyer@example.com" />
          </FormField>

          <FormField label="Phone *" error={errors.phone?.message}>
            <Input type="tel" {...register("phone")} placeholder="(555) 123-4567" />
          </FormField>

          {/* City */}
          <ControlledSelect
            control={control}
            name="city"
            label="City *"
            error={errors.city?.message}
            options={["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"]}
          />

          <FormField label="Min Budget *" error={errors.budgetMin?.message}>
            <Input type="number" {...register("budgetMin", { valueAsNumber: true })} />
          </FormField>

          <FormField label="Max Budget" error={errors.budgetMax?.message}>
            <Input type="number" {...register("budgetMax", { valueAsNumber: true })} />
          </FormField>

          <ControlledSelect
            control={control}
            name="propertyType"
            label="Property Type *"
            error={errors.propertyType?.message}
            options={["Apartment", "Villa", "Plot", "Office", "Retail"]}
          />

          {(propertyType === "Apartment" || propertyType === "Villa") && (
            <ControlledSelect
              control={control}
              name="bhk"
              label="BHK *"
              error={errors.bhk?.message}
              options={["Studio", "One", "Two", "Three", "Four"]}
            />
          )}

          <ControlledSelect
            control={control}
            name="purpose"
            label="Purpose *"
            error={errors.purpose?.message}
            options={["Buy", "Rent"]}
          />

          <ControlledSelect
            control={control}
            name="timeline"
            label="Timeline *"
            error={errors.timeline?.message}
            options={["0-3m", "3-6m", ">6m", "Exploring"]}
          />

          <ControlledSelect
            control={control}
            name="source"
            label="Source *"
            error={errors.source?.message}
            options={["Website", "Referral", "Walk_in", "Call", "Other"]}
          />
        </CardContent>
      </Card>

      {/* Notes & Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
          <CardDescription>Any extra information about the buyer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Notes">
            <Textarea {...register("notes")} rows={4} placeholder="Enter notes..." />
          </FormField>

          <FormField label="Tags (comma separated)">
            <Input {...register("tags")} placeholder="hot, urgent" />
          </FormField>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Link href="/buyers">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Buyer" : "Create Buyer"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/** 🔹 Form Field Wrapper */
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

/** 🔹 Controlled Select Wrapper */
function ControlledSelect({
  control,
  name,
  label,
  error,
  options,
}: {
  control: any;
  name: string;
  label: string;
  error?: string;
  options: string[];
}) {
  return (
    <FormField label={label} error={error}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value || ""}
            onValueChange={field.onChange}
            defaultValue={field.value || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormField>
  );
}

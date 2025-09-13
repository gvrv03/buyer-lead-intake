"use client";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useTransition, useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Buyer } from "@/app/buyers/page";
import { deleteBuyer } from "@/app/buyers/new/actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface CardMenuBtnProps {
  buyerData: Buyer;
}

const CardMenuBtn: React.FC<CardMenuBtnProps> = ({ buyerData }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteBuyer(buyerData?.id);

      if (res.success) {
        router.refresh(); // refresh buyers list after delete
      } else {
        alert("Failed to delete: " + res.message);
      }
    });
  };

  return (
    <div className="flex gap-2 p-3">
      {/* View button */}
      <Link
        className="w-full flex py-2 font-semibold items-center gap-2 text-xs bg-gray-50 justify-center border rounded-md"
        href={`/buyers/${buyerData?.id}`}
      >
        <Eye className="w-4 h-4" /> View
      </Link>

      {/* Edit button - only for owner */}
      {user?.id === buyerData?.ownerId && (
        <Link
          className="w-full flex py-2 font-semibold items-center gap-2 text-xs bg-gray-50 justify-center border rounded-md"
          href={`/buyers/${buyerData?.id}/edit`}
        >
          <Edit className="w-4 h-4" /> Edit
        </Link>
      )}

      {/* Delete button - only for owner */}
      {user?.id === buyerData?.ownerId && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-fit p-2 text-red-600 flex items-center justify-center gap-1"
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Buyer</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{buyerData?.fullName}</span>?  
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default CardMenuBtn;

"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Buyer } from "@/app/buyers/page";
import Link from "next/link";
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
import { Edit, Trash2 } from "lucide-react";

interface UserActionProps {
  buyerData: Buyer;
}

const UserAction: React.FC<UserActionProps> = ({ buyerData }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteBuyer(buyerData?.id);

      if (res.success) {
        router.push("/buyers"); // redirect after delete
      } else {
        alert("Failed to delete: " + res.message);
      }
    });
  };

  return (
    <div className="flex justify-between items-center">
      {/* Back Button */}
      <Link href="/buyers">
        <Button variant="outline">← Back to Buyers</Button>
      </Link>

      {/* Owner-only actions */}
      {user?.id === buyerData?.ownerId && (
        <div className="space-x-2 flex">
          {/* Edit Button */}
          <Button 
          onClick={()=>{
            router.push(`/buyers/${buyerData?.id}/edit`)
          }}
          variant="outline" >
            <Edit className="w-4 cursor-pointer h-4" />
            Edit</Button>

          {/* Delete Button with AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
               className="cursor-pointer"
                variant="destructive"
                disabled={isPending}
              >
                <Trash2 className="w-4 h-4" />
                {isPending ? "Deleting..." : "Delete"}
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
        </div>
      )}
    </div>
  );
};

export default UserAction;

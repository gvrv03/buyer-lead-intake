import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Users,
  Plus,
  Loader2,
} from "lucide-react";
import CardMenuBtn from "@/components/CardMenuBtn";
import Link from "next/link";
import BuyersCard from "@/components/BuyersCard";
import AllBuyersHeader from "@/components/AllBuyersHeader";

export interface Buyer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  propertyType: string;
  bhk?: string;
  purpose?: string;
  budgetMin: number;
  budgetMax: number;
  timeline?: string;
  source?: string;
  status: string;
  notes?: string;
  tags?: string[];
  preApproved?: boolean;
}

// Fetch all buyers without any filters
async function fetchBuyers() {
  const { data, error } = await supabase.from("Buyer").select("*");
  if (error) throw error;
  return data as Buyer[];
}

export default async function BuyersPage() {
  const buyers = await fetchBuyers();

  return (
    <div className=" space-y-8">
    

      {/* Header */}
      <AllBuyersHeader Buyers={buyers} />

      {/* Buyers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {buyers.map((buyer, index) => (
          <BuyersCard buyer={buyer} key={index} />
        ))}
      </div>

      {buyers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-gray-900">
            No buyers found
          </h3>
          <p className="text-gray-500">
            Add new buyers to start tracking leads.
          </p>
        </div>
      )}
    </div>
  );
}
export const dynamic = "force-dynamic"; // SSR
export const revalidate = 0;

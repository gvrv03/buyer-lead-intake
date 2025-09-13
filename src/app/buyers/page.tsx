import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import Link from "next/link";
import CardMenuBtn from "@/components/CardMenuBtn";

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
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className=" space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buyer Leads 
          <span className="text-gray-500 text-xs ml-2">({buyers.length} buyers)</span>

          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your buyer leads efficiently
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
       
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" /> Import CSV
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Link href="/buyers/new" className="flex shadow-md bg-blue-700  text-white  px-3 py-1 rounded-md items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </Link>
        </div>
      </div>

      {/* Buyers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {buyers.map((buyer) => (
          <Card
            key={buyer.id}
            className="border border-gray-200  rounded-xl bg-white shadow-sm hover:shadow-md transition hover:scale-[1.01]"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {buyer.fullName}
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-1 mt-1 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-400" /> {buyer.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400" /> {buyer.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" /> {buyer.city}
                    </span>
                  </CardDescription>
                </div>
                <Badge
                  className={`px-3 py-1 text-xs font-medium ${getStatusColor(
                    buyer.status
                  )}`}
                >
                  {buyer.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 text-gray-700 text-sm">
              <div>
                <span className="font-medium">Property:</span>{" "}
                {buyer.propertyType} {buyer.bhk && `- ${buyer.bhk} BHK`}
              </div>
              <div>
                <span className="font-medium">Purpose:</span> {buyer.purpose}
              </div>
              <div>
                <span className="font-medium">Budget:</span>{" "}
                <span className="text-green-600 font-semibold">
                  ₹ {buyer.budgetMin} - ₹ {buyer.budgetMax}
                </span>
              </div>
              <div>
                <span className="font-medium">Timeline:</span> {buyer.timeline}
              </div>
              <div>
                <span className="font-medium">Source:</span> {buyer.source}
              </div>
              {buyer.tags && buyer.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {buyer.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-2 py-1 rounded-sm  bg-gray-100 text-gray-800 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
            </CardContent>
            {/* Actions */}
            <CardMenuBtn buyerData={buyer} />
          </Card>
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

import React from "react";
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
import CardMenuBtn from "@/components/CardMenuBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Buyer } from "@/app/buyers/page";
const BuyersCard = ({ buyer }: Buyer) => {
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
          <span className="font-medium">Property:</span> {buyer.propertyType}{" "}
          {buyer.bhk && `- ${buyer.bhk} BHK`}
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
  );
};

export default BuyersCard;

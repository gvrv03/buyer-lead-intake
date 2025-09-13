// app/buyers/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import {  Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Home, DollarSign, Clock, IndianRupee } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserAction from "@/components/UserAction";

interface Buyer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  propertyType: string;
  bhk?: string;
  purpose?: string;
  budgetMin?: number;
  budgetMax?: number;
  timeline?: string;
  source?: string;
  status?: string;
  notes?: string;
  preApproved?: boolean;
}

export const dynamic = "force-dynamic"; // SSR

async function fetchBuyer(id: string): Promise<Buyer | null> {
  const { data, error } = await supabase.from("Buyer").select("*").eq("id", id).single();
  if (error) {
    console.error(error);
    return null;
  }
  return data as Buyer;
}


interface BuyerPageProps {
    params: { id: string };
  }
  
  export default async function BuyerPage({ params }: BuyerPageProps) {
    const buyer = await fetchBuyer(params.id);
  
    if (!buyer) return <div className="p-10 text-center text-gray-700">Buyer not found</div>;
  
    return (
      <div className="space-y-6">
        {/* Header */}
        <UserAction buyerData={buyer as any} />

        <h1 className="text-2xl font-bold">{buyer.fullName}</h1>
        <p className="text-sm text-gray-500">Buyer ID: {buyer.id}</p>
        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left: Buyer Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{buyer?.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{buyer?.phone || "-"}</span>
                </div>
              </CardContent>
            </Card>
  
            {/* Property Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Property Preferences</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2" >
                {buyer?.tags?.map((item:string,index:number)=>{
                    return(
                        <Badge className="bg-gray-100 px-2 rounded-md border text-black " key={index} >{item} </Badge>
                    )
                })}
              </CardContent>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  <span> {buyer?.budgetMin?.toLocaleString()} -  {buyer?.budgetMax?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{buyer?.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{buyer?.propertyType}</span> - {buyer?.bhk || "-"} BHK
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{buyer?.timeline}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{buyer?.purpose}</span>
                </div>
                
              </CardContent>
            </Card>
  
            {/* Notes */}
            {buyer?.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{buyer?.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
  
          {/* Right: Lead Status + Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lead Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Status</span>
                  <Badge>{buyer?.status || "New"}</Badge>
                </div>
              
                <div className="flex justify-between">
                  <span>Lead Source</span>
                  <span>{buyer?.source}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">Call Buyer</Button>
                <Button className="w-full">Send Email</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
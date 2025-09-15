"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Download, Plus, Upload } from "lucide-react";
import Link from "next/link";
import { Buyer } from "@/app/buyers/page";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

const AllBuyersHeader = ({ Buyers }: Buyer) => {
  const [loading, setloading] = useState(false);
  const exportToCSV = () => {
    // Convert JSON to worksheet
    setloading(true);
    try {
      const worksheet = XLSX.utils.json_to_sheet(Buyers);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Append worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Write workbook as binary
      const excelBuffer = XLSX.write(workbook, {
        bookType: "csv",
        type: "array",
      });

      // Save as file
      const blob = new Blob([excelBuffer], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");

      return toast.success("Downloaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Buyer Leads
          <span className="text-gray-500 text-xs ml-2">
            ({Buyers.length} buyers)
          </span>
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and track your buyer leads efficiently
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="w-4 h-4" /> Import CSV
        </Button>
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />{" "}
          {loading ? "Downloading..." : "Export CSV"}
        </Button>
        <Link
          href="/buyers/new"
          className="flex shadow-md bg-blue-700  text-white  px-3 py-1 rounded-md items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add
        </Link>
      </div>
    </div>
  );
};

export default AllBuyersHeader;

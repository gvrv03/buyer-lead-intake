"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Users, UserPlus, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* ----------------- Extracted UserPopover ----------------- */
function UserPopover({ user, signOut }: { user: any; signOut: () => void }) {
  const userInitial = user?.email?.[0]?.toUpperCase() || "U";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold cursor-pointer">
          {userInitial}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 mr-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {userInitial}
            </div>
            <div>
              <p className="text-sm font-medium">
                {user.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={signOut}
            variant="destructive"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ----------------- Navbar ----------------- */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white sticky top-0 z-50 border-b shadow-sm">
      <div className="container mx-auto px-5">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">BuyerLead Pro</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/buyers"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <Users className="w-4 h-4" /> Buyers
            </Link>
            <Link
              href="/buyers/new"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <UserPlus className="w-4 h-4" /> Add Buyer
            </Link>

            {!user ? (
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            ) : (
              <UserPopover user={user} signOut={signOut} />
            )}
          </div>

          {/* Mobile Menu Button + User Popover */}
          <div className="md:hidden flex items-center gap-3">
            {user && <UserPopover user={user} signOut={signOut} />}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay + Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <Link
              href="/buyers"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <Users className="w-4 h-4" /> Buyers
            </Link>
            <Link
              href="/buyers/new"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="w-4 h-4" /> Add Buyer
            </Link>
            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// app/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingPage from "./loading";

export default function DashboardPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, signOut, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !authLoading) router.push("/login"); // redirect if not logged in
  }, [user, router]);

  if (authLoading) return <LoadingPage/>

  return (
    <main className="mx-auto container  p-5" >
      {/* <h1>Welcome, {user?.email}</h1>
      <p>User ID: {user?.id}</p>
      <button onClick={signOut}>Sign Out</button> */}
      {children}
    </main>
  );
}

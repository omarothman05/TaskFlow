"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) return null;

  if (token) {
    return (
      <div className="flex flex-col justify-center items-center mt-40 px-10">
        <h1 className="text-5xl mb-3">
          Welcome 👋
        </h1>
         <Link href={"/dashboard"} className="border p-3 rounded-lg bg-[#F5E973] border-0 text-l px-5 cursor-pointer duration-200 hover:-translate-y-1 mt-5">Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-40 px-10">
    <h1 className="text-5xl mb-3 ">Organize your tasks with TaskFlow</h1>
    <p className="text-lg">Stay organized. Get things done.</p>
    <div className="flex gap-5 mt-5 mb-5">
      <Link href={"/register"} className="border p-3 rounded-lg bg-[#F5E973] border-0 text-l px-5 cursor-pointer duration-200 hover:-translate-y-1">Get Started</Link>
      <Link href={"/login"} className="border p-3 rounded-lg bg-[#5C596C] text-white border-0 text-l px-5 cursor-pointer duration-200 hover:-translate-y-1">Login</Link>
    </div>
    
  </div>
  );
}
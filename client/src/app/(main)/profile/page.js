"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = jwtDecode(token);
    setUser(decoded);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) {
      return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center">

          <div className="w-20 h-20 rounded-full bg-[#F5E933] flex items-center justify-center text-2xl font-bold mb-3">
            👤
          </div>

          <h1 className="text-2xl font-semibold">
            Profile
          </h1>

          <p className="text-sm text-gray-500">
            Account information
          </p>

        </div>

        {/* Info */}
        <div className="mt-6 space-y-4">

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-gray-800">
              {user.email}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">User ID</p>
            <p className="font-mono text-sm text-gray-700">
              {user.id}
            </p>
          </div>

        </div>

        {/* Actions */}
        <button
          onClick={logout}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
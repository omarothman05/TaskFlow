"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";

export default function Navbar() {
  const [token, setToken] = useState(null);
  


const [user, setUser] = useState(null);
const [open, setOpen] = useState(false);
const menuRef = useRef(null);


useEffect(() => {
  const token = localStorage.getItem("token");

  setToken(token);

  if (token) {
    const decoded = jwtDecode(token);
    setUser(decoded);
  }
}, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <header>
      <div className="flex justify-between p-5 bg-[#F5E933] text-black">
        <h1 className="text-xl px-3">TaskFlow</h1>

        <nav className="flex gap-5 text-lg px-5">
          
          {!token ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <div className="relative" ref={menuRef}>

  <button
    onClick={() => setOpen(!open)}
    className="cursor-pointer"
  >
    Profile
  </button>

  <div
    className={`absolute right-0 mt-2 w-75 bg-white rounded-lg shadow-xl
    transform transition-all duration-200 origin-top
    ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  `}
  >

    {/* User Info */}
    <div className="flex items-center gap-3 p-4">

      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        👤
      </div>

      <div>
        <p className="text-sm text-gray-700">
          {user?.email}
        </p>
      </div>

    </div>

    <Link
      href="/profile"
      onClick={() => setOpen(false)}
      className="block px-4 py-3 hover:bg-gray-100"
    >
      Account
    </Link>

    <button
      onClick={() => {
        setOpen(false);
        localStorage.removeItem("token");
        window.location.href = "/";
      }}
      className="w-full cursor-pointer text-left px-4 py-3 hover:bg-gray-100 text-red-500"
    >
      Logout
    </button>

  </div>

</div>
              
            </>
          )}

        </nav>
      </div>
    </header>
  );
}
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AdminLogin() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.message) {
        router.push("/admin")
        localStorage.setItem("token", data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin-portal");
    } 
  },[router])
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="min-w-80 border border-gray-500 px-4 py-4 rounded-md">
        <h1 className="text-3xl font-semibold">Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              type="text"
              className="border border-gray-500 text-black rounded-md w-full px-2 py-1 outline-none"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-500 rounded-md text-black w-full px-2 py-1 outline-none"
            />
          </div>

          <button className="bg-blue-500 text-white px-4 py-1 rounded-md mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

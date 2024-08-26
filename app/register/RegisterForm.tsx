"use client";
import React, { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    const response = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess("User registered successfully");
    } else {
      setError(data.error || "An error occured");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your name"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium dark:text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="block bg-gray-50 border border-gray-300 dark:text-white text-sm rounded-lg dark:bg-gray-700 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-white text-sm font-medium mb-2">
          Password
        </label>
        <input
          className="w-full p-2.5 bg-gray-50 block border border-gray-300 dark:text-white text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placehoder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-5">{success}</p>}
      <div className="flex flex-col items-start mb-5">
        <button className="btn btn-xs mb-5" type="submit">
          Forgot password ?
        </button>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

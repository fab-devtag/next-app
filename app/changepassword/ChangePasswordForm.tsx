"use client";
import React, { useState } from "react";

interface Props {
  email: string;
}

const ChangePasswordForm = ({ email }: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    const response = await fetch("api/changepassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        oldPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess("Password changé");
    } else {
      console.log(data);
      setError(data.error || "An error occured");
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-white text-sm font-medium mb-2">
          Old password
        </label>
        <input
          className="w-full dark:text-white dark:border-gray-600 dark:bg-gray-700 rounded-lg text-sm border border-gray-300 text-gray-900 p-2.5"
          onChange={(e) => setOldPassword(e.target.value)}
          type="text"
          name="oldPassword"
          placeholder="Your old password"
        />
      </div>
      <div className="mb-5">
        <label className="block text-white text-sm font-medium mb-2">
          New password
        </label>
        <input
          className="w-full dark:border-gray-600 border-gray-300 dark:text-white dark:bg-gray-700 rounded-lg text-sm p-2.5 border border-gray text-gray-900"
          onChange={(e) => setNewPassword(e.target.value)}
          type="text"
          name="newPassword"
          placeholder="Your new password"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-5">{success}</p>}
      <button className="btn btn-primary" type="submit">
        Change password
      </button>
    </form>
  );
};

export default ChangePasswordForm;

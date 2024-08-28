"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/">Next.js</Link>
      <Link href="/users">Users</Link>
      <Link href="/products">Products</Link>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && (
        <div>
          <span className="mr-3">{session && session.user!.email}</span>
          <Link href="/api/auth/signout">Sign out</Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Sign In</Link>
      )}
      {status === "unauthenticated" && <Link href="/register">Sign up</Link>}
    </nav>
  );
};

export default NavBar;

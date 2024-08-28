import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import ChangePasswordPage from "./changepassword/page";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session); //si pas de nom alors email (match avant l'@)
  return (
    <main>
      <h1>
        Hello{" "}
        {session && (
          <span>
            {session.user!.name} {session.user?.email}
          </span>
        )}
      </h1>
      <Link href="/users">Users</Link>
      <ProductCard />
      <Link href="/changepassword">
        <button className="btn btn-primary mt-3">Change password</button>
      </Link>
    </main>
  );
}

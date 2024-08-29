import Image from "next/image";
import tft from "@/public/images/tfttop1.png";

import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import { Metadata } from "next";
import HeavyComponent from "./components/HeavyComponent";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session); //si pas de nom alors email (match avant l'@)
  return (
    <main className="relative h-screen">
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
      <Image src={tft} alt="tft top1 avant la descente aux enfers" />

      <HeavyComponent />
      {/*   <Image
        src="https://bit.ly/react-cover"
        fill
        className="object-cover"
        alt=""
        sizes="(max-width; 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={100}
        priority
      /> */}
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const product = await fetch("http://google.com");

  return {
    title: "product.title",
    description: "product.description",
  };
}

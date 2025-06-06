import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="container mx-auto">
        <Link href="/dashboard">Dashboard</Link>
      </main>
    </>
  );
}

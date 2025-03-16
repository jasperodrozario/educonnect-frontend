import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to EduConnect</h1>
      <p>Your AI-Powered Learning Platform</p>
      <Link href="/login">Login</Link>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-2 w-full max-w-md dark:bg-neutral-900">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form
          action="/login"
          method="post"
          className="flex flex-col border p-6 rounded-lg shadow-md"
        >
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="bg-gray-200 dark:bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <label htmlFor="password" className="mb-2 mt-4">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="bg-gray-200 dark:bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg my-6 w-full"
            onClick={() => router.back()}
          >
            Login
          </button>
          <h2 className="text-center font-semibold">Or</h2>
          <button
            type="button"
            className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg mt-6 mb-2 w-full"
            onClick={() => router.back()}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

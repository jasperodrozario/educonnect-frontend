"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DarkModeToggler } from "@/components/DarkModeToggler";

export function Navbar() {
  return (
    <div className="flex justify-between items-center h-15 py-3 border border-6">
      <div className="flex-none ml-[5rem]">
        <Link href="/">
          <div className="flex items-center">
            <img src="/" alt="" className="w-11 h-11 mr-3" />
            <p className="font-bold text-[22px]">brainwave</p>
          </div>
        </Link>
      </div>

      <div className="flex-none mx-[5rem] w-[30rem]">
        <form method="GET" action="{% url 'home' %}">
          <label className="flex items-center rounded gap-4 px-5 py-3 text-sm text-neutral-300 transition-transform duration-300 bg-[#52526D]">
            <input
              className="bg-transparent border-none outline-none"
              type="text"
              name="q"
              placeholder="Search for posts"
            />
          </label>
        </form>
      </div>

      <DarkModeToggler />

      <Button className="text-center text-wrap font-semibold">
        <Link href="/">Login</Link>
      </Button>
    </div>
  );
}

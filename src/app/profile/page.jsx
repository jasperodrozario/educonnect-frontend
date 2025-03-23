"use client";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div className="container max-w-full mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
        >
          <IconArrowLeft size={20} />
        </button>
        <img
          src="/avatars/mantaka.jpg"
          className="h-10 w-10 rounded-full flex items-center justify-center text-white"
        />
        <h1 className="text-2xl font-bold">Your Profile</h1>
      </div>

      <div className="bg-white h-100 dark:bg-neutral-900 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700 overflow-scroll">
        <ProfileForm />
      </div>
    </div>
  );
}

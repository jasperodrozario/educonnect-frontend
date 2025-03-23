"use client";
import { RoomForm } from "@/components/forms/RoomForm";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CreateRoomPage() {
  const router = useRouter();
  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-800"
        >
          <IconArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Create Room</h1>
      </div>
      <RoomForm />
    </div>
  );
}

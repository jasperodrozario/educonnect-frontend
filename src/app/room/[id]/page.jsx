"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MessageSection } from "@/components/chat/MessageSection";
import { ParticipantPanel } from "@/components/ui/ParticipantPanel";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Sample room data, later to be fetched from an API
const rooms = [
  {
    id: "1",
    name: "Introduction to React",
    description: "Learn the basics of React and build your first app.",
    topic: "React",
    host: "john_doe",
    participants: [
      {
        id: "1",
        name: "John Doe",
        avatar: "/avatars/mantaka.jpg",
        isHost: true,
      },
      { id: "2", name: "Alice Smith", avatar: "/avatars/mantaka.jpg" },
      { id: "3", name: "Bob Johnson", avatar: "/avatars/mantaka.jpg" },
      { id: "4", name: "Emma Davis", avatar: "/avatars/mantaka.jpg" },
      { id: "5", name: "Michael Wilson", avatar: "/avatars/mantaka.jpg" },
    ],
    messages: [
      {
        id: "1",
        sender: "John Doe",
        text: "Welcome everyone to our React introduction session!",
        timestamp: "2023-06-15T10:00:00Z",
      },
      {
        id: "2",
        sender: "Alice Smith",
        text: "Thanks for hosting, John! I'm excited to learn React.",
        timestamp: "2023-06-15T10:02:30Z",
      },
      {
        id: "3",
        sender: "Bob Johnson",
        text: "Is this session suitable for complete beginners?",
        timestamp: "2023-06-15T10:05:45Z",
      },
      {
        id: "4",
        sender: "John Doe",
        text: "Absolutely, Bob! We'll start from the very basics.",
        timestamp: "2023-06-15T10:07:20Z",
      },
      {
        id: "5",
        sender: "Emma Davis",
        text: "I have some experience with JavaScript. Will this help?",
        timestamp: "2023-06-15T10:10:15Z",
      },
      {
        id: "6",
        sender: "John Doe",
        text: "Definitely, Emma! JavaScript knowledge will give you a head start.",
        timestamp: "2023-06-15T10:12:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Advanced JavaScript",
    description: "Dive deep into advanced JavaScript concepts.",
    topic: "JavaScript",
    host: "jane_smith",
    participants: [
      {
        id: "1",
        name: "Jane Smith",
        avatar: "/avatars/mantaka.jpg",
        isHost: true,
      },
      { id: "2", name: "David Brown", avatar: "/avatars/mantaka.jpg" },
      { id: "3", name: "Sophia Miller", avatar: "/avatars/mantaka.jpg" },
      { id: "4", name: "Oliver Taylor", avatar: "/avatars/mantaka.jpg" },
    ],
    messages: [
      {
        id: "1",
        sender: "Jane Smith",
        text: "Welcome to Advanced JavaScript! Today we'll explore closures and prototypes.",
        timestamp: "2023-06-16T14:00:00Z",
      },
      {
        id: "2",
        sender: "David Brown",
        text: "I've been struggling with understanding closures. Looking forward to this!",
        timestamp: "2023-06-16T14:03:10Z",
      },
      {
        id: "3",
        sender: "Sophia Miller",
        text: "What's the practical application of prototypes in modern JS?",
        timestamp: "2023-06-16T14:07:45Z",
      },
      {
        id: "4",
        sender: "Jane Smith",
        text: "Great question, Sophia! We'll cover that in detail today.",
        timestamp: "2023-06-16T14:09:30Z",
      },
    ],
  },
];

export default function RoomPage() {
  const router = useRouter();
  const params = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a slight delay
    const fetchRoom = async () => {
      setLoading(true);
      // In a real app, fetch from API using params.id
      const foundRoom = rooms.find((r) => r.id === params.id);
      setTimeout(() => {
        setRoom(foundRoom);
        setLoading(false);
      }, 500);
    };

    fetchRoom();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Room not found</h2>
        <p className="mt-2 text-neutral-500">
          The room you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Return to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full rounded-tl-2xl border border-neutral-200 bg-white md:overflow-scroll dark:border-neutral-700 dark:bg-neutral-900">
      <header className="py-6 px-8 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-y-7 space-x-2">
            <button
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
            >
              <IconArrowLeft size={20} />
            </button>
            <span>
              <h1 className="text-2xl font-bold mb-2">{room.name}</h1>
              <p className="text-sm text-neutral-500">{room.description}</p>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-xl bg-orange-500 text-white text-xs font-semibold">
              {room.topic}
            </span>
            <span className="text-xs text-neutral-500">
              Hosted by <span className="text-orange-400">{room.host}</span>
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <MessageSection messages={room.messages} roomId={room.id} />
        <ParticipantPanel participants={room.participants} />
      </div>
    </div>
  );
}

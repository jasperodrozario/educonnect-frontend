"use client";
import { useState } from "react";
import { Room } from "@/components/Card";
import { SearchBar } from "@/components/ui/SearchBar";

export function Dashboard() {
  const allRooms = [
    {
      name: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      topic: "React",
      host: "john_doe",
      participants: 25,
    },
    {
      name: "Advanced JavaScript",
      description: "Dive deep into advanced JavaScript concepts.",
      topic: "JavaScript",
      host: "jane_smith",
      participants: 18,
    },
    {
      name: "Tailwind CSS Workshop",
      description: "Master Tailwind CSS for modern web design.",
      topic: "CSS",
      host: "alice_wonder",
      participants: 32,
    },
    {
      name: "Node.js for Beginners",
      description: "Get started with Node.js and build your first server.",
      topic: "Node.js",
      host: "bob_builder",
      participants: 22,
    },
    {
      name: "Python Data Science",
      description: "Explore data science with Python and Pandas.",
      topic: "Python",
      host: "data_guru",
      participants: 40,
    },
    {
      name: "UI/UX Design Principles",
      description: "Learn the fundamentals of UI/UX design.",
      topic: "Design",
      host: "design_master",
      participants: 15,
    },
    {
      name: "Machine Learning Basics",
      description: "Understand the basics of machine learning.",
      topic: "Machine Learning",
      host: "ml_expert",
      participants: 28,
    },
    {
      name: "DevOps Essentials",
      description: "Learn the essentials of DevOps practices.",
      topic: "DevOps",
      host: "devops_pro",
      participants: 20,
    },
    {
      name: "GraphQL Fundamentals",
      description: "Learn how to use GraphQL for APIs.",
      topic: "GraphQL",
      host: "api_ninja",
      participants: 12,
    },
    {
      name: "Docker for Developers",
      description: "Get started with Docker and containerization.",
      topic: "Docker",
      host: "container_king",
      participants: 35,
    },
  ];

  const [displayedRooms, setDisplayedRooms] = useState(allRooms);

  const handleSearch = (filteredRooms) => {
    setDisplayedRooms(filteredRooms);
  };

  return (
    <div className="h-full w-full rounded-tl-2xl border border-neutral-200 bg-white p-6 md:px-10 py-6 overflow-scroll dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-lg">Study Rooms</h1>
          <span className="p-0 m-0 text-xs text-neutral-400 font-semibold">
            {displayedRooms.length} rooms available
          </span>
        </div>
        <SearchBar rooms={allRooms} onSearch={handleSearch} />
      </div>

      <div>
        {displayedRooms.length === 0 ? (
          <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
            No rooms found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedRooms.map((room, index) => (
              <Room
                key={index}
                name={room.name}
                description={room.description}
                topic={room.topic}
                host={room.host}
                participants={room.participants}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

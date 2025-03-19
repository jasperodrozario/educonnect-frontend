"use client";
import { useState } from "react";
import { RoomCard } from "@/components/ui/RoomCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { IconPlus } from "@tabler/icons-react";
import { rooms } from "@/data/rooms";

export function Dashboard() {
  const [displayedRooms, setDisplayedRooms] = useState(rooms);

  const handleSearch = (filteredRooms) => {
    setDisplayedRooms(filteredRooms);
  };

  return (
    <div className="h-full w-full rounded-tl-2xl bg-white  pb-6 overflow-scroll border dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex sticky top-0 items-center justify-between mb-4 pb-4 pt-8 px-8 z-10 bg-white dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Study Rooms
          <p className="py-1 font-semibold text-xs text-neutral-800 dark:text-neutral-400">
            {rooms.length} rooms available
          </p>
        </h1>
        <SearchBar rooms={rooms} onSearch={handleSearch} />
      </div>

      <button className="flex items-center bg-orange-300 py-2 px-2 mx-8 my-4 rounded-full font-semibold text-sm bg-orange-500 text-white hover:bg-orange-400">
        <IconPlus size={16} />
        <p className="pb-[0.05rem] pr-2">Create Room</p>
      </button>

      {displayedRooms.length === 0 ? (
        <div className="text-center px-8 py-10 my-4 text-neutral-500 dark:text-neutral-400">
          No rooms found matching your search.
        </div>
      ) : (
        <div className="my-2 px-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedRooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
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
  );
}

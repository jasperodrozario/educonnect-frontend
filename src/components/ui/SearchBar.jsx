"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const SearchBar = ({ rooms, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Handle keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (onSearch) {
      const filtered =
        value === ""
          ? rooms
          : rooms.filter(
              (room) =>
                room.name.toLowerCase().includes(value.toLowerCase()) ||
                room.description.toLowerCase().includes(value.toLowerCase()) ||
                room.topic.toLowerCase().includes(value.toLowerCase()) ||
                room.host.toLowerCase().includes(value.toLowerCase())
            );

      onSearch(filtered);
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearchTerm("");
    if (onSearch) onSearch(rooms); // Reset to all rooms
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 rounded-md border border-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span>Search rooms</span>
        <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 font-mono text-[10px] font-medium text-neutral-600 opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeSearch}
          ></div>
          <div
            ref={searchRef}
            className="relative w-full max-w-lg transform rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-900 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-neutral-500 dark:text-neutral-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for rooms by name, topic, or host..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              />
              <button
                onClick={closeSearch}
                className="ml-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Search results */}
            {searchTerm && (
              <div className="mt-4 space-y-2">
                {rooms
                  .filter(
                    (room) =>
                      room.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      room.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      room.topic
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      room.host.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((room, index) => (
                    <div
                      key={index}
                      className="cursor-pointer p-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-800"
                      onClick={() => {
                        // This could navigate to room or perform any action
                        // For now, just filter to this room
                        onSearch([room]);
                        closeSearch();
                      }}
                    >
                      <div className="font-medium">{room.name}</div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Topic: {room.topic} • Host: {room.host}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

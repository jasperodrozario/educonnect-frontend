"use client";
import { useState } from "react";

export function ParticipantPanel({ participants }) {
  const [expanded, setExpanded] = useState(true);

  // Count the number of participants
  const participantCount = participants?.length || 0;

  // Find the host
  const host = participants?.find((participant) => participant.isHost);

  // Other participants (non-hosts)
  const otherParticipants =
    participants?.filter((participant) => !participant.isHost) || [];

  return (
    <div className="w-64 border-l border-neutral-200 dark:border-neutral-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full focus:outline-none"
        >
          <div className="flex items-center">
            <h3 className="font-medium">Participants</h3>
            <span className="ml-2 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs">
              {participantCount}
            </span>
          </div>
          <svg
            className={`h-5 w-5 transform transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Participants list */}
      {expanded && (
        <div className="flex-1 overflow-y-auto p-4">
          {/* Host section */}
          {host && (
            <div className="mb-4">
              <h4 className="text-xs uppercase text-neutral-500 mb-2 font-medium">
                Host
              </h4>
              <div className="flex items-center p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-800">
                    {host.avatar ? (
                      <img
                        src={host.avatar}
                        alt={host.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      host.name.charAt(0)
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full h-3 w-3 border-2 border-white dark:border-neutral-900"></div>
                </div>
                <div className="ml-2">
                  <span className="text-sm font-medium">{host.name}</span>
                  <span className="ml-2 text-xs px-1.5 py-0.5 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded">
                    Host
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Other participants */}
          {otherParticipants.length > 0 && (
            <div>
              <h4 className="text-xs uppercase text-neutral-500 mb-2 font-medium">
                Participants
              </h4>
              <div className="space-y-1">
                {otherParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        participant.name.charAt(0)
                      )}
                    </div>
                    <span className="ml-2 text-sm">{participant.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {participantCount === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-neutral-500 text-sm">No participants yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

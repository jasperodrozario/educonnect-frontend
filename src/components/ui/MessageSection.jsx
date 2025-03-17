"use client";
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export function MessageSection({ messages: initialMessages, roomId }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Will be replaced by actual API call in a real app
    const message = {
      id: `temp-${Date.now()}`,
      sender: "You", // Current User
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatMessageTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "recently";
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden border-r border-neutral-200 dark:border-neutral-700">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-neutral-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex flex-col">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium">
                    {message.sender.charAt(0)}
                  </div>
                  <div className="ml-2 flex-1">
                    <div className="flex items-baseline">
                      <span className="font-medium">{message.sender}</span>
                      <span className="ml-2 text-xs text-neutral-500">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t border-neutral-200 p-4 dark:border-neutral-700">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
          />
          <button
            type="submit"
            className="rounded-full bg-orange-600 ml-2 px-4 py-[0.55rem] text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            S
          </button>
        </form>
      </div>
    </div>
  );
}

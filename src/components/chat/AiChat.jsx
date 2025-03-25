"use client";
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  IconX,
  IconSend,
  IconBrandGithubCopilot,
  IconArrowUpRight,
} from "@tabler/icons-react";
import Link from "next/link";

export function AiChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "AI",
      text: "Hello! How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus on input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message to the chat
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // Call the AI API route
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error("API response was not ok");
      }

      const data = await response.json();

      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: "AI",
        text: data.message,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "System",
          text: "Sorry, there was an error processing your request. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "recently";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-lg shadow-xl flex flex-col bg-blue/30 backdrop-blur-xl dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 p-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
            <IconBrandGithubCopilot size={18} />
          </div>
          <h3 className="font-medium">AI Assistant</h3>
          <Link
            href={"/ai-chat"}
            className="mt-1 hover:border hover:border-neutral-200 hover:dark:border-neutral-700 hover:rounded-full hover:p-1"
          >
            <IconArrowUpRight size={18} />
          </Link>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <IconX size={18} />
        </Button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col",
                message.sender === "You" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-3",
                  message.sender === "You"
                    ? "bg-orange-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-800"
                )}
              >
                <div className="flex items-baseline">
                  <span className="font-medium text-sm">{message.sender}</span>
                  <span
                    className={cn(
                      "ml-2 text-xs",
                      message.sender === "You"
                        ? "text-orange-200"
                        : "text-neutral-600 dark:text-neutral-400"
                    )}
                  >
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t border-neutral-200 dark:border-neutral-700 p-3">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask the AI something..."
            className="flex-1 rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-800"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="ml-2 rounded-full bg-orange-600 px-4 w-11 h-11 text-white hover:bg-orange-600 hover:w-18 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading || !newMessage.trim()}
          >
            {isLoading ? (
              <span className="animate-pulse">•••</span>
            ) : (
              <IconSend size={18} />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

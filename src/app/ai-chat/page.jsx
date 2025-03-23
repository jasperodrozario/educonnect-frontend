"use client";
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  IconSend,
  IconBrandGithubCopilot,
  IconMicrophone,
  IconScreenShare,
  IconFileUpload,
  IconBulb,
  IconCode,
  IconGraph,
  IconScreenshot,
  IconBookmarks,
  IconPencil,
  IconTrash,
  IconInfoCircle,
} from "@tabler/icons-react";

// Example prompts for quick access
const LEARNING_PROMPTS = [
  {
    id: 1,
    text: "Explain [topic] in simple terms",
    icon: <IconBulb size={16} />,
  },
  { id: 2, text: "Help me debug this code", icon: <IconCode size={16} /> },
  {
    id: 3,
    text: "Create a study plan for [subject]",
    icon: <IconGraph size={16} />,
  },
  { id: 4, text: "Summarize this concept", icon: <IconScreenshot size={16} /> },
];

// Mock subject areas for categorizing discussions
const SUBJECT_AREAS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Language Learning",
  "History",
  "Chemistry",
  "Biology",
  "Economics",
];

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "AI",
      text: "👋 Welcome to your AI Learning Assistant! I can help with explanations, study plans, practice problems, and more. What would you like to learn today?",
      timestamp: new Date().toISOString(),
      subjectArea: null,
    },
  ]);
  const [savedChats, setSavedChats] = useState([
    {
      id: 1,
      title: "Data Structures Review",
      date: "2023-12-01",
      messageCount: 8,
    },
    {
      id: 2,
      title: "Calculus Homework Help",
      date: "2023-11-28",
      messageCount: 12,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [activeChat, setActiveChat] = useState("current");
  const [chatTitle, setChatTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus on input when page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message to the chat
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
      subjectArea: selectedSubject === "All Subjects" ? null : selectedSubject,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // Call the AI API route
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newMessage,
          subject: selectedSubject === "All Subjects" ? null : selectedSubject,
        }),
      });

      if (!response.ok) {
        throw new Error("API response was not ok");
      }

      const data = await response.json();

      // Auto-detect subject area if not specified
      const detectedSubject = data.subjectArea || selectedSubject;
      if (
        detectedSubject !== selectedSubject &&
        detectedSubject !== "All Subjects"
      ) {
        setSelectedSubject(detectedSubject);
      }

      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: "AI",
        text: data.message,
        timestamp: data.timestamp || new Date().toISOString(),
        subjectArea:
          detectedSubject === "All Subjects" ? null : detectedSubject,
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Auto-generate a title for the chat if this is the first user message
      if (prev.length === 1 && prev[0].id === "welcome" && !chatTitle) {
        setChatTitle(
          data.suggestedTitle || `Chat about ${newMessage.substring(0, 20)}...`
        );
      }
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "System",
          text: "Sorry, there was an error processing your request. Please try again.",
          timestamp: new Date().toISOString(),
          subjectArea: null,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setNewMessage(promptText);
    inputRef.current?.focus();
  };

  const handleSaveChat = () => {
    const newSavedChat = {
      id: Date.now(),
      title: chatTitle || `Chat ${savedChats.length + 1}`,
      date: new Date().toISOString(),
      messageCount: messages.length,
      messages: [...messages],
    };

    setSavedChats([...savedChats, newSavedChat]);
    setActiveChat("current");

    // Provide feedback
    setMessages([
      ...messages,
      {
        id: `system-${Date.now()}`,
        sender: "System",
        text: `Chat saved as "${newSavedChat.title}". You can access it from the Saved Chats panel.`,
        timestamp: new Date().toISOString(),
        subjectArea: null,
      },
    ]);
  };

  const handleLoadChat = (chatId) => {
    const chat = savedChats.find((c) => c.id === chatId);
    if (chat && chat.messages) {
      setMessages(chat.messages);
      setChatTitle(chat.title);
      setActiveChat(chatId);
    }
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    setSavedChats(savedChats.filter((chat) => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat("current");
      setMessages([
        {
          id: "welcome",
          sender: "AI",
          text: "Chat deleted. What would you like to discuss now?",
          timestamp: new Date().toISOString(),
          subjectArea: null,
        },
      ]);
      setChatTitle("");
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "AI",
        text: "👋 Welcome to your AI Learning Assistant! I can help with explanations, study plans, practice problems, and more. What would you like to learn today?",
        timestamp: new Date().toISOString(),
        subjectArea: null,
      },
    ]);
    setActiveChat("current");
    setChatTitle("");
    setSelectedSubject("All Subjects");
  };

  const formatMessageTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "recently";
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="w-64 h-full rounded-tl-2xl border border-l border-neutral-300 dark:border-neutral-700 flex flex-col bg-white dark:bg-neutral-900">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <Button
            onClick={handleNewChat}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-2"
          >
            New Chat
          </Button>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full mt-2 p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
          >
            <option value="All Subjects">All Subjects</option>
            {SUBJECT_AREAS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h3 className="px-4 py-2 text-sm font-medium text-neutral-500">
            Saved Chats
          </h3>
          <div className="space-y-1 px-2">
            {savedChats.length === 0 ? (
              <p className="text-sm text-neutral-500 px-2">
                No saved chats yet
              </p>
            ) : (
              savedChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleLoadChat(chat.id)}
                  className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${
                    activeChat === chat.id
                      ? "bg-orange-100 dark:bg-orange-900/20"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="font-medium text-sm truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {new Date(chat.date).toLocaleDateString()} •{" "}
                      {chat.messageCount} messages
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="text-neutral-400 hover:text-red-500"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500">
          <p>Your chats are saved locally</p>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-neutral-900 border-l dark:border-neutral-700">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white">
              <IconBrandGithubCopilot size={20} />
            </div>

            {isEditing ? (
              <input
                type="text"
                value={chatTitle}
                onChange={(e) => setChatTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                autoFocus
                className="border-b border-neutral-300 dark:border-neutral-700 bg-transparent px-1 py-0.5 text-lg font-medium focus:outline-none focus:border-orange-500"
              />
            ) : (
              <h1 className="text-lg font-medium flex items-center gap-2">
                {chatTitle || "AI Learning Assistant"}
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-neutral-400 hover:text-orange-500"
                >
                  <IconPencil size={14} />
                </button>
              </h1>
            )}

            {selectedSubject !== "All Subjects" && (
              <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                {selectedSubject}
              </span>
            )}
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveChat}
              className="mr-2"
            >
              <IconBookmarks size={16} className="mr-1" />
              Save Chat
            </Button>
          </div>
        </div>

        {/* Quick prompts */}
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-700 flex gap-2 overflow-x-auto">
          {LEARNING_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => handleQuickPrompt(prompt.text)}
              className="px-3 py-1.5 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center whitespace-nowrap"
            >
              {prompt.icon && <span className="mr-1.5">{prompt.icon}</span>}
              {prompt.text}
            </button>
          ))}
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col",
                  message.sender === "You" ? "items-end" : "items-start",
                  message.sender === "System" ? "items-center" : ""
                )}
              >
                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.sender === "You"
                      ? "bg-orange-600 text-white max-w-[85%]"
                      : message.sender === "AI"
                      ? "bg-neutral-200 dark:bg-neutral-800 max-w-[85%]"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 text-sm max-w-md"
                  )}
                >
                  {message.sender !== "System" && (
                    <div className="flex items-baseline">
                      <span className="font-medium text-sm">
                        {message.sender === "AI"
                          ? "AI Assistant"
                          : message.sender}
                      </span>
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
                  )}
                  <div className="mt-1 text-sm whitespace-pre-wrap">
                    {message.text}
                  </div>
                  {message.subjectArea && message.sender === "AI" && (
                    <div className="mt-2 text-xs text-right">
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">
                        {message.subjectArea}
                      </span>
                    </div>
                  )}
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

        {/* Footer with learning tools */}
        <div className="border-t border-neutral-200 dark:border-neutral-700">
          <div className="p-2 flex justify-center gap-2 border-b border-neutral-200 dark:border-neutral-700">
            <button
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              title="Upload file"
            >
              <IconFileUpload size={18} />
            </button>
            <button
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              title="Voice input"
            >
              <IconMicrophone size={18} />
            </button>
            <button
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              title="Share screen"
            >
              <IconScreenShare size={18} />
            </button>
            <div className="border-l border-neutral-200 dark:border-neutral-700 mx-1"></div>
            <button
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              title="Help"
            >
              <IconInfoCircle size={18} />
            </button>
          </div>

          {/* Message input */}
          <div className="p-3">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask something about your studies..."
                className="flex-1 rounded-md border border-neutral-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-800"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="ml-2 rounded-full bg-orange-600 w-11 h-11 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
      </div>
    </div>
  );
}

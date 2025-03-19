"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconX, IconBrandGithubCopilot } from "@tabler/icons-react";
import { AiChat } from "@/components/chat/AiChat";

export function AiChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-400 text-white shadow-lg"
        aria-label={isChatOpen ? "Close AI chat" : "Open AI chat"}
      >
        {isChatOpen ? (
          <IconX size={24} />
        ) : (
          <IconBrandGithubCopilot size={24} />
        )}
      </Button>
      <AiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default AiChatButton;

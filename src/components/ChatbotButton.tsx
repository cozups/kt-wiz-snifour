import { useEffect, useState } from "react";
import { Button } from "./ui";
import Chatbot from "react-chatbot-kit";
import { ActionProvider, MessageParser } from "@/features/chatbot";
import config from "@/features/chatbot/config";

export function ChatbotButton() {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const handleCloseChatbot = () => {
      setShowChatbot(false);
    };
    window.addEventListener("closeChatbot", handleCloseChatbot);

    return () => {
      window.removeEventListener("closeChatbot", handleCloseChatbot);
    };
  }, []);

  return (
    <>
      {!showChatbot && (
        <Button
          onClick={() => setShowChatbot(true)}
          className="w-12 h-12 rounded-full bg-white border fixed bottom-20 right-2 hover:bg-wiz-red hover:text-wiz-white"
        >
          챗봇
        </Button>
      )}
      {showChatbot && <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />}
    </>
  );
}

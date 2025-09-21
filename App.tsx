
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from "@google/genai";
import ChatMessageComponent from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import { initializeChat } from './services/geminiService';
import { INITIAL_MESSAGES } from './constants';
import { MessageSender, type ChatMessage } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const chatSession = initializeChat();
      setChat(chatSession);
    } catch (e: any) {
      setError(e.message || "Failed to initialize the AI chat service.");
      console.error(e);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (userMessageText: string) => {
    if (!chat) {
      setError("Chat is not initialized. Please refresh the page.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: MessageSender.User,
      text: userMessageText,
    };
    
    setMessages(prev => [...prev, userMessage]);

    const aiMessageId = `ai-${Date.now()}`;
    const aiMessagePlaceholder: ChatMessage = {
        id: aiMessageId,
        sender: MessageSender.AI,
        text: "",
    };

    setMessages(prev => [...prev, aiMessagePlaceholder]);

    try {
      const stream = await chat.sendMessageStream({ message: userMessageText });
      let accumulatedText = "";

      for await (const chunk of stream) {
        accumulatedText += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg
        ));
      }

    } catch (e) {
      console.error(e);
      const errorMessage = "Sorry, something went wrong. Please try again.";
      setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: errorMessage } : msg
      ));
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100 font-sans">
      <header className="p-4 text-center bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-700">Zenith AI</h1>
        <p className="text-sm text-gray-500">Your Personal Wellness Companion</p>
      </header>
      
      {error && (
        <div className="p-2 bg-red-500 text-white text-center">
            {error}
        </div>
      )}

      <main className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && (
            <div className="flex justify-start items-end space-x-3">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1H7zm5 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1h-1zm-2 6a1.5 1.5 0 00-3 0h6a1.5 1.5 0 00-3 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="p-3 bg-white text-gray-800 rounded-bl-none shadow-md rounded-2xl">
                    <TypingIndicator />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;

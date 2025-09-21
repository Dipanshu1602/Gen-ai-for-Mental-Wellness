
import React from 'react';
import { MessageSender, type ChatMessage } from '../types';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.User;

  const wrapperClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const bubbleClasses = isUser
    ? 'bg-blue-500 text-white rounded-br-none'
    : 'bg-white text-gray-800 rounded-bl-none shadow-md';
  const avatarClasses = 'w-8 h-8 rounded-full flex items-center justify-center';
  
  return (
    <div className={`${wrapperClasses} items-end space-x-3`}>
      {!isUser && (
        <div className={`${avatarClasses} bg-gradient-to-br from-purple-400 to-indigo-500 text-white`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1H7zm5 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1h-1zm-2 6a1.5 1.5 0 00-3 0h6a1.5 1.5 0 00-3 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-lg p-3 rounded-2xl whitespace-pre-wrap ${bubbleClasses}`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessageComponent;

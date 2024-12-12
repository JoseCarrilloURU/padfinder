import React, { createContext, useContext, useState } from 'react';

interface ChatContextType {
  chatId: string | null;
  setChatId: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chatId, setChatId] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat debe ser usando dentro de su Provider');
  }
  return context;
};

import { useState } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatWindow } from '@/components/ChatWindow';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar 
        selectedChat={selectedChat} 
        onChatSelect={setSelectedChat} 
      />
      <ChatWindow chatId={selectedChat} />
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatWindow } from '@/components/ChatWindow';
import { CallInterface } from '@/components/CallInterface';

interface ActiveCall {
  contact: {
    id: string;
    name: string;
    avatar?: string;
  };
  type: 'audio' | 'video';
}

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);

  const handleCallInitiate = (contactName: string, type: 'audio' | 'video') => {
    setActiveCall({
      contact: {
        id: '1',
        name: contactName,
        avatar: undefined,
      },
      type,
    });
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar 
        selectedChat={selectedChat} 
        onChatSelect={setSelectedChat}
        onCallInitiate={handleCallInitiate}
      />
      <ChatWindow 
        chatId={selectedChat} 
        onCallInitiate={handleCallInitiate}
      />
      
      {activeCall && (
        <CallInterface
          contact={activeCall.contact}
          callType={activeCall.type}
          onEndCall={handleEndCall}
        />
      )}
    </div>
  );
};

export default Index;

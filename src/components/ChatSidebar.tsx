import { useState } from 'react';
import { Search, MessageCircle, Phone, Video, MoreVertical, Settings } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { NotificationSetup } from './NotificationSetup';
import { CallHistory } from './CallHistory';
import { StatusView } from './StatusView';

type TabType = 'chats' | 'calls' | 'status';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface ChatSidebarProps {
  selectedChat: string | null;
  onChatSelect: (chatId: string) => void;
  onCallInitiate: (contact: string, type: 'audio' | 'video') => void;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: 'Hey! How are you doing today?',
    timestamp: '2:30 PM',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'John Davis',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: '1:15 PM',
    unread: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Team Chat',
    lastMessage: 'Great work on the presentation!',
    timestamp: '12:45 PM',
    unread: 5,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Mom',
    lastMessage: 'Don\'t forget dinner tonight!',
    timestamp: '11:20 AM',
    unread: 1,
    isOnline: true,
  },
];

export function ChatSidebar({ selectedChat, onChatSelect, onCallInitiate }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationSetup, setShowNotificationSetup] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chats');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showNotificationSetup) {
    return (
      <div className="w-full md:w-80 bg-background border-r border-border flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <Button 
            variant="ghost" 
            onClick={() => setShowNotificationSetup(false)}
            className="mb-4"
          >
            ← Back to {activeTab === 'chats' ? 'Chats' : activeTab === 'calls' ? 'Calls' : 'Status'}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NotificationSetup />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 bg-background border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">
            {activeTab === 'chats' ? 'Chats' : activeTab === 'calls' ? 'Calls' : 'Status'}
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowNotificationSetup(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 mb-4">
          <Button
            variant={activeTab === 'chats' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('chats')}
            className="flex-1"
          >
            Chats
          </Button>
          <Button
            variant={activeTab === 'calls' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('calls')}
            className="flex-1"
          >
            Calls
          </Button>
          <Button
            variant={activeTab === 'status' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('status')}
            className="flex-1"
          >
            Status
          </Button>
        </div>
        
        {/* Search - only show for chats */}
        {activeTab === 'chats' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <>
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onChatSelect(contact.id)}
                className={`flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                  selectedChat === contact.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'calls' && (
          <CallHistory onCallSelect={(contact, type) => onCallInitiate(contact, type)} />
        )}

        {activeTab === 'status' && <StatusView />}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  chatId: string | null;
}

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    { id: '1', text: 'Hey! How are you doing today?', timestamp: '2:25 PM', isSent: false, status: 'read' },
    { id: '2', text: 'I\'m doing great! Just finished a big project.', timestamp: '2:27 PM', isSent: true, status: 'read' },
    { id: '3', text: 'That sounds amazing! What was the project about?', timestamp: '2:28 PM', isSent: false, status: 'read' },
    { id: '4', text: 'It was a mobile app for real-time messaging, similar to WhatsApp but with some cool new features!', timestamp: '2:30 PM', isSent: true, status: 'delivered' },
  ],
  '2': [
    { id: '1', text: 'Can we schedule a meeting tomorrow?', timestamp: '1:15 PM', isSent: false, status: 'read' },
    { id: '2', text: 'Sure! What time works for you?', timestamp: '1:20 PM', isSent: true, status: 'read' },
  ],
  '3': [
    { id: '1', text: 'Great work on the presentation!', timestamp: '12:45 PM', isSent: false, status: 'read' },
    { id: '2', text: 'Thanks everyone! Couldn\'t have done it without the team.', timestamp: '12:50 PM', isSent: true, status: 'read' },
  ],
  '4': [
    { id: '1', text: 'Don\'t forget dinner tonight!', timestamp: '11:20 AM', isSent: false, status: 'read' },
    { id: '2', text: 'I won\'t! What time should I be there?', timestamp: '11:25 AM', isSent: true, status: 'read' },
  ],
};

const contactNames: { [key: string]: string } = {
  '1': 'Sarah Wilson',
  '2': 'John Davis',
  '3': 'Team Chat',
  '4': 'Mom',
};

export function ChatWindow({ chatId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId && mockMessages[chatId]) {
      setMessages(mockMessages[chatId]);
    }
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && chatId) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true,
        status: 'sent',
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate auto-reply after 2 seconds
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! I\'ll get back to you soon.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSent: false,
          status: 'delivered',
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-chat-bg">
        <div className="text-center text-muted-foreground">
          <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-medium mb-2">Welcome to WhatsApp Clone</h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-chat-bg">
      {/* Chat Header */}
      <div className="bg-background border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{contactNames[chatId]?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{contactNames[chatId]}</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-chat-pattern">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-background border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          
          <Button onClick={handleSendMessage} size="icon" className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
    </svg>
  );
}
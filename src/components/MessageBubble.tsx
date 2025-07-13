import { Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.isSent
            ? 'bg-message-sent text-message-text rounded-br-sm'
            : 'bg-message-received text-message-text rounded-bl-sm'
        }`}
      >
        <p className="text-sm break-words">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${
          message.isSent ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-timestamp">{message.timestamp}</span>
          {message.isSent && (
            <div className="text-timestamp">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
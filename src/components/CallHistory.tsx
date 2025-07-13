import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Video, VideoOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface CallRecord {
  id: string;
  contact: string;
  avatar?: string;
  type: 'audio' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: string;
  duration?: string;
}

interface CallHistoryProps {
  onCallSelect: (contact: string, type: 'audio' | 'video') => void;
}

const mockCallHistory: CallRecord[] = [
  {
    id: '1',
    contact: 'Sarah Wilson',
    type: 'video',
    direction: 'outgoing',
    timestamp: '2:45 PM',
    duration: '12:34',
  },
  {
    id: '2',
    contact: 'John Davis',
    type: 'audio',
    direction: 'incoming',
    timestamp: '1:30 PM',
    duration: '5:22',
  },
  {
    id: '3',
    contact: 'Mom',
    type: 'audio',
    direction: 'missed',
    timestamp: '12:15 PM',
  },
  {
    id: '4',
    contact: 'Team Chat',
    type: 'video',
    direction: 'incoming',
    timestamp: '11:45 AM',
    duration: '25:18',
  },
  {
    id: '5',
    contact: 'Sarah Wilson',
    type: 'audio',
    direction: 'outgoing',
    timestamp: 'Yesterday',
    duration: '8:12',
  },
  {
    id: '6',
    contact: 'John Davis',
    type: 'video',
    direction: 'missed',
    timestamp: 'Yesterday',
  },
];

export function CallHistory({ onCallSelect }: CallHistoryProps) {
  const getCallIcon = (record: CallRecord) => {
    const iconClass = "h-4 w-4";
    
    if (record.direction === 'missed') {
      return <PhoneMissed className={`${iconClass} text-destructive`} />;
    }
    
    if (record.direction === 'incoming') {
      return <PhoneIncoming className={`${iconClass} text-primary`} />;
    }
    
    return <PhoneOutgoing className={`${iconClass} text-muted-foreground`} />;
  };

  const getCallTypeIcon = (type: 'audio' | 'video') => {
    return type === 'video' ? 
      <Video className="h-4 w-4" /> : 
      <Phone className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Recent Calls</h2>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto">
        {mockCallHistory.map((record) => (
          <div key={record.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
            <Avatar>
              <AvatarImage src={record.avatar} />
              <AvatarFallback>
                {record.contact.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {getCallIcon(record)}
                <h3 className="font-medium text-sm truncate">{record.contact}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {getCallTypeIcon(record.type)}
                <span>{record.timestamp}</span>
                {record.duration && (
                  <>
                    <span>•</span>
                    <span>{record.duration}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={() => onCallSelect(record.contact, 'audio')}
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={() => onCallSelect(record.contact, 'video')}
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
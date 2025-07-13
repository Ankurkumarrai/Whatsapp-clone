import { useState } from 'react';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface StatusItem {
  id: string;
  contact: string;
  avatar?: string;
  timestamp: string;
  viewed: boolean;
  isOwn?: boolean;
}

const mockStatuses: StatusItem[] = [
  {
    id: '1',
    contact: 'My Status',
    timestamp: '45 minutes ago',
    viewed: true,
    isOwn: true,
  },
  {
    id: '2',
    contact: 'Sarah Wilson',
    timestamp: '2 hours ago',
    viewed: false,
  },
  {
    id: '3',
    contact: 'John Davis',
    timestamp: '4 hours ago',
    viewed: true,
  },
  {
    id: '4',
    contact: 'Mom',
    timestamp: '6 hours ago',
    viewed: false,
  },
  {
    id: '5',
    contact: 'Team Chat',
    timestamp: '8 hours ago',
    viewed: true,
  },
];

export function StatusView() {
  const [viewingStatus, setViewingStatus] = useState<StatusItem | null>(null);
  const [statusProgress, setStatusProgress] = useState(0);

  const handleStatusClick = (status: StatusItem) => {
    setViewingStatus(status);
    setStatusProgress(0);
    
    // Simulate status viewing progress
    const interval = setInterval(() => {
      setStatusProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setViewingStatus(null);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleAddStatus = () => {
    // In a real app, this would open camera/gallery
    alert('Add Status - This would open camera or gallery in a real app');
  };

  if (viewingStatus) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        {/* Status Header */}
        <div className="p-4 text-white">
          <Progress value={statusProgress} className="mb-4" />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={viewingStatus.avatar} />
              <AvatarFallback>
                {viewingStatus.contact.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{viewingStatus.contact}</h3>
              <p className="text-sm opacity-70">{viewingStatus.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Status Content */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30">
          <div className="text-center text-white">
            <div className="w-64 h-64 bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <p className="text-lg font-medium">Status Content</p>
            </div>
            <p className="text-sm opacity-80">
              This is a simulated status view. In production, this would show images/videos.
            </p>
          </div>
        </div>

        {/* Status Actions */}
        <div className="p-4 flex justify-center">
          <Button 
            variant="secondary" 
            onClick={() => setViewingStatus(null)}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Status</h2>
      </div>

      {/* Status List */}
      <div className="flex-1 overflow-y-auto">
        {/* My Status */}
        <div className="p-3 border-b border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">My Status</h3>
          {mockStatuses
            .filter(status => status.isOwn)
            .map(status => (
              <div key={status.id} className="flex items-center gap-3 py-2">
                <div className="relative">
                  <Avatar className="border-2 border-muted">
                    <AvatarImage src={status.avatar} />
                    <AvatarFallback>Me</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                    onClick={handleAddStatus}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{status.contact}</h4>
                  <p className="text-xs text-muted-foreground">{status.timestamp}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Recent Updates */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Updates</h3>
          {mockStatuses
            .filter(status => !status.isOwn)
            .map(status => (
              <div
                key={status.id}
                className="flex items-center gap-3 py-2 cursor-pointer hover:bg-muted/50 rounded-lg px-2"
                onClick={() => handleStatusClick(status)}
              >
                <div className="relative">
                  <Avatar className={`border-2 ${
                    status.viewed ? 'border-muted' : 'border-primary'
                  }`}>
                    <AvatarImage src={status.avatar} />
                    <AvatarFallback>
                      {status.contact.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{status.contact}</h4>
                  <p className="text-xs text-muted-foreground">{status.timestamp}</p>
                </div>
                <div className="text-muted-foreground">
                  {status.viewed ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
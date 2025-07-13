import { useState, useEffect } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface CallInterfaceProps {
  contact: {
    id: string;
    name: string;
    avatar?: string;
  };
  callType: 'audio' | 'video';
  onEndCall: () => void;
}

export function CallInterface({ contact, callType, onEndCall }: CallInterfaceProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'ringing' | 'connected'>('connecting');

  useEffect(() => {
    // Simulate call connection
    const timer1 = setTimeout(() => setCallStatus('ringing'), 1000);
    const timer2 = setTimeout(() => setCallStatus('connected'), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'connecting': return 'Connecting...';
      case 'ringing': return 'Ringing...';
      case 'connected': return formatDuration(callDuration);
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-chat-bg flex flex-col">
      {/* Call Header */}
      <div className="p-6 text-center text-white">
        <div className="mb-4">
          {callType === 'video' ? (
            <Video className="h-6 w-6 mx-auto mb-2" />
          ) : (
            <Phone className="h-6 w-6 mx-auto mb-2" />
          )}
          <p className="text-sm opacity-80">
            {callType === 'video' ? 'Video Call' : 'Voice Call'}
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">{contact.name}</h2>
        <p className="text-sm opacity-80">{getStatusText()}</p>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {callType === 'video' && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
            {callStatus === 'connected' && !isVideoOff ? (
              <div className="text-center text-white">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="text-2xl">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm opacity-80">Video simulation - In production, this would show live video feed</p>
              </div>
            ) : (
              <div className="text-center text-white">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="text-2xl">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isVideoOff && <p className="text-sm opacity-60">Video is off</p>}
              </div>
            )}
          </div>
        )}

        {callType === 'audio' && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10 flex items-center justify-center">
            <div className="text-center text-white">
              <Avatar className="w-40 h-40 mx-auto mb-6">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback className="text-4xl">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-center gap-2">
                <Volume2 className="h-5 w-5" />
                <p className="text-sm opacity-80">Audio call in progress</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="p-6">
        <div className="flex items-center justify-center gap-6">
          {/* Mute */}
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-14 h-14"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>

          {/* Video Toggle (only for video calls) */}
          {callType === 'video' && (
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>
          )}

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-16 h-16"
            onClick={onEndCall}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
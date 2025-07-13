import { useState } from 'react';
import { Bell, BellOff, Smartphone, Wifi } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';

export function NotificationSetup() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();

  const enableNotifications = async () => {
    try {
      // In a real Capacitor app, this would use:
      // import { PushNotifications } from '@capacitor/push-notifications';
      // const permission = await PushNotifications.requestPermissions();
      
      // Simulate permission request
      setTimeout(() => {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled!",
          description: "You'll now receive real-time message notifications",
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Permission Denied",
        description: "Please enable notifications in your device settings",
        variant: "destructive",
      });
    }
  };

  const simulateNotification = () => {
    // In a real Capacitor app, this would use:
    // import { LocalNotifications } from '@capacitor/local-notifications';
    // LocalNotifications.schedule({ notifications: [...] });
    
    toast({
      title: "📱 Sarah Wilson",
      description: "Hey! Just got your message. Talk soon!",
    });
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications Setup
          </CardTitle>
          <CardDescription>
            Configure real-time notifications for your WhatsApp clone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!notificationsEnabled ? (
            <div className="text-center space-y-4">
              <BellOff className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-medium mb-2">Enable Push Notifications</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified instantly when you receive new messages, even when the app is closed.
                </p>
                <Button onClick={enableNotifications} className="w-full">
                  Enable Notifications
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Bell className="h-16 w-16 mx-auto text-primary" />
              <div>
                <h3 className="font-medium mb-2 text-primary">Notifications Active</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You're all set! You'll receive notifications for new messages.
                </p>
                <Button onClick={simulateNotification} variant="outline" className="w-full">
                  Test Notification
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Capacitor Integration Ready
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Wifi className="h-3 w-3" />
                <span>Firebase Cloud Messaging (FCM) support</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-3 w-3" />
                <span>Background notification handling</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-3 w-3" />
                <span>Deep linking to specific chats</span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded text-xs space-y-1">
            <p className="font-medium">Next Steps for Mobile Deployment:</p>
            <p>1. Export to GitHub</p>
            <p>2. Install Capacitor: npm install @capacitor/core @capacitor/cli</p>
            <p>3. Add platforms: npx cap add android</p>
            <p>4. Configure FCM in capacitor.config.ts</p>
            <p>5. Build and deploy to Android/iOS</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
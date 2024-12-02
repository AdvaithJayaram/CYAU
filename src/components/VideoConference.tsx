import { useEffect, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useUser } from '@clerk/clerk-react';

const JITSI_DOMAIN = 'meet.jit.si';

export default function VideoConference() {
  const { user } = useUser();
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    // Generate a unique room name using timestamp and random string
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    setRoomName(`dealflow-${timestamp}-${randomStr}`);
  }, []);

  if (!roomName) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Initializing video conference...</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <JitsiMeeting
        domain={JITSI_DOMAIN}
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          MOBILE_APP_PROMO: false,
          HIDE_INVITE_MORE_HEADER: true,
          SHOW_CHROME_EXTENSION_BANNER: false
        }}
        userInfo={{
          displayName: user?.fullName || 'Deal Room User',
          email: user?.emailAddresses[0]?.emailAddress
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100%';
          iframeRef.style.width = '100%';
        }}
      />
    </div>
  );
}
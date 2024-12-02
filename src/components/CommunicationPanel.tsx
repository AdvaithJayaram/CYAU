import { useState } from 'react';
import { Video, Mic, MessageSquare, FileText, Send } from 'lucide-react';
import VideoConference from './VideoConference';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export default function CommunicationPanel() {
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'chat' | 'transcript'>('video');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: input,
      sender: 'local',
      timestamp: new Date()
    }]);
    setInput('');
  };

  const renderChat = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'local' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'local'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-75">
                {formatDistanceToNow(message.timestamp, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="gradient-btn"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px] flex flex-col">
      <div className="flex border-b">
        {[
          { id: 'video', icon: Video, label: 'Video' },
          { id: 'audio', icon: Mic, label: 'Audio' },
          { id: 'chat', icon: MessageSquare, label: 'Chat' },
          { id: 'transcript', icon: FileText, label: 'Transcript' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 p-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title={tab.label}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1">
        {activeTab === 'video' && <VideoConference />}
        {activeTab === 'audio' && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Audio conference feature coming soon
          </div>
        )}
        {activeTab === 'chat' && renderChat()}
        {activeTab === 'transcript' && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Transcript feature coming soon
          </div>
        )}
      </div>
    </div>
  );
}
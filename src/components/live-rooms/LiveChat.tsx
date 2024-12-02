import { useState, useEffect, useRef } from 'react';
import { Clock, Send, PhoneOff, Calendar, UserPlus, Download } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface LiveChatProps {
  user: any;
  onEnd: () => void;
}

export default function LiveChat({ user, onEnd }: LiveChatProps) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        content: input,
        sender: 'me',
        timestamp: new Date(),
      },
    ]);
    setInput('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.role} at {user.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <button
            onClick={onEnd}
            className="text-red-500 hover:text-red-600"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 h-[calc(100%-8rem)]">
        <div className="col-span-2 border-r flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'me'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-75">
                    {formatDistance(message.timestamp, new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="gradient-btn"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <Calendar className="w-5 h-5" />
                Schedule Meeting
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <UserPlus className="w-5 h-5" />
                Connect on LinkedIn
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <Download className="w-5 h-5" />
                Save Transcript
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Partner is offering:</h3>
            <div className="space-y-1">
              {user.offering.map((item: string, index: number) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Partner is seeking:</h3>
            <div className="space-y-1">
              {user.seeking.map((item: string, index: number) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { MessageSquare, History } from 'lucide-react';

export default function TranscriptView() {
  const transcripts = [
    {
      time: '14:30',
      speaker: 'Sarah Johnson',
      text: "Let's review the latest financial projections.",
    },
    {
      time: '14:32',
      speaker: 'Michael Chen',
      text: 'The Q4 numbers look promising, especially in the APAC region.',
    },
    {
      time: '14:35',
      speaker: 'Emma Davis',
      text: 'We should focus on the risk assessment section next.',
    },
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <History className="w-5 h-5" />
          <h3 className="font-medium">Meeting Transcript</h3>
        </div>
        
        {transcripts.map((transcript, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{transcript.time}</span>
              <span className="text-sm font-medium">{transcript.speaker}</span>
            </div>
            <p className="text-gray-700 ml-6">{transcript.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
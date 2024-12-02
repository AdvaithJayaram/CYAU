import { UserButton } from '@clerk/clerk-react';
import NavigationBar from './NavigationBar';
import ResponsiveContainer from './ResponsiveContainer';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <NavigationBar 
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <main className="section-padding">
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
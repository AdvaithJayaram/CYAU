import { UserButton } from '@clerk/clerk-react';
import { MessageSquare, LayoutDashboard, FileText, Users2, PlusCircle, UserCircle, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/wall" className="text-xl font-bold text-gray-800 tracking-wider">
                CALABI YAU
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/wall"
                  className={`flex items-center gap-2 ${
                    isActive('/wall')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Feed
                </Link>
                <Link
                  to="/live-rooms"
                  className={`flex items-center gap-2 ${
                    isActive('/live-rooms')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  Live Deal Rooms
                </Link>
                <Link
                  to="/new-deal"
                  className={`flex items-center gap-2 ${
                    isActive('/new-deal')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <PlusCircle className="w-5 h-5" />
                  New Deal
                </Link>
                <Link
                  to="/deals"
                  className={`flex items-center gap-2 ${
                    isActive('/deals')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Deals
                </Link>
                <Link
                  to="/network"
                  className={`flex items-center gap-2 ${
                    isActive('/network')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Users2 className="w-5 h-5" />
                  Network
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 ${
                    isActive('/profile')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 ${
                    isActive('/dashboard')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
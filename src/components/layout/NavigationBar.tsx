import { useUser, UserButton } from '@clerk/clerk-react';
import { useNavigation } from '../../hooks/useNavigation';
import { 
  MessageSquare, 
  LayoutDashboard, 
  FileText, 
  Users2, 
  PlusCircle, 
  Video,
  Store,
  UserCircle,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { path: '/wall', icon: MessageSquare, label: 'Feed' },
  { path: '/live-rooms', icon: Video, label: 'Live Deal Rooms' },
  { path: '/marketplace', icon: Store, label: 'Marketplace' },
  { path: '/new-deal', icon: PlusCircle, label: 'New Deal' },
  { path: '/deals', icon: FileText, label: 'Deals' },
  { path: '/network', icon: Users2, label: 'Network' },
  { path: '/profile', icon: UserCircle, label: 'Profile' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
];

export default function NavigationBar() {
  const { isSignedIn } = useUser();
  const { currentPath, navigate } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span 
                className="text-xl font-bold text-gray-800 cursor-pointer tracking-wider" 
                onClick={() => navigate('/')}
              >
                CALABI YAU
              </span>
            </div>

            {/* Desktop Navigation */}
            {isSignedIn && (
              <div className="hidden md:flex md:ml-8 md:space-x-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <button
                onClick={() => navigate('/sign-in')}
                className="gradient-btn"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isSignedIn ? (
              <>
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <UserButton afterSignOutUrl="/" />
                </div>
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </>
            ) : (
              <div className="p-3">
                <button
                  onClick={() => navigate('/sign-in')}
                  className="w-full gradient-btn"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
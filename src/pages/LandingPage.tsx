import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Users,
  FileSearch,
  HandshakeIcon,
  PresentationIcon,
  HeartHandshake,
  MessageCircle,
  LayoutDashboard,
  LineChart,
  Shield,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Briefcase,
      title: 'Pitch and Mandate',
      description: 'Investment banks compete to win mandates by pitching their expertise and services.',
    },
    {
      icon: FileSearch,
      title: 'Due Diligence',
      description: 'Extensive evaluation of financial situations, market conditions, and potential opportunities.',
    },
    {
      icon: HandshakeIcon,
      title: 'Structuring and Negotiation',
      description: 'Expert deal structuring and negotiation of terms based on thorough analysis.',
    },
    {
      icon: PresentationIcon,
      title: 'Marketing and Distribution',
      description: 'Strategic marketing and distribution of securities through established networks.',
    },
    {
      icon: HeartHandshake,
      title: 'Execution and Closing',
      description: 'Seamless execution and facilitation of asset and security transfers.',
    },
    {
      icon: MessageCircle,
      title: 'Post-Transaction Support',
      description: 'Ongoing advisory services including integration support and financial guidance.',
    },
  ];

  const platformFeatures = [
    {
      icon: LayoutDashboard,
      title: 'Streamlined Workflow',
      description: 'Experience a seamless deal management process with our intuitive platform.',
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Connect with team members and stakeholders through integrated communication tools.',
    },
    {
      icon: LineChart,
      title: 'Smart Analytics',
      description: 'Make data-driven decisions with comprehensive analytics and reporting.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security protocols protecting your sensitive deal information.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold tracking-wider text-black">CALABI YAU</div>
          <button
            onClick={() => navigate('/sign-in')}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6">
        <div className="text-center py-24">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black">
            A HUMAN CENTRIC DEAL FLOW PLATFORM
          </h1>
          <div className="w-24 h-1 bg-black mx-auto my-6"></div>
          <p className="text-lg sm:text-xl font-medium text-gray-700">
            EVERY NEGOTIATION IS A MEETING OF MINDS
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <button
              onClick={() => navigate('/sign-in')}
              className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition transform hover:-translate-y-1"
            >
              Get Started
            </button>
            <button
              onClick={() => (window.location.href = 'mailto:contact@calabiyau.com')}
              className="px-8 py-3 bg-white text-black rounded-lg border-2 border-black font-medium hover:bg-gray-50 transition transform hover:-translate-y-1"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <CardSection
            title="Our Services"
            content={services}
            theme="light"
            buttonLabel="Get in Touch"
            buttonAction={() => (window.location.href = 'mailto:contact@calabiyau.com')}
          />
          <CardSection
            title="Deal Flow Platform"
            content={platformFeatures}
            theme="dark"
            buttonLabel="Try Platform"
            buttonAction={() => navigate('/sign-in')}
          />
        </div>

        {/* Trusted By Section */}
        <div className="text-center mt-24 mb-12">
          <p className="text-sm text-gray-500">
            Trusted by Tier 1 VCs, Private Equity Firms, Investment Banks, and MNCs around the world
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-50">
            {[
              'https://tier1.ventures/wp-content/uploads/2024/05/T1V__1_-removebg-preview-e1721149383624.png',
              'https://banner2.cleanpng.com/20180518/pfl/avq46v77y.webp',
              'https://upload.wikimedia.org/wikipedia/commons/0/08/Accel_%28Partners%29_2015_logo.png',
              'https://upload.wikimedia.org/wikipedia/en/e/ee/Trilegal_Logo.png',
            ].map((src, index) => (
              <img key={index} src={src} alt="Trusted Logo" className="h-12 mx-auto object-contain" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Card Section Component
function CardSection({ title, content, theme, buttonLabel, buttonAction }) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`rounded-2xl p-8 shadow-xl transition-shadow ${
        isDark ? 'bg-black text-white' : 'bg-white text-black border border-gray-100'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid gap-6">
        {content.map((item, index) => (
          <div key={index} className="flex gap-4">
            <item.icon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
            <div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`w-full mt-8 px-6 py-3 rounded-lg flex items-center justify-center gap-2 ${
          isDark
            ? 'bg-white text-black hover:bg-gray-100'
            : 'bg-black text-white hover:bg-gray-800'
        } transition-colors`}
        onClick={buttonAction}
      >
        {buttonLabel}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

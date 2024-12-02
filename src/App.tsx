import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewDeal from './pages/NewDeal';
import DealSummary from './pages/DealSummary';
import Deals from './pages/Deals';
import Network from './pages/Network';
import ConnectionProfile from './pages/ConnectionProfile';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Wall from './pages/Wall';
import LiveRooms from './pages/LiveRooms';
import Marketplace from './pages/Marketplace';
import GlobalGPTAssistant from './components/GlobalGPTAssistant';
import { ErrorBoundary } from './components/ErrorBoundary';

const clerkPubKey = 'pk_test_bWFnbmV0aWMtZmxlYS02Ni5jbGVyay5hY2NvdW50cy5kZXYk';

export default function App() {
  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={clerkPubKey}>
        <BrowserRouter>
          <SignedOut>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/sign-in/*"
                element={<SignIn routing="path" path="/sign-in" />}
              />
              <Route
                path="/sign-up/*"
                element={<SignUp routing="path" path="/sign-up" />}
              />
            </Routes>
          </SignedOut>
          <SignedIn>
            <Layout>
              <Routes>
                <Route path="/" element={<Wall />} />
                <Route path="/wall" element={<Wall />} />
                <Route path="/live-rooms" element={<LiveRooms />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-deal" element={<NewDeal />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/deals/:dealId" element={<DealSummary />} />
                <Route path="/network" element={<Network />} />
                <Route path="/network/:userId" element={<ConnectionProfile />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
            <GlobalGPTAssistant />
          </SignedIn>
        </BrowserRouter>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
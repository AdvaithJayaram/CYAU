import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { Building2, MapPin, Link as LinkIcon, Mail, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function ConnectionProfile() {
  const { userId } = useParams();
  const { goBack } = useNavigation();
  const { users } = useClerk();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const user = await users.getUser(userId);
        
        if (!user) {
          setProfile(null);
          return;
        }

        setProfile({
          fullName: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          profilePicture: user.imageUrl,
          jobTitle: user.publicMetadata.role || 'Member',
          organizationName: user.publicMetadata.company || 'Unknown Company',
          location: {
            city: user.publicMetadata.city || 'Unknown City',
            country: user.publicMetadata.country || 'Unknown Country',
          },
          industry: user.publicMetadata.industry || [],
          expertise: user.publicMetadata.expertise || [],
          phoneNumber: user.publicMetadata.phoneNumber,
          createdAt: user.createdAt,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, users]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile not found</h2>
        <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist or you don't have access.</p>
        <button onClick={goBack} className="gradient-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button onClick={goBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Network
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={profile.profilePicture}
            alt={profile.fullName}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.fullName}</h1>
            <p className="text-gray-600">{profile.jobTitle}</p>
            <p className="text-gray-500 mt-1">{profile.organizationName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{profile.email}</span>
                </div>
                {profile.phoneNumber && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{profile.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{profile.location.city}, {profile.location.country}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Industry & Expertise</h2>
              <div className="space-y-4">
                {profile.industry.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Industries</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.industry.map((item: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.expertise.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((item: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <Calendar className="w-5 h-5" />
                  Schedule Meeting
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <LinkIcon className="w-5 h-5" />
                  Connect on LinkedIn
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Member Since</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
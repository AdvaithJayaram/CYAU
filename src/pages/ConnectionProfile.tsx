import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DatabaseService } from '../services/database';
import { Building2, MapPin, Link as LinkIcon, Mail, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export default function ConnectionProfile() {
  const { userId } = useParams();
  const { goBack } = useNavigation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const userData = await DatabaseService.getUser(userId);
        setProfile(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

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

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={profile.profilePicture}
                alt={profile.fullName}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                <p className="text-gray-600">{profile.jobTitle}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span>{profile.organizationName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{`${profile.location.city}, ${profile.location.country}`}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{profile.phoneNumber}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button className="w-full gradient-btn">
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Professional Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Industry</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.industry?.map((item: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise?.map((item: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Deal History */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Deal History</h2>
            <div className="space-y-4">
              {profile.pastDeals?.map((deal: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{deal.title}</h3>
                      <p className="text-sm text-gray-500">{deal.type}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {deal.value} {deal.currency}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{deal.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span>{deal.outcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Notable Partnerships</h2>
            <div className="grid grid-cols-2 gap-4">
              {profile.notablePartnerships?.map((partnership: string, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-600 mb-2" />
                  <p>{partnership}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
            <div className="space-y-4">
              {profile.recommendations?.map((rec: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">{rec.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{rec.from}</span>
                    <span className="text-sm text-gray-500">{rec.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
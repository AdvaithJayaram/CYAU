import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UserProfile } from '../../types/profile';
import {
  Building,
  Briefcase,
  DollarSign,
  Shield,
  MessageSquare,
  Star,
  Users,
  Lock,
} from 'lucide-react';

const schema = z.object({
  // Basic Information
  fullName: z.string().min(2, 'Name is required'),
  profilePicture: z.string().url().optional(),
  jobTitle: z.string().min(2, 'Job title is required'),
  organizationName: z.string().min(2, 'Organization name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),

  // Professional Details
  industry: z.array(z.string()),
  expertise: z.array(z.string()),
  yearsOfExperience: z.number().min(0),
  certifications: z.array(z.string()),
  linkedinProfile: z.string().url().optional(),
  professionalSummary: z.string(),

  // Deal Flow Attributes
  dealRole: z.array(z.string()),
  primaryDealTypes: z.array(z.string()),
  preferredDealSize: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  }),
  geographicalFocus: z.array(z.string()),
  sectorFocus: z.array(z.string()),
  dealFrequency: z.string(),

  // Legal and Compliance
  kycStatus: z.enum(['pending', 'completed', 'needs_update']),
  amlCompliance: z.object({
    certified: z.boolean(),
    documentUrl: z.string().optional(),
    expiryDate: z.string().optional(),
  }),
  authorizedRepresentative: z.boolean(),
  powerOfAttorney: z.object({
    exists: z.boolean(),
    documentUrl: z.string().optional(),
    expiryDate: z.string().optional(),
  }),
  conflictOfInterest: z.array(z.string()),

  // Negotiation Preferences
  communicationStyle: z.string(),
  communicationModes: z.array(z.string()),
  timeZone: z.string(),
  negotiationPriorities: z.array(z.string()),
});

const defaultValues: Partial<UserProfile> = {
  fullName: '',
  jobTitle: '',
  organizationName: '',
  email: '',
  phoneNumber: '',
  location: {
    city: '',
    state: '',
    country: '',
  },
  industry: [],
  expertise: [],
  yearsOfExperience: 0,
  certifications: [],
  linkedinProfile: '',
  professionalSummary: '',
  dealRole: [],
  primaryDealTypes: [],
  preferredDealSize: {
    min: 0,
    max: 0,
    currency: 'USD',
  },
  geographicalFocus: [],
  sectorFocus: [],
  dealFrequency: '',
  kycStatus: 'pending',
  amlCompliance: {
    certified: false,
    documentUrl: '',
    expiryDate: '',
  },
  authorizedRepresentative: false,
  powerOfAttorney: {
    exists: false,
    documentUrl: '',
    expiryDate: '',
  },
  conflictOfInterest: [],
  communicationStyle: '',
  communicationModes: [],
  timeZone: '',
  negotiationPriorities: [],
};

export default function ProfileForm({ section }: { section: string }) {
  const { control, handleSubmit } = useForm<UserProfile>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: UserProfile) => {
    console.log('Form data:', data);
    // Save to Firebase
  };

  const renderSection = () => {
    switch (section) {
      case 'basic':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <Controller
                name="organizationName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <Controller
                name="industry"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <select
                    multiple
                    value={value || []}
                    onChange={(e) => {
                      const options = Array.from(e.target.selectedOptions, (option) => option.value);
                      onChange(options);
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[
                      'Finance',
                      'Technology',
                      'Healthcare',
                      'Real Estate',
                      'Manufacturing',
                    ].map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <Controller
                name="yearsOfExperience"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="number"
                    value={value || 0}
                    onChange={(e) => onChange(parseInt(e.target.value, 10))}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
          </div>
        );

      // Add cases for other sections

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Select a section to edit
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {renderSection()}
      <div className="flex justify-end">
        <button type="submit" className="gradient-btn">
          Save Changes
        </button>
      </div>
    </form>
  );
}
import { useState, useEffect } from 'react';
import type { UserProfile } from '../types/profile';

interface Section {
  id: string;
  label: string;
  fields: string[];
  required: boolean;
}

const sections: Section[] = [
  {
    id: 'basic',
    label: 'Basic Information',
    fields: ['fullName', 'jobTitle', 'organizationName', 'email', 'phoneNumber', 'location'],
    required: true,
  },
  {
    id: 'professional',
    label: 'Professional Details',
    fields: ['industry', 'expertise', 'yearsOfExperience', 'certifications', 'linkedinProfile'],
    required: true,
  },
  {
    id: 'dealflow',
    label: 'Deal Flow Attributes',
    fields: ['dealRole', 'primaryDealTypes', 'preferredDealSize', 'geographicalFocus', 'sectorFocus'],
    required: true,
  },
  {
    id: 'legal',
    label: 'Legal & Compliance',
    fields: ['kycStatus', 'amlCompliance', 'authorizedRepresentative'],
    required: true,
  },
  {
    id: 'negotiation',
    label: 'Negotiation Preferences',
    fields: ['communicationStyle', 'communicationModes', 'timeZone', 'negotiationPriorities'],
    required: false,
  },
  {
    id: 'portfolio',
    label: 'Portfolio/Deal History',
    fields: ['pastDeals', 'caseStudies', 'notablePartnerships'],
    required: false,
  },
  {
    id: 'network',
    label: 'Network & Collaboration',
    fields: ['connections', 'teams', 'recommendations', 'collaborationStatus'],
    required: false,
  },
  {
    id: 'security',
    label: 'Security & Privacy',
    fields: ['dataSharing', 'twoFactorEnabled'],
    required: true,
  },
];

export function useProfileCompletion(profile: Partial<UserProfile>) {
  const [completionStatus, setCompletionStatus] = useState<Record<string, number>>({});
  const [overallCompletion, setOverallCompletion] = useState(0);

  useEffect(() => {
    const calculateCompletion = () => {
      const sectionStatus: Record<string, number> = {};
      let totalRequired = 0;
      let completedRequired = 0;

      sections.forEach((section) => {
        const sectionFields = section.fields.length;
        const completedFields = section.fields.filter(
          (field) => profile[field as keyof UserProfile] !== undefined
        ).length;

        sectionStatus[section.id] = Math.round((completedFields / sectionFields) * 100);

        if (section.required) {
          totalRequired += sectionFields;
          completedRequired += completedFields;
        }
      });

      setCompletionStatus(sectionStatus);
      setOverallCompletion(Math.round((completedRequired / totalRequired) * 100));
    };

    calculateCompletion();
  }, [profile]);

  return {
    completionStatus,
    overallCompletion,
    sections,
  };
}
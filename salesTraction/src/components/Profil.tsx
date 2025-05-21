import { useState, useEffect } from 'react';
import { useUserDetection } from '../hooks/userUserDetection';
import Header from './Header';

// Helper function to check localStorage for user ID directly
const getUserIdFromStorage = (): number | null => {
  const userIdFromStorage = localStorage.getItem('userId');
  if (userIdFromStorage) {
    return parseInt(userIdFromStorage, 10);
  }
  
  // Try to get user ID from token as fallback
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.id || null;
    }
  } catch (error) {
    console.error('Error parsing token:', error);
  }
  
  return null;
};

// Define types for our profile data
type StudentProfile = {
  id: number;
  first_name: string;
  last_name: string;
  university: string;
  linkedin_url: string;
  starting_date: string;
  ending_date: string;
  profil_picture: string;
  birth_date: string;
  user: {
    id: number;
    email: string;
    is_admin: boolean;
  };
  languages: Array<{
    id: number;
    language: string;
    languageSpoken: {
      language: string;
    };
  }>;
  sectorPreferences: Array<{
    sector_preference: string;
    id: number;
    sectorPreference: {
      sector_preference: string;
    };
  }>;
};

type EnterpriseProfile = {
  id: number;
  company_name: string;
  siret: string;
  description: string;
  secteur: string;
  is_validated: boolean;
  user: {
    id: number;
    email: string;
    is_admin: boolean;
  };
};

function Profile() {
  const { userType, userId: detectedUserId } = useUserDetection();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<StudentProfile | EnterpriseProfile | null>(null);
  
  // Get userId from multiple possible sources
  const userId = detectedUserId || getUserIdFromStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      // Check if we have a valid userId from any source
      if (!userId) {
        console.error("User ID not detected in useUserDetection or localStorage");
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      console.log(`Fetching profile for ${userType} with ID: ${userId}`);
      
      try {
        const endpoint = userType === 'student' 
          ? `http://localhost:3000/student-portal/${userId}`
          : `http://localhost:3000/enterprise-portal/${userId}`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching profile: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, userType]);

  // Format date to display in a user-friendly format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Render no profile data state
  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="font-bold text-lg mb-2">Profile Not Found</h3>
          <p>We couldn't find your profile information. Please try logging in again.</p>
        </div>
      </div>
    );
  }

  // Render student profile
  if (userType === 'student') {
    const studentData = profileData as StudentProfile;
    
    return (<>
      <Header/>
      <div className="student-profile mx-auto px-4 py-6 max-w-4xl">
        
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Student Profile</h1>
        
        {/* Profile Header - Mobile & Desktop */}
        <div className="profile-header flex flex-col sm:flex-row items-center mb-6 bg-white p-4 rounded-lg shadow">
          {studentData.profil_picture && (
            <img 
              src={studentData.profil_picture} 
              alt={`${studentData.first_name} ${studentData.last_name}`} 
              className="profile-picture w-24 h-24 rounded-full mb-3 sm:mb-0 sm:mr-4"
            />
          )}
          <div className="profile-name text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">{studentData.first_name} {studentData.last_name}</h2>
            <p className="text-gray-600">{studentData.university}</p>
          </div>
        </div>
        
        {/* Profile Details - Mobile & Desktop */}
        <div className="profile-details grid grid-cols-1 gap-4 sm:gap-6">
          {/* Contact Information */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h3>
            <p className="my-2 text-sm sm:text-base"><strong>Email:</strong> {studentData.user.email || 'No email provided'}</p>
            {studentData.linkedin_url && (
              <p className="my-2 text-sm sm:text-base overflow-hidden text-ellipsis">
                <strong>LinkedIn:</strong> 
                <a href={studentData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1 block sm:inline-block">
                  {studentData.linkedin_url}
                </a>
              </p>
            )}
          </div>
          
          {/* Education Period */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Availability Period
            </h3>
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <p className="my-2 text-sm sm:text-base"><strong>From:</strong> {formatDate(studentData.starting_date)}</p>
              <p className="my-2 text-sm sm:text-base"><strong>To:</strong> {formatDate(studentData.ending_date)}</p>
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>
            <p className="my-2 text-sm sm:text-base"><strong>Birth Date:</strong> {formatDate(studentData.birth_date)}</p>
          </div>
          
          {/* Languages */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {studentData.languages && studentData.languages.length > 0 ? (
                studentData.languages.map((item, index) => (
                  <span 
                    key={`lang-${index}`} 
                    className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded-full"
                  >
                    {item.language || item.languageSpoken?.language || 'Unknown language'}
                  </span>
                ))
              ) : (
                <p className="text-sm sm:text-base text-gray-500">No languages specified</p>
              )}
            </div>
          </div>
          
          {/* Sector Preferences */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Sector Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {studentData.sectorPreferences && studentData.sectorPreferences.length > 0 ? (
                studentData.sectorPreferences.map((item, index) => (
                  <span 
                    key={`sector-${index}`} 
                    className="bg-green-100 text-green-800 text-xs sm:text-sm px-2 py-1 rounded-full"
                  >
                    {item.sector_preference || item.sectorPreference?.sector_preference || 'Unknown sector'}
                  </span>
                ))
              ) : (
                <p className="text-sm sm:text-base text-gray-500">No sector preferences specified</p>
              )}
            </div>
          </div>
        </div>
      </div></>
    );
  }
  
  // Render enterprise profile
  else {
    const enterpriseData = profileData as EnterpriseProfile;
    return (
      <div className="enterprise-profile mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Enterprise Profile</h1>
        
        {/* Profile Header - Mobile & Desktop */}
        <div className="profile-header mb-6 bg-white p-4 rounded-lg shadow text-center sm:text-left">
          <div className="profile-name">
            <h2 className="text-lg sm:text-xl font-semibold">{enterpriseData.company_name}</h2>
            <p className="text-gray-600">Sector: {enterpriseData.secteur}</p>
          </div>
        </div>
        
        {/* Profile Details - Mobile & Desktop */}
        <div className="profile-details grid grid-cols-1 gap-4 sm:gap-6">
          {/* Business Information */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Business Information
            </h3>
            <p className="my-2 text-sm sm:text-base"><strong>SIRET:</strong> {enterpriseData.siret}</p>
            <p className="my-2 text-sm sm:text-base"><strong>Email:</strong> {enterpriseData.user?.email || 'No email provided'}</p>
          </div>
          
          {/* Description */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description
            </h3>
            <p className="my-2 text-sm sm:text-base">{enterpriseData.description || 'No description provided'}</p>
          </div>
          
          {/* Status */}
          <div className="detail-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-md sm:text-lg font-medium mb-2 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Status
            </h3>
            <p className={`my-2 text-sm sm:text-base py-1 px-3 rounded-full inline-flex items-center ${enterpriseData.is_validated ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
              {enterpriseData.is_validated 
                ? "✅ Account Validated" 
                : "⚠️ Account Pending Validation"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
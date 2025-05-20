import { useState, useEffect } from 'react';
import Profile from '../components/Profil';

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/login';
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Profile />
      </div>
    </div>
  );
}

export default ProfilePage;
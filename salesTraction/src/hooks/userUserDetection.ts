import { useState, useEffect } from 'react';
import { UserType } from '../types/types_marketplace';

export function useUserDetection() {
  const [userType, setUserType] = useState<UserType>();
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    // Auto-detect user type and ID from localStorage
    const detectUserFromToken = () => {
      try {
        const token = localStorage.getItem('token');
        const userTypeFromStorage = localStorage.getItem('userType'); // 'student' or 'startup'
        console.log('type:',userTypeFromStorage);
        const userIdFromStorage = localStorage.getItem('userId');
        
        if (userTypeFromStorage && userIdFromStorage) {
          // Use localStorage values
          setUserType(userTypeFromStorage as UserType);
          setUserId(parseInt(userIdFromStorage, 10));
        } else if (token) {
          // If we have a token but no explicit userType, try to decode it
          // This assumes you store the user type in the JWT payload
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserType(payload.userType || 'student');
          setUserId(payload.userId || payload.id || 0);
        }
      } catch (error) {
        console.error('Error detecting user from token:', error);
        // Fallback to student if detection fails
        setUserType('student');
      }
    };

    detectUserFromToken();
  }, []);

  return { userType, userId };
}
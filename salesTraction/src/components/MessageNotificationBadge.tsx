import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserDetection } from '../hooks/userUserDetection';
import { getUnreadMessageCount } from '../services/api_service_message';
import { useTranslation } from 'react-i18next';

interface MessageNotificationBadgeProps {
  className?: string;
}

const MessageNotificationBadge: React.FC<MessageNotificationBadgeProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { userId, userType } = useUserDetection();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!userId) return;
      
      try {
        const count = await getUnreadMessageCount(userId);
        setUnreadCount(count);
      } catch (error) {
        console.error(t('errors.ERRORFetchUnread'), error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUnreadCount();
    
    // Set up polling for updates
    const intervalId = setInterval(fetchUnreadCount, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [userId]);
  
  if (isLoading || !userId) {
    return null;
  }
  
  return (
    <Link to="/matches" className={`message-notification ${className}`}>
      <div className="message-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>
    </Link>
  );
};

export default MessageNotificationBadge;
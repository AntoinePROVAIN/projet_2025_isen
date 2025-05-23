
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserDetection } from '../hooks/userUserDetection';
import { Match, Student, Startup } from '../types/types_marketplace';
import '../assets/css/messagerie.css';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';

interface MatchWithDetails extends Match {
  student: Student;
  startup: Startup;
  lastMessage?: {
    id: number;
    text?: string;
    message_text?: string; // Add this field to match backend response
    sent_at?: string;
    date_envoie?: string; // Add this field to match backend response
    is_read: boolean;
  };
  unreadCount: number;
  messages?: Array<{
    id: number;
    message_text: string;
    is_read: boolean;
    date_envoie: string;
  }>;
}

const API_URL = 'http://localhost:3000';

function MatchesListPage() {
  const { t } = useTranslation();
  const { userType, userId } = useUserDetection();
  const [matches, setMatches] = useState<MatchWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMatches = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        
        // Fetch all matches for this user
        const matchesResponse = await fetch(`${API_URL}/matches/${userType}/${userId}`);
        
        if (!matchesResponse.ok) {
          throw new Error(t('matches.failedToFetch'));
        }
        
        const matchesData = await matchesResponse.json();
        console.log('Raw matches data:', matchesData);
        
        // Process matches based on the actual API response structure
        const enhancedMatches = matchesData.map((match: any) => {
          // Extract the last message directly from the messages array in the response
          const lastMessage = match.messages && match.messages.length > 0 
            ? {
                id: match.messages[0].id,
                message_text: match.messages[0].message_text,
                date_envoie: match.messages[0].date_envoie,
                is_read: match.messages[0].is_read
              }
            : null;
          
          // Count unread messages
          const unreadCount = match.messages 
            ? match.messages.filter((msg: any) => 
                !msg.is_read && 
                ((userType === 'student' && msg.sender_type === 'startup') || 
                 (userType === 'startup' && msg.sender_type === 'student'))
              ).length
            : 0;
          
          return {
            ...match,
            lastMessage,
            unreadCount
          };
        });
        
        // Sort matches by last message date (newest first)
        enhancedMatches.sort((a: MatchWithDetails, b: MatchWithDetails) => {
          const dateA = a.lastMessage?.date_envoie 
            ? new Date(a.lastMessage.date_envoie).getTime() 
            : new Date(a.date_match).getTime();
          const dateB = b.lastMessage?.date_envoie 
            ? new Date(b.lastMessage.date_envoie).getTime() 
            : new Date(b.date_match).getTime();
          return dateB - dateA;
        });
        
        console.log('Enhanced matches:', enhancedMatches);
        setMatches(enhancedMatches);
        setError(null);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError(t('matches.errorMessage'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMatches();
    
    // Refresh the matches periodically
    const intervalId = setInterval(fetchMatches, 30000); // Every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [userId, userType]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return '';
      }
      
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        // Today - show time
        return new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(date);
      } else if (diffDays < 7) {
        // Within last week - show day name
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
        }).format(date);
      } else {
        // Older - show date
        return new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
        }).format(date);
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  
  const truncateText = (text: string, maxLength: number = 40) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  if (isLoading) {
    return (
        <><Header />
      <div className="matches-list-container loading">
        <div className="loading-spinner">
          <p>{t('matches.loading')}</p>
        </div>
      </div></>
    );
  }
  
  if (error) {
    return (
        <><Header />
      <div className="matches-list-container error">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>{t('matches.tryAgain')}</button>
        </div>
      </div></>
    );
  }
  
  if (matches.length === 0) {
    return (
        <><Header />
      <div className="matches-list-container empty">
        <div className="no-matches">
          <h2>{t('matches.noMatchesTitle')}</h2>
          <p>{t('matches.noMatchesDescription')}</p>
          <Link to="/marketplace" className="marketplace-link">
            {t('matches.goToMarketplace')}
          </Link>
        </div>
      </div></>
    );
  }
  
  return (<>
    <Header/>
    <div className="matches-list-container">
      <h1>{t('matches.title')}</h1>
      <div className="matches-list">
        {matches.map((match) => {
          // Determine who the other party is based on user type
          const otherParty = userType === 'student' ? match.startup : match.student;
          const name = userType === 'student' 
            ? match.startup.company_name 
            : `${match.student.first_name} ${match.student.last_name}`;
          const image = userType === 'student'
            ? match.startup.company_name || '/api/placeholder/60/60' // Adjust if needed
            : match.student.profil_picture || '/api/placeholder/60/60';
          
          // Handle different date fields from backend
          const lastMessageDate = match.lastMessage
            ? formatDate(match.lastMessage.date_envoie || match.lastMessage.sent_at || '')
            : formatDate(match.date_match);
          
          // Handle different message text fields from backend
          const messagePreview = match.lastMessage
            ? truncateText(match.lastMessage.message_text || match.lastMessage.text || '')
            : t('matches.noMessagesYet');
          
          return (
            <Link 
              to={`/messages/${match.id}`} 
              key={match.id}
              className={`match-item ${match.unreadCount > 0 ? 'unread' : ''}`}
              onClick={() => localStorage.setItem("matchId", match.id.toString())}
            >
              <div className="match-avatar">
                <img 
                  src={image} 
                  alt={name}
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/60/60';
                  }}
                />
                {match.unreadCount > 0 && (
                  <span className="unread-badge">{match.unreadCount}</span>
                )}
              </div>
              <div className="match-details">
                <div className="match-header">
                  <h3>{name}</h3>
                  <span className="match-time">{lastMessageDate}</span>
                </div>
                <p className="match-preview">{messagePreview}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/marketplace" className="marketplace-link">
        {t('matches.backToMarketplace')}
      </Link>
    </div>
    </>
  );
}

export default MatchesListPage;
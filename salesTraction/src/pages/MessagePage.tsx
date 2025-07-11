import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserDetection } from '../hooks/userUserDetection';
import { Match, Student, Startup } from '../types/types_marketplace';
import '../assets/css/messagerie.css';
import Header from '../components/Header';

interface Message {
  id: number;
  message_text: string;
  sent_at?: string;
  date_envoie?: string;
  is_read: boolean;
  match_id: number;
  sender_id: number;
  sender_type: 'student' | 'startup';
  sender: {
    id: number;
    email: string;
  };
  receiver: {
    id: number;
    email: string;
  };
}

interface MatchWithUsers extends Match {
  student: Student;
  startup: Startup;
}

const API_URL = 'http://localhost:3000';

function MessagePage() {
  const matchId = localStorage.getItem("matchId");
  const { userType, userId } = useUserDetection();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [match, setMatch] = useState<MatchWithUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Debug logging
  useEffect(() => {
    console.log('Current user info:', { userType, userId });
    console.log('Messages:', messages);
  }, [userType, userId, messages]);
  
  // Fetch match details
  useEffect(() => {
    const fetchMatchDetails = async () => {
      if (!matchId) return;
      
      try {
        console.log('Fetching match details for match ID:', matchId);
        const response = await fetch(`${API_URL}/matches/${matchId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch match details');
        }
        
        const matchData = await response.json();
        console.log('Match data received:', matchData);
        setMatch(matchData);
      } catch (err) {
        console.error('Error fetching match details:', err);
        setError('Could not load match details. Please try again later.');
      }
    };
    
    fetchMatchDetails();
  }, [matchId]);
  
  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!matchId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/messages/match/${matchId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        
        const messagesData = await response.json();
        console.log('Messages data received:', messagesData);
        setMessages(messagesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Could not load messages. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
    
    // Set up polling for new messages
    const intervalId = setInterval(fetchMessages, 10000); // Poll every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [matchId]);
  
  // Mark unread messages as read
  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!matchId || !userId || messages.length === 0) return;
      
      // Find messages that are unread and not sent by the current user
      const unreadMessages = messages.filter(
        msg => !msg.is_read && msg.sender_id !== userId
      );
      
      if (unreadMessages.length === 0) return;
      
      try {
        // Mark each unread message as read
        for (const message of unreadMessages) {
          await fetch(`${API_URL}/messages/${message.id}/read`, {
            method: 'PATCH'
          });
        }
        
        // Update local state to reflect read status
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            unreadMessages.some(unread => unread.id === msg.id)
              ? { ...msg, is_read: true }
              : msg
          )
        );
      } catch (err) {
        console.error('Error marking messages as read:', err);
      }
    };
    
    markMessagesAsRead();
  }, [messages, matchId, userId]);
  
  // Scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !matchId || !userId) return;
    
    try {
      console.log('Sending message with data:', {
        message_text: newMessage.trim(),
        match_id: parseInt(matchId),
        sender_id: userId,
      });

      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_text: newMessage.trim(),
          match_id: parseInt(matchId),
          sender_id: userId,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Send message error response:', errorText);
        throw new Error(`Failed to send message: ${response.status} - ${errorText}`);
      }
      
      // Get the new message from response
      const sentMessage = await response.json();
      console.log('Message sent successfully:', sentMessage);
      
      // Update messages state with the new message
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      
      // Clear input field
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      if (err instanceof Error) {
        alert(`Failed to send message: ${err.message}`);
      } else {
        alert('Failed to send message: An unknown error occurred.');
      }
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) {
      console.log('No date provided to formatDate');
      return '';
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return '';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const getOtherPartyName = () => {
    if (!match) return 'Chat';
    
    return userType === 'student' 
      ? match.startup?.company_name || 'Company'
      : `${match.student?.first_name} ${match.student?.last_name}`;
  };
  
  const getOtherPartyImage = () => {
    if (!match) return '/api/placeholder/50/50';
    
    return userType === 'student'
      ? match.startup?.company_name || '/api/placeholder/50/50'
      : match.student?.profil_picture || '/api/placeholder/50/50';
  };

  // Function to determine if message was sent by current user
  const isMessageFromCurrentUser = (message: Message) => {
    const isFromCurrentUser = message.sender_id === userId;
    console.log(`Message ${message.id}: sender_id=${message.sender_id}, sender_=${message.sender_type}, userId=${userId}, isFromCurrentUser=${isFromCurrentUser}`);
    return isFromCurrentUser;
  };

  // Function to get message sender name for display
  const getMessageSenderName = (message: Message) => {
    if (!match) return 'Unknown';
    
    if (message.sender_type === 'student') {
      return `${match.student?.first_name} ${match.student?.last_name}`;
    } else {
      return match.startup?.company_name || 'Company';
    }
  };

  if (isLoading && !messages.length) {
    return (
        <><Header />
      <div className="messaging-container loading">
        <div className="loading-spinner">
          <p>Loading messages...</p>
        </div>
      </div></>
    );
  }

  if (error && !messages.length) {
    return (
        <><Header />
      <div className="messaging-container error">
        <div className="error-message">
          <p>{error}</p>
          <button className="button" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div></>
    );
  }

  return (
    <><Header />
    <div className="messaging-container">
      <div className="message-header">
        <button className="back-button button" onClick={() => navigate('/matches')}>
          &larr; Back to Matches
        </button>
        <div className="chat-with">
          <img 
            src={getOtherPartyImage()} 
            alt={getOtherPartyName()}
            className="chat-avatar"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/50/50';
            }}
          />
          <h2>{getOtherPartyName()}</h2>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isFromCurrentUser = isMessageFromCurrentUser(message);
            const senderName = getMessageSenderName(message);
            
            return (
              <div 
                key={message.id}
                className={`message ${isFromCurrentUser ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  {/* Sender name is now hidden by CSS, but keeping this for debugging */}
                  {!isFromCurrentUser && (
                    <div className="message-sender-name">{senderName}</div>
                  )}
                  <p>{message.message_text}</p>
                  <span className="message-time">
                    {formatDate(message.date_envoie || message.sent_at)}
                    {isFromCurrentUser && (
                      <span className={`read-status ${message.is_read ? 'read' : 'unread'}`}>
                        {message.is_read ? ' ✓✓' : ' ✓'}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
        />
        <button 
          type="submit" 
          className="send-button button"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </form>
    </div></>
  );
}

export default MessagePage;
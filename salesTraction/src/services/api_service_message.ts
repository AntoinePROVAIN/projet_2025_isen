import { Match, Student, Startup } from '../types/types_marketplace';

const API_URL = 'http://localhost:3000';

// Message type definition
export interface Message {
  id: number;
  text: string;
  sent_at: string;
  is_read: boolean;
  match_id: number;
  sender_id: number;
  sender_type: 'student' | 'startup';
}

// Interface for creating a new message
export interface CreateMessageDto {
  text: string;
  match_id: number;
  sender_id: number;
  sender_type: 'student' | 'startup'; 
}

// Get all messages for a specific match
export const getMatchMessages = async (matchId: number): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_URL}/messages/match/${matchId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching match messages:', error);
    throw error;
  }
};

// Get a specific message by ID
export const getMessage = async (messageId: number): Promise<Message> => {
  try {
    const response = await fetch(`${API_URL}/messages/${messageId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch message: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};

// Send a new message
export const sendMessage = async (createMessageDto: CreateMessageDto): Promise<Message> => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createMessageDto),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Mark a message as read
export const markMessageAsRead = async (messageId: number): Promise<Message> => {
  try {
    const response = await fetch(`${API_URL}/messages/${messageId}/read`, {
      method: 'PATCH',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to mark message as read: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

// Get count of unread messages for a user
export const getUnreadMessageCount = async (userId: number): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/messages/unread/count/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch unread count: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching unread message count:', error);
    throw error;
  }
};

// Create the initial system message for a match
// export const createInitialMessage = async (matchId: number): Promise<Message> => {
//   try {
//     const response = await fetch(`${API_URL}/messages/match/${matchId}/initial`, {
//       method: 'POST',
//     });
    
//     if (!response.ok) {
//       throw new Error(`Failed to create initial message: ${response.status}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error creating initial message:', error);
//     throw error;
//   }
// };

// Get all matches for a user with latest message
export const getUserMatches = async (userId: number, userType: 'student' | 'startup'): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_URL}/matches/user/${userId}?type=${userType}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user matches: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user matches:', error);
    throw error;
  }
};
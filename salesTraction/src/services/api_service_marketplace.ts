import { Match } from '../types/types_marketplace';

const API_URL = 'http://localhost:3000';


export const checkForMatch = async (studentId: number, startupId: number): Promise<Match | null> => {
  try {
    console.log(`Checking for match between student ${studentId} and startup ${startupId}`);
    const response = await fetch(`http://localhost:3000/matches/check/${studentId}/${startupId}`);
    
    console.log('Match check response status:', response.status);
    
    // Check if response is ok and has content
    if (response.ok) {
      // First check content type to ensure it's JSON
      const contentType = response.headers.get('content-type');
      console.log('Match check content type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        // Get text first to check if empty
        const text = await response.text();
        console.log('Match check response text:', text.substring(0, 100) + '...');
        
        // Only try to parse if there's content
        if (text && text.trim().length > 0) {
          const match = JSON.parse(text);
          console.log('Match found:', match);
          localStorage.setItem("matchId", (match as any).id);
          return match;
        }
      }
    }
    console.log('No match found');
    return null;
  } catch (error) {
    console.error('Error checking for match:', error);
    return null;
  }
};

export const submitEnterpriseLike = async (studentId: number, startupId: number): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3000/likes/startup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: studentId,
        id_startup: startupId,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error submitting enterprise like:', error);
    return false;
  }
};

export const submitStudentLike = async (
  offerId: number,
  studentId: number,
  motivationText: string
): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3000/likes/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: offerId,
        id_student: studentId,
        motivation_text: motivationText,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error submitting student like:', error);
    return false;
  }
};

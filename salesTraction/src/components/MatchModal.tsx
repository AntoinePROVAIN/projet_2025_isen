import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Offer, Student, UserType } from '../types/types_marketplace';
import { useTranslation } from 'react-i18next';

interface MatchModalProps {
  matchedItem: Offer | Student | null;
  userType: UserType;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({
  matchedItem,
  userType,
  onClose
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  if (!matchedItem) return null;
  
  // Handle sending the first message and navigating to the chat
  const handleSendMessage = async () => {
    if (!matchedItem) return;
    
    try {
      // Get the match ID from the matchedItem
      //const matchId = (matchedItem as any).id
      const matchId = localStorage.getItem("matchId");

      if (matchId) {
        // Create initial system message
        
        // Navigate to the message page
        navigate(`/messages/${matchId}`);
      } else {
        console.error(t('errors.ERRORMatchIdNotFound'));
      }
    } catch (error) {
      console.error(t('errors.ERRORStartConv'), error);
    }
  };
  
  return (
    <div className="match-modal-overlay">
      <div className="match-modal">
        <div className="match-celebration">
          <h2>🎉 {t('matches.ItMatch')} 🎉</h2>
          <div className="match-content">
            {userType === 'student' ? (
              <>
                <img 
                  src={(matchedItem as Offer).product_image}
                  alt={(matchedItem as Offer).title}
                  className="match-image"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/150/150';
                  }}
                />
                <h3>{(matchedItem as Offer).title}</h3>
                <p>{t('matches.studentMatchOffer')}</p>
              </>
            ) : (
              <>
                <img 
                  src={(matchedItem as Student).profil_picture}
                  alt={`${(matchedItem as Student).first_name} ${(matchedItem as Student).last_name}`}
                  className="match-image"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/150/150';
                  }}
                />
                <h3>{(matchedItem as Student).first_name} {(matchedItem as Student).last_name}</h3>
                <p>{t('matches.startupMatchStudent')}</p>
              </>
            )}
          </div>
          <div className="match-actions">
            <button onClick={onClose} className="continue-button">
              {t('matches.continueSwipping')}
            </button>
            <button 
              onClick={handleSendMessage}
              className="message-button"
            >
              {t('matches.sendMessage')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
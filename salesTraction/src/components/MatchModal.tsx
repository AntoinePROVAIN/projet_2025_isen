import React from 'react';
import { Offer, Student, UserType } from '../types/types_marketplace';

interface MatchModalProps {
  matchedItem: Offer | Student | null;
  userType: UserType;
  onClose: () => void;
  onSendMessage: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({
  matchedItem,
  userType,
  onClose,
  onSendMessage
}) => {
  if (!matchedItem) return null;
  
  return (
    <div className="match-modal-overlay">
      <div className="match-modal">
        <div className="match-celebration">
          <h2>🎉 It's a Match! 🎉</h2>
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
                <p>You and this offer liked each other!</p>
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
                <p>You and this student liked each other!</p>
              </>
            )}
          </div>
          <div className="match-actions">
            <button onClick={onClose} className="continue-button">
              Continue Swiping
            </button>
            <button 
              onClick={onSendMessage}
              className="message-button"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
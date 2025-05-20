import React from 'react';
import { Offer } from '../types/types_marketplace';

interface MotivationModalProps {
  offer: Offer;
  motivation: string;
  setMotivation: (text: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const MotivationModal: React.FC<MotivationModalProps> = ({
  offer,
  motivation,
  setMotivation,
  onCancel,
  onSubmit,
  isSubmitting
}) => {
  return (
    <div className="motivation-modal-overlay">
      <div className="motivation-modal">
        <div className="modal-header">
          <h3>Why are you interested in this offer?</h3>
          <p>Write a motivation speech to show your interest!</p>
        </div>
        
        <div className="modal-body">
          <div className="preview">
            {offer && (
              <>
                <img 
                  src={offer.product_image} 
                  alt={offer.title}
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/80/80';
                  }}
                />
                <h4>{offer.title}</h4>
              </>
            )}
          </div>
          
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Explain why you're interested in this opportunity, what skills you bring, and how you can contribute..."
            className="motivation-textarea"
            rows={6}
            maxLength={500}
            autoFocus
          />
          
          <div className="character-count">
            <span className={motivation.length > 450 ? 'near-limit' : ''}>
              {motivation.length}/500 characters
            </span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            onClick={onCancel}
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            className="submit-button"
            disabled={!motivation.trim() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Like'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationModal;
import React from 'react';
import { Offer } from '../types/types_marketplace';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

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
  const {t, i18n} = useTranslation();
  return (
    <div className="motivation-modal-overlay">
      <div className="motivation-modal">
        <div className="modal-header">
          <h3>{t('interestedInOffer')}</h3>
          <p>{t('showInterest')}</p>
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
            placeholder={t('showInterestPlaceholder')}
            className="motivation-textarea"
            rows={6}
            maxLength={500}
            autoFocus
          />
          
          <div className="character-count">
            <span className={motivation.length > 450 ? 'near-limit' : ''}>
              {motivation.length}/500 {t('characters')}
            </span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            onClick={onCancel}
            className="cancel-button"
            disabled={isSubmitting}
          >
            {t('Cancel')}
          </button>
          <button 
            onClick={onSubmit}
            className="submit-button"
            disabled={!motivation.trim() || isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('submitedLike')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationModal;
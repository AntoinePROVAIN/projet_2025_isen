import React from 'react';
import { Offer } from '../types/types_marketplace';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <>
      <img 
        src={offer.product_image} 
        alt={offer.title} 
        className="offer-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/api/placeholder/400/250';
        }}
      />
      <div className="card-content">
        <h2>{offer.title}</h2>
        <p className="offer-description">{offer.description}</p>
        <div className="swipe-hint">
          <span className="hint-left">👈 Skip</span>
          <span className="hint-right">Like 👉</span>
        </div>
      </div>
    </>
  );
};

export default OfferCard;
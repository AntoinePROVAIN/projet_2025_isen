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
      {/* <div className="offer-card"> */}
      {/* <div className="card-content">
        <h2>{offer.title}</h2>
        <p className="offer-description">{offer.description}</p>
        <p className="offer-description">Prix de vente: {offer.price}</p>
        <p className="offer-description">Commission: {offer.commission}</p>
        <p className="offer-description">Région: {offer.region}</p>
        <p className="offer-description">Comment: {offer.remote_or_physical ? 'Distanciel' : 'Présentiel'}</p>
        <p className="offer-description">Nom de l'entreprise: {offer.startup?.company_name}</p>
        <div className="swipe-hint">
          <span className="hint-left">👈 Skip</span>
          <span className="hint-right">Like 👉</span>
        </div>
      </div> */}
      <div className="p-4 card-content">
        <div className=''>
          <h2 className="italic text-xl font-semibold mb-2">{offer.title}</h2>
          {offer.startup && (
            <div className="mt-3 pt-3 border-white-200">
              <p className=" text-xl">{offer.startup.company_name || 'Entreprise'}</p>
            </div>
          )}
        </div>
        <p className="text-white-600 mb-3 line-clamp-3">{offer.description}</p>
        <div className="flex border-t justify-between items-center mb-2">
          <span className="font-bold text-lg">{offer.price} €</span>
          <span className="text-sm text-white-500">
            Commission: {offer.commission} €
          </span>
        </div>
        <div className="text-sm text-white-500 mb-2">
          <span className="mr-2">{offer.region}</span>
          <span>{offer.remote_or_physical ? 'Distanciel' : 'Présentiel'}</span>
        </div>
        {/* {offer.startup && (
          <div className="mt-3 pt-3 border-white-200">
            <p className="font-medium">{offer.startup.company_name || 'Entreprise'}</p>
          </div>
        )} */}
        <div className="swipe-hint">
          <span className="hint-left">👈 Skip</span>
          <span className="hint-right">Like 👉</span>
        </div>
      </div>
    </>
  );
};

export default OfferCard;
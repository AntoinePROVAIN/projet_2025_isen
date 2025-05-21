// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useTranslation } from "react-i18next";
// import Button from '../components/Bouton'
// import Header from '../components/Header'
// import "../assets/css/LandingPage.css";
// import { getUserOffer } from '../services/api_service_offer';

// function Offers() {
//     const { t, i18n } = useTranslation();
//     const nav = useNavigate();

//     const [token, setToken] = useState("");
//     const [userId, setUserId] = useState("");
//     const [userType, setUserType] = useState("");
//     useEffect(() => {
//         const localToken = localStorage.getItem("token");
//         if(localToken) setToken(localToken);
        
//         const localUserId = localStorage.getItem("userId");
//         if (localUserId) setUserId(localUserId);

//         const localUserType = localStorage.getItem('userType');
//         if (localUserType) setUserType(localUserType);
        
//     }, [])

//     const offers[] = await getUserOffer(parseInt(userId));


//   return (
//     <>
//       <Header />

//       </>
//   )
// }

// export default Offers


import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Like, Offer } from '../types/types_marketplace';
import OfferService from '../services/api_service_offer';
import Header from '../components/Header';
import LikeService from '../services/api_service_like';
import Button from '../components/Bouton';

const OffersList = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    const { t, i18n } = useTranslation();
    const nav = useNavigate();

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState("");
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if(localToken) setToken(localToken);
        
        const localUserId = localStorage.getItem("userId");
        if (localUserId) setUserId(localUserId);

        const localUserType = localStorage.getItem('userType');
        if (localUserType) setUserType(localUserType);
        
    }, [])

  useEffect(() => {
    
    switch(userType){
        case "student":
            const fetchLikedOffers = async () => {
                try {
                  setLoading(true);
                  const data = await LikeService.getStudentLikes(parseInt(userId));
                  setLikes(data);
                  setError(null);
                } catch (err) {
                  setError('Erreur lors du chargement des offres. Veuillez réessayer plus tard.');
                  console.error(err);
                } finally {
                  setLoading(false);
                }
            };
            fetchLikedOffers();

            break;
        case "startup":
          console.log(userType);
          console.log(userId);
            const fetchMyOffers = async () => {
                try {
                  setLoading(true);
                  const data = await OfferService.getAllOffersByStartup(parseInt(userId));
                  console.log(data)
                  setOffers(data);
                  setError(null);
                } catch (err) {
                  setError('Erreur lors du chargement des offres. Veuillez réessayer plus tard.');
                  console.error(err);
                } finally {
                  setLoading(false);
                }
            };
            fetchMyOffers();

            break;
        default:
            setError('Erreur lors du chargement des offres. Veuillez réessayer plus tard.');
            console.error("Le type de compte n'est pas reconnu : "+userType);
            setLoading(false);
            break;
    }
    
  }, [userId,userType]);


  if (loading) {
    return <><Header/><div className="text-center py-8">Chargement des offres...</div></>;
  }

  if (error) {
    return <><Header/><div className="text-red-500 text-center py-8">{error}</div></>;
  }

  if (offers.length === 0 && likes.length === 0) {
    return <><Header/><div className="text-center py-8">Aucune offre disponible pour le moment.</div></>;
  }

  return ( <>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Liste des offres {offers.length > 0 ? "crées" : "likées" }</h1>
      {offers.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {offer.product_image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={offer.product_image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
              <p className="text-gray-600 mb-3 line-clamp-3">{offer.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{offer.price} €</span>
                <span className="text-sm text-gray-500">
                  Commission: {offer.commission} €
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <span className="mr-2">{offer.region}</span>
                <span>{offer.remote_or_physical ? 'Distanciel' : 'Présentiel'}</span>
              </div>
              {offer.startup && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="font-medium">{offer.startup.company_name || 'Entreprise'}</p>
                  <p className="text-sm text-gray-600 truncate">{offer.startup.secteur || ''}</p>
                </div>
              )}
              <div className="mt-4">
                <Button className='w-full'
                  children="Voir les détails" onClick={()=>nav(`/offers/${offer.id}`)}/>
              </div>
            </div>
          </div>
        ))}
      </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likes.map((like) => (
          <div 
            key={like.id} 
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {like.salesOffer?.product_image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={like.salesOffer.product_image} 
                  alt={like.salesOffer.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{like.salesOffer?.title}</h2>
              <p className="text-gray-600 mb-3 line-clamp-3">{like.salesOffer?.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{like.salesOffer?.price} €</span>
                <span className="text-sm text-gray-500">
                  Commission: {like.salesOffer?.commission} €
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <span className="mr-2">{like.salesOffer?.region}</span>
                <span>{like.salesOffer?.remote_or_physical ? 'Distanciel' : 'Présentiel'}</span>
              </div>
              {like.salesOffer?.startup && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="font-medium">{like.salesOffer.startup.company_name || 'Entreprise'}</p>
                  <p className="text-sm text-gray-600 truncate">{like.salesOffer.startup.secteur || ''}</p>
                </div>
              )}
              <div className="mt-4">
                 <Button className='w-full'
                  children="Voir les détails" onClick={()=>nav(`/offers/${like.salesOffer?.id}`)}/>
              </div>
            </div>
          </div>
        ))}</div>
      }
    </div>
    </>
  );
};

export default OffersList;

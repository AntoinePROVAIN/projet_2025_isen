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
import { LikeOffer, Offer } from '../types/types_marketplace';
import OfferService from '../services/api_service_offer';
import Header from '../components/Header';
import LikeService from '../services/api_service_like';
import Button from '../components/Bouton';
import { Heart } from 'lucide-react';
import { checkForMatch } from '../services/api_service_marketplace';

import OfferItem from '../components/OfferItem';
import LikeItem from '../components/LikeItem';

const OffersList = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [likes, setLikes] = useState<LikeOffer[]>([]);
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
      {userType == "startup" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
    
          <OfferItem offer={offer} userId={parseInt(userId)} />

        ))}
        <Button onClick={()=>nav('/create_offer')} children={"Créer de nouvelles offres"} />
      </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likes.map((like) => (
          <LikeItem like={like} userId={parseInt(userId)} />
        ))}</div>
      }
    </div>
    </>
  );
};

export default OffersList;

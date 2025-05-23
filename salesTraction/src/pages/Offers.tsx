import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { LikeOffer, Offer } from '../types/types_marketplace';
import OfferService from '../services/api_service_offer';
import Header from '../components/Header';
import LikeService from '../services/api_service_like';
import Button from '../components/Bouton';
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
                  setError(t('offers.loadingError'));
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
                  setError(t('offers.loadingError'));
                  console.error(err);
                } finally {
                  setLoading(false);
                }
            };
            fetchMyOffers();
            break;
        default:
            setError(t('offers.loadingError'));
            console.error(t('offers.accountTypeError')+userType);
            setLoading(false);
            break;
    } 
  }, [userId,userType]);

  if (loading) {
    return <><Header/><div className="text-center py-8">{t('offers.loading')}</div></>;
  }

  if (error) {
    return <><Header/><div className="text-red-500 text-center py-8">{error}</div></>;
  }

  if (offers.length === 0 && likes.length === 0) {
    return <><Header/><div className="text-center py-8">{t('offers.noOffersAvailable')}</div>{userType == "startup" ? <Button onClick={()=>nav('/create_offer')} children={t('offerCreation.pageTitle')}/>: ""}</>;
  }
  return ( <>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('offers.listTitle')} {offers.length > 0 ? t('offers.created') : t('offers.liked') }</h1>
      {userType == "startup" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
    
          <OfferItem offer={offer} userId={parseInt(userId)} />

        ))}
        <Button onClick={()=>nav('/create_offer')} children={t('offers.createNewOffers')} />
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

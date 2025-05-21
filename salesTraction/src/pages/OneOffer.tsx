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
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { ChevronRight, Check, X, MapPin, Globe } from 'lucide-react';
import { Like, Offer } from '../types/types_marketplace';
import OfferService from '../services/api_service_offer';
import Header from '../components/Header';
import LikeService from '../services/api_service_like';
import Button from '../components/Bouton';

const OneOffer = () => {
  const [offer, setOffer] = useState<Offer>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Récupère les paramètres de l'URL
  const { id_offer } = useParams();
  console.log(id_offer)
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
    console.log(userType);
    console.log(userId);
      const fetchOffer = async () => {
          try {
            setLoading(true);
            const data = await OfferService.getOfferById(parseInt(id_offer?id_offer:""));
            console.log(id_offer)
            setOffer(data);
            setError(null);
          } catch (err) {
            setError('Erreur lors du chargement des offres. Veuillez réessayer plus tard.');
            console.error(err);
          } finally {
            setLoading(false);
          }
      };
      fetchOffer();

   
    
    
  }, [userId,userType]);


  if (loading) {
    return <><Header/><div className="text-center py-8">Chargement des offres...</div></>;
  }

  if (error) {
    return <><Header/><div className="text-red-500 text-center py-8">{error}</div></>;
  }

  if (!offer) {
    return <><Header/><div className="text-center py-8">Offre non trouvée</div></>;
  }

  return ( <>
    <Header/>
    <div className="max-w-4xl mx-auto p-6">
        {/* Titre principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Détails de l'offre</h1>
      
        {/* Menu Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
            <a href="/offers" className="hover:text-blue-600 cursor-pointer">Offres</a>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-gray-800 font-medium">{offer.title}</span>
        </nav>
      
        {/* Contenu principal */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image du produit */}
            <div className="w-full h-64 overflow-hidden bg-gray-100">
                {offer.product_image ? (
                <img 
                  src={offer.product_image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">Aucune image disponible</span>
                </div>
                )}
            </div>
        
            {/* Informations de l'offre */}
            <div className="p-6">
                {/* En-tête avec titre et statut */}
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{offer.title}</h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        offer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {offer.is_active ? 'Active' : 'Inactive'}
                    </div>
                </div>
                
                {/* Détails de l'offre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Informations générales</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-500">Prix:</span>
                                <span className="ml-2 font-medium">{offer.price.toLocaleString('fr-FR')} €</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Commission:</span>
                                <span className="ml-2 font-medium">{offer.commission.toLocaleString('fr-FR')} €</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500">Mode:</span>
                                <span className="ml-2 font-medium flex items-center">
                                    {offer.remote_or_physical ? (
                                        <><Globe className="h-4 w-4 mr-1 text-blue-500" /> À distance</>
                                    ) : (
                                        <><MapPin className="h-4 w-4 mr-1 text-orange-500" /> Présentiel</>
                                    )}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">Région:</span>
                                <span className="ml-2 font-medium">{offer.region}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Cible:</span>
                                <span className="ml-2 font-medium">{offer.target_customer}</span>
                            </div>
                        </div>
                    </div>
                    {/* Informations sur la startup */}
                    {offer.startup && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Entreprise</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-500">Nom:</span>
                                <span className="ml-2 font-medium">{offer.startup.company_name || 'Non spécifié'}</span>
                            </div>
                        </div>
                    </div>)}
                </div>
                {/* Description détaillée */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Description</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                        {offer.description}
                    </p>
                </div>
            </div>
        </div>
    </div> 
             
    </>
  );
};

export default OneOffer;

import { Heart } from "lucide-react";
import { Like, Offer } from "../types/types_marketplace";
import Button from "./Bouton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkForMatch } from "../services/api_service_marketplace";
import { Match } from "../types/types_marketplace";

interface OfferProps {
  offer: Offer;
  userId: number;
}


const OfferItem: React.FC<OfferProps> = ({ offer, userId }) => {

    const { t, i18n } = useTranslation();
    const nav = useNavigate();

    // const [isMatch, setIsMatch] = useState<Match | null>(null);

    // useEffect(() => {
    //     const verifyMatch = async () => {
    //         try {
    //             const matchResult = await checkForMatch(userId, offer.startup?.id ?? 0);
    //             setIsMatch(matchResult);
    //         } catch (error) {
    //             console.error("Erreur lors de la vérification de la correspondance:", error);
                
    //         }
    //     }
    //     if (userId && offer.id) {
    //         verifyMatch();
    //     }
    // }, [userId, offer]) 

  return (
       <>
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
              <div className='flex flex-row justify-between'>
                <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
              </div>
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
          </div></>);

            }

            export default OfferItem;
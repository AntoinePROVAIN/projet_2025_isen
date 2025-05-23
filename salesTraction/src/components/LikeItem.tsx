import { Heart } from "lucide-react";
import { LikeOffer, Offer } from "../types/types_marketplace";
import Button from "./Bouton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkForMatch } from "../services/api_service_marketplace";
import { Match } from "../types/types_marketplace";

interface LikeProps {
  like: LikeOffer;
  userId: number;
}


const LikeItem: React.FC<LikeProps> = ({ like, userId }) => {

    const { t, i18n } = useTranslation();
    const nav = useNavigate();

    const [isMatch, setIsMatch] = useState<Match | null>(null);

    useEffect(() => {
        const verifyMatch = async () => {
            try {
                const matchResult = await checkForMatch(userId, like.salesOffer?.startup?.id ?? 0);
                setIsMatch(matchResult);
            } catch (error) {
                console.error(t('errors.ERRORCheckMatch'), error);
                
            }
        }
        if (userId && like.salesOffer?.id) {
            verifyMatch();
        }
    }, [userId, like]) 

  return (
       <>
          <div 
            key={like.salesOffer?.id} 
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {like.salesOffer?.product_image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={like.salesOffer?.product_image} 
                  alt={like.salesOffer?.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className='flex flex-row justify-between'>
                <h2 className="text-xl font-semibold mb-2">{like.salesOffer?.title}</h2>
                { isMatch ? <Heart 
                  size={24} 
                  className={`fill-red-500 text-red-500`} 
                /> : <></>}
              </div>
              <p className="text-gray-600 mb-3 line-clamp-3">{like.salesOffer?.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{like.salesOffer?.price} €</span>
                <span className="text-sm text-gray-500">
                  {t('offers.commission')}: {like.salesOffer?.commission} €
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <span className="mr-2">{like.salesOffer?.region}</span>
                <span>{like.salesOffer?.remote_or_physical ? t('offers.distance') : t('offers.physical')}</span>
              </div>
              {like.salesOffer?.startup && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="font-medium">{like.salesOffer?.startup.company_name || t('offers.company')}</p>
                  <p className="text-sm text-gray-600 truncate">{like.salesOffer?.startup.secteur || ''}</p>
                </div>
              )}
              <div className="mt-4">
                <Button className='w-full'
                  children={t('offers.seeDetails')} onClick={()=>nav(`/offers/${like.salesOffer?.id}`)}/>
              </div>
            </div>
          </div></>);

            }

            export default LikeItem;
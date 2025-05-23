import { Offer } from "../types/types_marketplace";
import Button from "./Bouton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


interface OfferProps {
  offer: Offer;
  userId: number;
}


const OfferItem: React.FC<OfferProps> = ({ offer, userId }) => {

    const { t, i18n } = useTranslation();
    const nav = useNavigate();

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
                  {t('offers.commission')}: {offer.commission} €
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <span className="mr-2">{offer.region}</span>
                <span>{offer.remote_or_physical ? t('offers.distance') : t('offers.physical')}</span>
              </div>
              {offer.startup && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="font-medium">{offer.startup.company_name || t('offers.company')}</p>
                  <p className="text-sm text-gray-600 truncate">{offer.startup.secteur || ''}</p>
                </div>
              )}
              <div className="mt-4">
                <Button className='w-full'
                  children={t('offers.offerDetails')} onClick={()=>nav(`/offers/${offer.id}`)}/>
              </div>
            </div>
          </div></>);

            }

            export default OfferItem;
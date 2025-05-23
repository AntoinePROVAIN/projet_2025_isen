import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { ChevronRight, MapPin, Globe } from 'lucide-react';
import { Offer, Student } from '../types/types_marketplace';
import OfferService from '../services/api_service_offer';
import Header from '../components/Header';
import LikeService from '../services/api_service_like';

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

    const [students, setStudents] = useState<Student[]>([]);

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
            setError(t('offers.loadingError'));
            console.error(err);
          } finally {
            setLoading(false);
          }
      };
      fetchOffer(); 
  }, [userId,userType]);

  useEffect(() =>{
    const fetchStudentLike = async () => {
        try{
          setLoading(true);
          const data = await LikeService.getOfferStudentMatch(parseInt(id_offer?id_offer:""));
          setStudents(data);
          setError(null);
        } catch (err) {
          setError(t('students.loadingError'));
          console.error(err);
        } finally {
          setLoading(false);
        }
    }


    fetchStudentLike();
  },[offer])



  if (loading) {
    return <><Header/><div className="text-center py-8">{t('offers.loading')}</div></>;
  }

  if (error) {
    return <><Header/><div className="text-red-500 text-center py-8">{error}</div></>;
  }

  if (!offer) {
    return <><Header/><div className="text-center py-8">{t('offers.noOffersFound')}</div></>;
  }

  return ( <>
    <Header/>
    <div className="max-w-4xl mx-auto p-6">
        {/* Titre principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('offers.offerDetails')}</h1>
      
        {/* Menu Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
            <a href="/offers" className="hover:text-blue-600 cursor-pointer">{t('offers.offer')}</a>
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
                  <span className="text-gray-400">{t('offers.noImage')}</span>
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
                        {offer.is_active ? t('offers.active') : t('offers.inactive')}
                    </div>
                </div>
                
                {/* Détails de l'offre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">{t('offers.generalInformation')}</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-500">{t('offers.price')}:</span>
                                <span className="ml-2 font-medium">{offer.price.toLocaleString('fr-FR')} €</span>
                            </div>
                            <div>
                                <span className="text-gray-500">{t('offers.commission')}:</span>
                                <span className="ml-2 font-medium">{offer.commission.toLocaleString('fr-FR')} €</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500">{t('offers.mode')}:</span>
                                <span className="ml-2 font-medium flex items-center">
                                    {offer.remote_or_physical ? (
                                        <><Globe className="h-4 w-4 mr-1 text-blue-500" /> {t('offers.distance')}</>
                                    ) : (
                                        <><MapPin className="h-4 w-4 mr-1 text-orange-500" /> {t('offers.physical')}</>
                                    )}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">{t('offers.region')}:</span>
                                <span className="ml-2 font-medium">{offer.region}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">{t('offers.target')}:</span>
                                <span className="ml-2 font-medium">{offer.target_customer}</span>
                            </div>
                        </div>
                    </div>
                    {/* Informations sur la startup */}
                    {offer.startup && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">{t('offers.company')}</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-500">{t('offers.name')}:</span>
                                <span className="ml-2 font-medium">{offer.startup.company_name || t('offers.unspecified')}</span>
                            </div>
                        </div>
                    </div>)}
                </div>
                {/* Description détaillée */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">{t('offers.description')}</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                        {offer.description}
                    </p>
                </div>
            </div>
        </div>
        {userType === "startup" ? (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-xl font-bold mb-6">{t('offers.studentMatch')}</h1>
          {/* Liste des étudiants */}
          {students.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
             {t('offers.noStudentFound')}
            </div>
          ) : (
            <div className="space-y-3">
              {students.map(student => (
                <div 
                  key={student?.id} 
                  className="grid grid-cols-12 gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Photo de profil */}
                  <div className="col-span-2 flex items-center justify-center">
                    {student?.profil_picture ? (
                      <img 
                        src={student?.profil_picture} 
                        alt={`${student?.first_name} ${student?.last_name}`}
                        className="w-16 h-16 rounded-full object-cover" 
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        {/* <User className="h-8 w-8 text-gray-400" /> */}
                      </div>
                    )}
                  </div>
                  
                  {/* Nom */}
                  <div className="col-span-5 flex items-center font-medium">
                    {student?.last_name}
                  </div>
                  
                  {/* Prénom */}
                  <div className="col-span-5 flex items-center">
                    {student?.first_name}
                  </div>
                </div>
              ))}
            </div>)}
          </div>): <></>}
    </div> 
             
    </>
  );
};

export default OneOffer;

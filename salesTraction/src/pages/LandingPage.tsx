import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import Button from '../components/Bouton'
import Header from '../components/Header'
import "../assets/css/LandingPage.css";

function LandingPage() {
    const { t, i18n } = useTranslation();
    const nav = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        }
    }, [location]);

  return (
    <>
      <Header />
      <div className=''>
        
        <h1 className='police my-12 text-3xl font-bold italic text-center'>{t('meetCommercial')}</h1>
        <div className='bg-black mr-4 ml-4 rounded h-80'>
            <img src="/start.jpg" className="w-full h-full object-cover" alt="image de présentation"/>
        </div>
        <h2 className='slogan text-xl text-gray-800 mb-4 mt-4 ml-4 mr-4 text-center'>{t('slogan')}</h2>
        <span className='my-10'></span>
        <div className="space-y-10 py-10 px-14 flex flex-col justify-center">
            <Button onClick={()=>nav("/connection/student")} children={t('student')} />
            <Button onClick={()=>nav("/connection/startup")} children={t('startup')} />
        </div>

        <div id='description_speech' className='justify-center py-16 px-5 bg-gray-200  shadow-lg border border-gray-200 rounded-2xl p-6 max-w-4xl mx-auto mt-10'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 text-center'>Déroulement</h2>
            <div className='presentation'>
              <img src="/etudiant.png" alt="marketplace_etudiant" />
              <img src="startup.png" alt="marketplace_startup" />
            </div>
              <img className="rounded" src="/match.png" alt="match" />
            <p className="slogan text-gray-600 text-lg mt-4 leading-relaxed text-center">
               {t('presentationSpeech')}</p>
        </div>
      </div>
      </>
  )
}

export default LandingPage



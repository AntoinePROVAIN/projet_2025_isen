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
      <div className='container'>
        
        <h1 className='my-16 text-3xl font-bold text-center'>{t('meetCommercial')}</h1>
        <div className='bg-black w-full h-80'>
            <img src="" alt="image de présentation" />
        </div>

        <span className='my-10'></span>
        <div className="space-y-10 py-14 px-14 flex flex-col justify-center">
            <Button onClick={()=>nav("/connection/student")} children={t('student')} />
            <Button onClick={()=>nav("/connection/startup")} children={t('startup')} />
        </div>

        <div id='description_speech' className='space-y-12 py-16 px-5 bg-gray-200  shadow-lg border border-gray-200 rounded-2xl p-6 max-w-4xl mx-auto mt-10'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 text-center'>{t('slogan')}</h2>
            <img src="" alt="" />
            <p className="text-gray-600 text-lg leading-relaxed text-center">
               {t('presentationSpeech')}</p>
        </div>
      </div>
      </>
  )
}

export default LandingPage



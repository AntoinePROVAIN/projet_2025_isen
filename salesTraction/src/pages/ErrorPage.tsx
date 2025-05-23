
import { useTranslation } from 'react-i18next'
import '../assets/css/error.css'

function ErrorPage() {
    const { t } = useTranslation();
    return (
        <>
            <div className="error_wrapper">
                <div className='error_container'>
                    <h1 className="error_title">{t('errors.ERRORPage')}</h1>
                    <p className="error_text">{t('errors.ERRORPageNotExist')}</p>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
  
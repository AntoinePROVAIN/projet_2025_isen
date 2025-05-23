import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="swipe-container">
      <div className="loading">
        <h2>{t('loading')}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
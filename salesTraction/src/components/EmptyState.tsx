import React from 'react';
import { UserType } from '../types/types_marketplace';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  userType: UserType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ userType }) => {
  const { t } = useTranslation();
  return (
    <div className="swipe-container">
      <div className="no-offers">
        <h2>🎉 {t('matches.allDone')}</h2>
        <p>{t('common.noMore', { item: userType === 'student' ? t('common.offers') : t('common.students') })}</p>
        <p>{t('matches.checkLater')}</p>
      </div>
    </div>
  );
};

export default EmptyState;
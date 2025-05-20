import React from 'react';
import { UserType } from '../types/types_marketplace';

interface EmptyStateProps {
  userType: UserType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ userType }) => {
  return (
    <div className="swipe-container">
      <div className="no-offers">
        <h2>🎉 All done!</h2>
        <p>No more {userType === 'student' ? 'offers' : 'students'} available at the moment.</p>
        <p>Check back later for new opportunities!</p>
      </div>
    </div>
  );
};

export default EmptyState;
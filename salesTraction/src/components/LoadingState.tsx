import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="swipe-container">
      <div className="loading">
        <h2>Loading...</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
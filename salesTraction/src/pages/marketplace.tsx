import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { useUserDetection } from '../hooks/userUserDetection';
import { useDataFetching } from '../hooks/useDataFetching';
import { checkForMatch, submitEnterpriseLike, submitStudentLike } from '../services/api_service_marketplace';
import OfferCard from '../components/OfferCard';
import StudentCard from '../components/StudentCard';
import MotivationModal from '../components/MotivationModal';
import MatchModal from '../components/MatchModal';
import OfferFiltersComponent from '../components/OfferFilters';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { Offer, Student, Match, UserType, OfferFilters } from '../types/types_marketplace';
import '../assets/css/marketplace_student.css';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

function Marketplace() {
  const { userType, userId } = useUserDetection();
  const { t, i18n } = useTranslation();
  const { 
    offers, 
    students, 
    isLoading, 
    filters, 
    setFilters, 
    availableRegions, 
    availableSectors 
  } = useDataFetching(userType, userId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [motivation, setMotivation] = useState('');
  const [showMotivationModal, setShowMotivationModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [pendingOffer, setPendingOffer] = useState<Offer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchedItem, setMatchedItem] = useState<Student | Offer | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // For debugging - this can be removed in production
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' && currentItem) {
        console.log('Manually triggering match modal for debugging');
        setMatchedItem(currentItem);
        setShowMatchModal(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset current index when filters change or data is updated
  useEffect(() => {
    setCurrentIndex(0);
  }, [filters, offers, students]);

  const handleSwipe = (direction: string, item: Offer | Student) => {
    if (direction === 'right') {
      if (userType === 'student') {
        // Student wants to like an offer - show motivation modal
        setPendingOffer(item as Offer);
        setShowMotivationModal(true);
      } else {
        // Enterprise wants to like a student - submit directly
        handleEnterpriseLike(item as Student);
      }
    } else {
      // Skip item (swipe left)
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleEnterpriseLike = async (student: Student) => {
    setIsSubmitting(true);
    try {
      const success = await submitEnterpriseLike(student.id, userId);
      
      if (success) {
        // Check for match after successful like
        const match = await checkForMatch(student.id, userId);
        
        if (match) {
          // It's a match!
          setMatchedItem(student);
          setShowMatchModal(true);
        }
        
        // Move to next student
        setCurrentIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.error(t("errors.ERRORSubmitLike"), error);
      alert(t("errors.ERRORSubmitLikeAlert"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentLike = async () => {
    if (!pendingOffer || !motivation.trim()) {
      alert(t("messages.writeMotivation"));
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await submitStudentLike(pendingOffer.id, userId, motivation.trim());
      
      if (success) {
        // Get startup ID from the offer to check for match
        const startupId = pendingOffer.startup?.id;
        
        if (startupId) {
          // Check for match after successful like
          const match = await checkForMatch(userId, startupId);
          
          if (match) {
            // It's a match!
            setMatchedItem(pendingOffer);
            setShowMatchModal(true);
          }
        }
        
        // Success - move to next offer
        setCurrentIndex((prev) => prev + 1);
        setShowMotivationModal(false);
        setMotivation('');
        setPendingOffer(null);
      }
    } catch (error) {
      console.error(t("ERRORSubmitLike"), error);
      alert(t("ERRORSubmitLikeAlert"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelLike = () => {
    setShowMotivationModal(false);
    setMotivation('');
    setPendingOffer(null);
  };

  const closeMatchModal = () => {
    setShowMatchModal(false);
    setMatchedItem(null);
  };

  const handleFilterChange = (newFilters: OfferFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Don't render anything until we have user info
  if (!userId) {
    return <LoadingState message={t('messages.detectingUser')} />;
  }

  // Show loading state
  if (isLoading) {
    return <LoadingState message={t('messages.loading')+` ${userType === 'student' ? t('offers.offer') : t('profile.students')}...`} />;
  }

  // Get current item based on user type
  const items = userType === 'student' ? offers : students;
  const currentItem = items[currentIndex];
  const totalItems = items.length;
  
  // Show empty state when no more items
  if (!currentItem && !showMatchModal) {
    return (
      <>
        <Header />
        <EmptyState userType={userType} />
      </>
    );
  }

  // Show match modal
  if (showMatchModal) {
    return (
      <MatchModal
        matchedItem={matchedItem}
        userType={userType}
        onClose={closeMatchModal}
      />
    );
  }

  return (<> <Header /> 
    <div className="swipe-container">
      
      <div className="offers-counter">
        {currentIndex + 1} / {totalItems}
      </div>
      
      {/* Filters - only show for students */}
      {userType === 'student' && (
        <OfferFiltersComponent
          filters={filters}
          onFilterChange={handleFilterChange}
          availableRegions={availableRegions}
          availableSectors={availableSectors}
          onToggleFilters={toggleFilters}
          isVisible={showFilters}
        />
      )}
      
      {/* Loading overlay for enterprise likes */}
      {isSubmitting && userType === 'startup' && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <p>{t('actions.submitLike')}</p>
          </div>
        </div>
      )}
      
      <TinderCard
        key={currentItem.id}
        onSwipe={(dir) => handleSwipe(dir, currentItem)}
        preventSwipe={['up', 'down']}
        className="tinder-card"
        swipeRequirementType="position"
        swipeThreshold={100}
        onCardLeftScreen={() => {}} // Prevent any default behavior
      >
        <div className="card">
          {userType === 'student' ? (
            <OfferCard offer={currentItem as Offer} />
          ) : (
            <StudentCard student={currentItem as Student} />
          )}
        </div>
      </TinderCard>

        {/* Motivation Modal (Only for Students) */}
        {showMotivationModal && (
          <MotivationModal
            offer={pendingOffer as Offer}
            motivation={motivation}
            setMotivation={setMotivation}
            onCancel={cancelLike}
            onSubmit={handleStudentLike}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </>
  );
}

export default Marketplace;
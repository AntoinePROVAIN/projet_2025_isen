// import React, { useEffect, useState } from 'react';
// import TinderCard from 'react-tinder-card';
// import '../assets/css/marketplace_student.css';

// function StudentSwipeOffers({ studentId }: { studentId: number }) {
//   const [offers, setOffers] = useState<any[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [motivation, setMotivation] = useState('');

//   useEffect(() => {
//     const fetchOffers = async () => {
//       const res = await fetch('http://localhost:3000/offers');
//       const data = await res.json();
//       setOffers(data);
//     };
//     fetchOffers();
//   }, []);

//   const handleSwipe = async (direction: string, offer: any) => {
//     if (direction === 'right') {
//       await fetch('http://localhost:3000/likes/student', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           id: offer.id,
//           id_student: studentId,
//           motivation_text: motivation,
//         }),
//       });
//     }
//     setMotivation('');
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const offer = offers[currentIndex];
//   if (!offer) return <p>No more offers!</p>;

//   return (
//     <div className="swipe-container">
//       <TinderCard
//         key={offer.id}
//         onSwipe={(dir) => handleSwipe(dir, offer)}
//         preventSwipe={['up', 'down']}
//       >
//         <div className="card">
//           <img src={offer.product_image} alt={offer.title} />
//           <h2>{offer.title}</h2>
//           <p>{offer.description}</p>
//           <input
//             type="text"
//             placeholder="Your motivation (for Like)"
//             value={motivation}
//             onChange={(e) => setMotivation(e.target.value)}
//           />
//           <p className="hint">(Swipe right to like, left to skip)</p>
//         </div>
//       </TinderCard>
//     </div>
//   );
// }

// export default StudentSwipeOffers;



import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import '../assets/css/marketplace_student.css';

interface Offer {
  id: number;
  title: string;
  description: string;
  product_image: string;
  // Add other offer properties as needed
}

function StudentSwipeOffers({ studentId }: { studentId: number }) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [motivation, setMotivation] = useState('');
  const [showMotivationModal, setShowMotivationModal] = useState(false);
  const [pendingOffer, setPendingOffer] = useState<Offer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('http://localhost:3000/offers');
        const data = await res.json();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  const handleSwipe = (direction: string, offer: Offer) => {
    if (direction === 'right') {
      // Show motivation modal instead of immediately sending like
      setPendingOffer(offer);
      setShowMotivationModal(true);
    } else {
      // Skip offer (swipe left)
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const submitLike = async () => {
    if (!pendingOffer || !motivation.trim()) {
      alert('Please write a motivation before submitting your like!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/likes/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pendingOffer.id,
          id_student: studentId,
          motivation_text: motivation.trim(),
        }),
      });

      if (response.ok) {
        // Success - move to next offer
        setCurrentIndex((prev) => prev + 1);
        setShowMotivationModal(false);
        setMotivation('');
        setPendingOffer(null);
      } else {
        throw new Error('Failed to submit like');
      }
    } catch (error) {
      console.error('Error submitting like:', error);
      alert('Failed to submit your like. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelLike = () => {
    setShowMotivationModal(false);
    setMotivation('');
    setPendingOffer(null);
  };

  const offer = offers[currentIndex];
  
  if (!offer) {
    return (
      <div className="swipe-container">
        <div className="no-offers">
          <h2>🎉 All done!</h2>
          <p>No more offers available at the moment.</p>
          <p>Check back later for new opportunities!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <div className="offers-counter">
        {currentIndex + 1} / {offers.length}
      </div>
      
      <TinderCard
        key={offer.id}
        onSwipe={(dir) => handleSwipe(dir, offer)}
        preventSwipe={['up', 'down']}
        className="tinder-card"
      >
        <div className="card">
          <img src={offer.product_image} alt={offer.title} className="offer-image" />
          <div className="card-content">
            <h2>{offer.title}</h2>
            <p className="offer-description">{offer.description}</p>
            <div className="swipe-hint">
              <span className="hint-left">👈 Skip</span>
              <span className="hint-right">Like 👉</span>
            </div>
          </div>
        </div>
      </TinderCard>

      {/* Motivation Modal */}
      {showMotivationModal && (
        <div className="motivation-modal-overlay">
          <div className="motivation-modal">
            <div className="modal-header">
              <h3>Why are you interested in this offer?</h3>
              <p>Write a motivation speech to show your interest!</p>
            </div>
            
            <div className="modal-body">
              <div className="offer-preview">
                <img src={pendingOffer?.product_image} alt={pendingOffer?.title} />
                <h4>{pendingOffer?.title}</h4>
              </div>
              
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Explain why you're interested in this opportunity, what skills you bring, and how you can contribute..."
                className="motivation-textarea"
                rows={6}
                maxLength={500}
              />
              
              <div className="character-count">
                {motivation.length}/500 characters
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                onClick={cancelLike}
                className="cancel-button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={submitLike}
                className="submit-button"
                disabled={!motivation.trim() || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Like'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentSwipeOffers;

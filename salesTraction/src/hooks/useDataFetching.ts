import { useState, useEffect } from 'react';
import { UserType, Student, Offer, OfferFilters, LikeOffer, LikeStudent } from '../types/types_marketplace';
import { getStudentLikes, getStartupLikes } from '../services/api_service_marketplace';

export function useDataFetching(userType: UserType, userId: number) {
  // Always declare all state hooks at the top level, regardless of user type
  const [offers, setOffers] = useState<Offer[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [allOffers, setAllOffers] = useState<Offer[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<OfferFilters>({});
  const [userLikes, setUserLikes] = useState<(LikeOffer | LikeStudent)[]>([]);

  // Fetch user's existing likes
  useEffect(() => {
    const fetchUserLikes = async () => {
      if (!userId) return;
      
      try {
        let likes = [];
        if (userType === 'student') {
          likes = await getStudentLikes(userId);
        } else {
          likes = await getStartupLikes(userId);
        }
        setUserLikes(likes);
      } catch (error) {
        console.error('Error fetching user likes:', error);
      }
    };

    fetchUserLikes();
  }, [userType, userId]);

  // Fetch data based on user type
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (userType === 'student') {
          // Fetch offers for students
          const res = await fetch('http://localhost:3000/offers');
          const data = await res.json();
          setAllOffers(data);
          
          // Extract unique regions and sectors
          const regions = [...new Set(data.map((offer: Offer) => offer.region))] as string[];
          setAvailableRegions(regions);

          const sectors = [...new Set(data
            .map((offer: Offer) => offer.startup?.secteur)
            .filter(Boolean))] as string[];
          setAvailableSectors(sectors);
        } else {
          // Fetch students for enterprises
          const res = await fetch('http://localhost:3000/student-portal');
          const data = await res.json();
          setAllStudents(data);
        }
      } catch (error) {
        console.error(`Error fetching ${userType === 'student' ? 'offers' : 'students'}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userType]);

  // Apply filters and remove already liked items
  useEffect(() => {
    if (userType === 'student' && allOffers.length > 0) {
      let filteredOffers = [...allOffers];

      // Filter out already liked offers
      if (userLikes.length > 0) {
        const likedOfferIds = userLikes.map((like: LikeOffer) => like.salesOffer?.id).filter(Boolean);
        filteredOffers = filteredOffers.filter(offer => !likedOfferIds.includes(offer.id));
      }

      // Apply region filter
      if (filters.region) {
        filteredOffers = filteredOffers.filter(offer => 
          offer.region === filters.region
        );
      }

      // Apply sector filter
      if (filters.secteur) {
        filteredOffers = filteredOffers.filter(offer => 
          offer.startup?.secteur === filters.secteur
        );
      }

      // Apply commission filter
      if (filters.minCommission !== undefined) {
        filteredOffers = filteredOffers.filter(offer => 
          offer.commission >= filters.minCommission!
        );
      }
      
      if (filters.maxCommission !== undefined) {
        filteredOffers = filteredOffers.filter(offer => 
          offer.commission <= filters.maxCommission!
        );
      }

      // Apply remote/physical filter
      if (filters.remote_or_physical !== null && filters.remote_or_physical !== undefined) {
        filteredOffers = filteredOffers.filter(offer => 
          offer.remote_or_physical === filters.remote_or_physical
        );
      }

      setOffers(filteredOffers);
    } else if (userType === 'startup' && allStudents.length > 0) {
      let filteredStudents = [...allStudents];

      // Filter out already liked students
      if (userLikes.length > 0) {
        const likedStudentIds = userLikes.map((like: LikeStudent) => like.student?.id).filter(Boolean);
        filteredStudents = filteredStudents.filter(student => !likedStudentIds.includes(student.id));
      }

      setStudents(filteredStudents);
    }
  }, [filters, allOffers, allStudents, userType, userLikes]);

  return { 
    offers, 
    students, 
    isLoading, 
    filters, 
    setFilters, 
    availableRegions, 
    availableSectors 
  };
}
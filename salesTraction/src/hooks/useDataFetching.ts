import { useState, useEffect } from 'react';
import { UserType, Student, Offer, OfferFilters } from '../types/types_marketplace';

export function useDataFetching(userType: UserType) {
  // Always declare all state hooks at the top level, regardless of user type
  const [offers, setOffers] = useState<Offer[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [allOffers, setAllOffers] = useState<Offer[]>([]);
  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<OfferFilters>({});

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
          setStudents(data);
        }
      } catch (error) {
        console.error(`Error fetching ${userType === 'student' ? 'offers' : 'students'}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userType]);

  // Apply filters to offers
  useEffect(() => {
    if (userType === 'student' && allOffers.length > 0) {
      let filteredOffers = [...allOffers];

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
    }
  }, [filters, allOffers, userType]);

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
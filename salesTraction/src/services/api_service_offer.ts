import { Offer } from "../types/types_marketplace";

// const route = "http://127.0.0.1:3000/offers";

// export const getUserOffer = async(userId: number): Promise<Offer[] | null> => {
//     try {
//         const response = await fetch(route+`/${userId}`);

//         // if (response.ok) {
//         //     // First check content type to ensure it's JSON
//         //     const contentType = response.headers.get('content-type');
//         //     console.log('Offer content type:', contentType);
            
//         //     if (contentType && contentType.includes('application/json')) {
//         //       // Get text first to check if empty
//         //       const text = await response.text();
//         //       console.log('Offer response text:', text.substring(0, 100) + '...');
              
//         //       // Only try to parse if there's content
//         //       if (text && text.trim().length > 0) {
//         //         const match = JSON.parse(text);
//         //         console.log('Offer found:', match);
//         //         return match;
//         //       }
//         //     }
//         // }
//         if(response.ok){
//             console.log(response);
//         }
//     } catch (error) {
        
//     }
//     return null;
// }
// Définition de l'interface Offer

  
  // URL de base de l'API
  const API_BASE_URL = 'http://127.0.0.1:3000';
  
  // Classe de service pour gérer les offres
  export class OfferService {
    // Méthode utilitaire pour gérer les erreurs
    private static handleError(error: unknown, message: string): never {
      console.error(message, error);
      throw error;
    }
  
    // Méthode utilitaire pour les requêtes fetch
    private static async fetchWithErrorHandling<T>(
      url: string, 
      options?: RequestInit
    ): Promise<T> {
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json() as T;
      } catch (error) {
        console.error('Erreur lors de la requête fetch:', error);
        throw error;
      }
    }
  
    // Méthode pour construire l'URL avec les paramètres de requête
    private static buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }
      
      return url.toString();
    }
  
    // Récupérer toutes les offres
    static async getAllOffers(): Promise<Offer[]> {
      try {
        return await this.fetchWithErrorHandling<Offer[]>(
          this.buildUrl('/offers')
        );
      } catch (error) {
        return this.handleError(error, 'Erreur lors de la récupération des offres:');
      }
    }

    // Récupérer toutes les offres d'une start-up
    static async getAllOffersByStartup(id_startup: number): Promise<Offer[]> {
        try {
          return await this.fetchWithErrorHandling<Offer[]>(
            this.buildUrl(`/offers/startup/${id_startup}`)
          );
        } catch (error) {
          return this.handleError(error, 'Erreur lors de la récupération des offres:');
        }
      }
  
    // Récupérer une offre par son ID
    static async getOfferById(id: number): Promise<Offer> {
      try {
        return await this.fetchWithErrorHandling<Offer>(
          this.buildUrl(`/offers/${id}`)
        );
      } catch (error) {
        return this.handleError(error, `Erreur lors de la récupération de l'offre ${id}:`);
      }
    }
  
    // Récupérer les offres par région
    // static async getOffersByRegion(region: string): Promise<Offer[]> {
    //   try {
    //     return await this.fetchWithErrorHandling<Offer[]>(
    //       this.buildUrl('/offers', { region })
    //     );
    //   } catch (error) {
    //     return this.handleError(error, `Erreur lors de la récupération des offres de la région ${region}:`);
    //   }
    // }
  
    // Récupérer les offres actives uniquement
    // static async getActiveOffers(): Promise<Offer[]> {
    //   try {
    //     return await this.fetchWithErrorHandling<Offer[]>(
    //       this.buildUrl('/offers', { is_active: true })
    //     );
    //   } catch (error) {
    //     return this.handleError(error, 'Erreur lors de la récupération des offres actives:');
    //   }
    // }
  
    // Créer une nouvelle offre
    static async createOffer(offerData: Omit<Offer, 'id'>): Promise<Offer> {
      try {
        return await this.fetchWithErrorHandling<Offer>(
          this.buildUrl('/offers'), 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(offerData),
          }
        );
      } catch (error) {
        return this.handleError(error, 'Erreur lors de la création de l\'offre:');
      }
    }
  
    // Mettre à jour une offre existante
    static async updateOffer(id: number, offerData: Partial<Offer>): Promise<Offer> {
      try {
        return await this.fetchWithErrorHandling<Offer>(
          this.buildUrl(`/offers/${id}`), 
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(offerData),
          }
        );
      } catch (error) {
        return this.handleError(error, `Erreur lors de la mise à jour de l'offre ${id}:`);
      }
    }
  
    // Supprimer une offre
    static async deleteOffer(id: number): Promise<void> {
      try {
        const response = await fetch(this.buildUrl(`/offers/${id}`), {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        this.handleError(error, `Erreur lors de la suppression de l'offre ${id}:`);
      }
    }
  }
  
  export default OfferService;
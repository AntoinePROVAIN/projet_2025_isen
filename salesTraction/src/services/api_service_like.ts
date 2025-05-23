import { LikeStudent, LikeOffer, Student } from "../types/types_marketplace";


const API_BASE_URL = 'http://127.0.0.1:3000';

 export class LikeService {
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


    static async getStudentLikes(id_student: number): Promise<LikeOffer[]>{
        try{
            const studentLike = await this.fetchWithErrorHandling<LikeOffer[]>(
                this.buildUrl(`/likes/student/${id_student}`)
            );
            return studentLike;
        }catch (error) {
          return this.handleError(error, 'Erreur lors de la récupération des offres likées:');
        }
    }

    static async getOfferStudentLike(id_offer: number): Promise<LikeStudent[]>{
        try{
            const offerStudentLike = await this.fetchWithErrorHandling<LikeStudent[]>(
                this.buildUrl(`/likes/offer/${id_offer}`)
            );
            return offerStudentLike;
        }catch(error) {
            return this.handleError(error, "Erreur lors de la récupération des étudiants qui ont liké cette offre:")
        }
    }

    static async getOfferStudentMatch(id_offer: number): Promise<Student[]>{
      try{
        const OfferStudentMatch = await this.fetchWithErrorHandling<Student[]>(
          this.buildUrl(`/likes/match/${id_offer}`)
        );
        return OfferStudentMatch;
      }catch(error) {
        return this.handleError(error, "Erreur lors de la récupération des étudiants qui ont matché cette offre:")
      }
    }



}

 export default LikeService;
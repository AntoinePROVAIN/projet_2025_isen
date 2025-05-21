// Types definition: types.ts
export interface User {
  id: number;
  email: string;
  password: string;
  is_admin: boolean;
}

export interface Language {
  id: number;
  language: string;
  languageSpoken: {
    language: string;
  };
}

export interface SectorPreference {
  sector_preference: string;
  id: number;
  sectorPreference: {
    sector_preference: string;
  };
}

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  university: string;
  linkedin_url: string;
  starting_date: string;
  ending_date: string;
  profil_picture: string;
  birth_date: string;
  user: User;
  languages: Language[];
  sectorPreferences: SectorPreference[];
}

export interface Startup {
  id: number;
  company_name: string;
  siret?: string;
  description?: string;
  secteur?: string;
  is_validated?: boolean;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  commission: number;
  target_customer: string;
  is_active: boolean;
  product_image: string;
  region: string;
  remote_or_physical: boolean;
  startup?: {
    id: number;
    company_name?: string;
    siret?: string;
    description?: string;
    secteur?: string;
    is_validated?: boolean;
  };
}

export interface Like {
   id: number;
   id_student: number;
   salesOffer?: {
    id: number;
    title: string;
    description: string;
    price: number;
    commission: number;
    target_customer: string;
    is_active: boolean;
    product_image: string;
    region: string;
    remote_or_physical: boolean;
    startup?: {
      id: number;
      company_name?: string;
      siret?: string;
      description?: string;
      secteur?: string;
      is_validated?: boolean;
    };
  },
  motivation_text: string;
  application_date: string;
}

export interface Match {
  id: number;
  date_match: string;
  student: Student;
  startup: Startup;
  messages?: any[];
}

export type UserType = 'student' | 'startup';

export interface OfferFilters {
  region?: string;
  minCommission?: number;
  maxCommission?: number;
  secteur?: string;
  remote_or_physical?: boolean | null; // null means both
}
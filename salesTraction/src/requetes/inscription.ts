export async function register_startup(data: {
  email: string;
  password: string;
  company_name: string;
  siret: string;
  description: string;
  secteur: string;
}): Promise<{ startup: any }> {
  const response = await fetch('http://localhost:3000/enterprise-portal/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}


export async function register_student(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    university: string;
    linkedin_url: string;
    starting_date: Date;
    ending_date: Date;
    profile_picture: string;
    birth_date: Date;
    secteur: string[];
    language: string[];
}): Promise<{ student: any }> {
  const response = await fetch('http://localhost:3000/student-portal/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  console.log("resp ", response.json());
  return response.json();
}
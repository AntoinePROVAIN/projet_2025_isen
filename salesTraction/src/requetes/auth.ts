export async function login_student(email: string, password: string): Promise<{ token: string, student: any }> {
  const response = await fetch('http://localhost:3000/student-portal/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

export async function login_startup(email: string, password: string): Promise<{ token: string, startup: any }> {
  const response = await fetch('http://localhost:3000/enterprise-portal/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

  import React, { useState } from 'react';
  import '../assets/css/admin_connexion.css';
  import { useTranslation } from 'react-i18next';

  function ConnexionAdmin() {
    const {t, i18n} = useTranslation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault(); // prevent page refresh

      try {
        const response = await fetch('http://localhost:3000/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || t('authentication.loginFail'));
        }

        const data = await response.json();
        console.log(`${t('authentication.loginSuccess')}:`, data);
        setSuccessMsg(t('authentication.loggedInSuccessfully'));
        setErrorMsg('');

        //Save token to localStorage
        localStorage.setItem('token', data.token);

        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';

      } catch (error: any) {
        console.error(t('authentication.loginError'), error);
        setErrorMsg(error.message);
        setSuccessMsg('');
      }
    };

    const handleCancel = () => {
      setEmail('');
      setPassword('');
      setErrorMsg('');
      setSuccessMsg('');
    };

    return (
      <form onSubmit={handleLogin}>
        <div className="container">
          <label htmlFor="email"><b>{t('authentication.Email')}</b></label>
          <input
            type="email"
            placeholder={t('authentication.EmailPlaceholder')}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password"><b>{t('password')}</b></label>
          <input
            type="password"
            placeholder={t('authentication.passwordPlaceholder')}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{t('authentication.login')}</button>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
          {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        </div>

        <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={handleCancel}
          >
            {t('actions.cancel')}
          </button>
        </div>
      </form>
    );
  }

  export default ConnexionAdmin;

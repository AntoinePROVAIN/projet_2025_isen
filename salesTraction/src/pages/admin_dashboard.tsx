import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Startup = {
  id: number;
  company_name: string;
  siret: string;
  is_validated: boolean;
  user: User;
};

function AdminDashboard() {
  const { t } = useTranslation();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/enterprise-portal/list', {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          console.log(data)
          throw new Error(data.message || t('errors.fetchStartupsFailed'));
        }
        return res.json();
      })
      .then((data) => {
        setStartups(data.startups);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleValidation = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`http://localhost:3000/enterprise-portal/${id}/validation`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_validated: !currentStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ||  t('errors.updateStatusFailed'));
      }

      const updated = await res.json();
      alert(updated.message);

      // Refresh state locally
      setStartups((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, is_validated: !currentStatus } : s
        )
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('admin.companiesList')}</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">{t('admin.companyName')}</th>
            <th className="p-2 border">{t('admin.siret')}</th>
            <th className="p-2 border">{t('admin.validated')}</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((startup) => (
            <tr key={startup.id} className="border-t">
              <td className="p-2 border">{startup.company_name || t('admin.notDefined')}</td>
              <td className="p-2 border">{startup.siret}</td>
              <td className="p-2 border">
                <button
                  className={`px-3 py-1 rounded ${
                    startup.is_validated ? 'bg-red-500' : 'bg-green-500'
                  } text-white`}
                  onClick={() =>
                    toggleValidation(startup.id, startup.is_validated)
                  }
                >
                  {startup.is_validated ? t('admin.revoke') : t('admin.validate')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

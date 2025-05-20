import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import ConnexionEntreprise from '../pages/ConnexionEntreprise';
import ConnexionEtudiant from '../pages/ConnexionEtudiant';
import InscriptionEntreprise from '../pages/InscriptionEntreprise';
import InscriptionEtudiant from '../pages/InscriptionEtudiant';
import ErrorPage from '../pages/ErrorPage';
import ConnexionAdmin from '../pages/admin_connexion';
import AdminDashboard from '../pages/admin_dashboard';
import Marketplace from '../pages/marketplace';
import ProfilePage from '../pages/ProfilePage';

function AppRoot() {

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<> < LandingPage/> </>} />
            <Route path="/inscription/etudiant" element={<> <InscriptionEtudiant /> </>} />
            <Route path="/inscription/entreprise" element={<> <InscriptionEntreprise /> </>} />
            <Route path="/connexion/etudiant" element={<> <ConnexionEtudiant /> </>} />
            <Route path="/connexion/entreprise" element={<> <ConnexionEntreprise /> </>} />
            <Route path="/admin" element={<> <ConnexionAdmin /> </>} />
            <Route path="/admin/dashboard" element={<> <AdminDashboard /> </>} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<> <ErrorPage /> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot

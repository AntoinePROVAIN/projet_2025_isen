import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import ConnexionEntreprise from '../pages/ConnexionEntreprise';
import ConnexionEtudiant from '../pages/ConnexionEtudiant';
import InscriptionEntreprise from '../pages/InscriptionEntreprise';
import InscriptionEtudiant from '../pages/InscriptionEtudiant';
import ErrorPage from '../pages/ErrorPage';
import MarketPlaceEntreprise from '../pages/MarketPlaceEntreprise';
import MarketPlaceEtudiant from '../pages/MarketPlaceEtudiant';
import ConnexionAdmin from '../pages/admin_connexion';
import AdminDashboard from '../pages/admin_dashboard';
import StudentSwipeOffers from '../pages/marketplace_student'

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
            <Route path="/marketplace/etudiant" element={<> <MarketPlaceEtudiant /> </>} />
            <Route path="/marketplace/entreprise" element={<> <MarketPlaceEntreprise /> </>} />
            <Route path="/admin" element={<> <ConnexionAdmin /> </>} />
            <Route path="/admin/dashboard" element={<> <AdminDashboard /> </>} />
            <Route path="/student/dashboard" element={<> <StudentSwipeOffers studentId={1} /> </>} />
            <Route path="*" element={<> <ErrorPage /> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../components/Header';

import LandingPage from '../pages/LandingPage';
import Connexion from '../pages/Connexion';
import InscriptionEntreprise from '../pages/InscriptionEntreprise';
import InscriptionEtudiant from '../pages/InscriptionEtudiant';
import ErrorPage from '../pages/ErrorPage';
import ConnexionAdmin from '../pages/admin_connexion';
import AdminDashboard from '../pages/admin_dashboard';
import Marketplace from '../pages/marketplace';
import ProfilePage from '../pages/ProfilePage';
import MessagePage from '../pages/MessagePage';
import Offers from '../pages/Offers';
import CreateOfferPage from '../pages/CreateOfferPage';
import MatchesListPage from '../pages/MatchesListPage';
import OneOffer from '../pages/OneOffer';

function AppRoot() {

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<> < LandingPage/> </>} />
            <Route path="/inscript/student" element={<> <InscriptionEtudiant /> </>} />
            <Route path="/inscript/startup" element={<> <InscriptionEntreprise /> </>} />
            <Route path="/connection/:personne" element={<> <Connexion /> </>} />
            <Route path="/admin" element={<> <ConnexionAdmin /> </>} />
            <Route path="/admin/dashboard" element={<> <AdminDashboard /> </>} />
            <Route path="/marketplace" element={<Marketplace />} /> 
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/create_offer" element={<CreateOfferPage />} />
            <Route path="/matches" element={<MatchesListPage />} />
            <Route path="/messages/:matchId" element={<MessagePage />} />

            <Route path="/student/offers" element={<> <Offers /> </>} />
            <Route path="*" element={<> <ErrorPage /> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot

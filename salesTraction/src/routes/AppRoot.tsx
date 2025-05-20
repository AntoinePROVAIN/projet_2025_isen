import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Connexion from '../pages/Connexion';
import InscriptionEntreprise from '../pages/InscriptionEntreprise';
import InscriptionEtudiant from '../pages/InscriptionEtudiant';
import ErrorPage from '../pages/ErrorPage';
import ConnexionAdmin from '../pages/admin_connexion';
import AdminDashboard from '../pages/admin_dashboard';
import StudentSwipeOffers from '../pages/marketplace_student';

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
            <Route path="/student/dashboard" element={<> <StudentSwipeOffers studentId={1} /> </>} />
            <Route path="/enterprise/dashboard" element={<>  </>} />
            <Route path="*" element={<> <ErrorPage /> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot

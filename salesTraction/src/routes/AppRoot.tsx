import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import ConnexionEntreprise from '../pages/ConnexionEntreprise';
import ConnexionEtudiant from '../pages/ConnexionEtudiant';
import InscriptionEntreprise from '../pages/InscriptionEntreprise';
import InscriptionEtudiant from '../pages/InscriptionEtudiant';
import ErrorPage from '../pages/ErrorPage';

function AppRoot() {

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<> < LandingPage/> </>} />
            <Route path="/inscriptionEtudiant" element={<> <InscriptionEtudiant /> </>} />
            <Route path="/inscriptionEntreprise" element={<> <InscriptionEntreprise /> </>} />
            <Route path="/connexionEtudiant" element={<> <ConnexionEtudiant /> </>} />
            <Route path="/connexionEntreprise" element={<> <ConnexionEntreprise /> </>} />
            <Route path="*" element={<> <ErrorPage /> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot

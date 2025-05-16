import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppRoot() {

  return (
    <>
      <Router>
        <Routes>
            {/* <Route path="/" element={<> <PageAuth /> </>} />
            <Route path="/inscription" element={<> <PageInscription /> </>} />
            <Route path="*" element={<> <PageError /> </>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default AppRoot

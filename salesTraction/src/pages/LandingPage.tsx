
import Button from '../components/Bouton'
import Header from '../components/Header'

function LandingPage() {

  return (
    <>
      <Header />
      <h2>Rencontre ton commercial</h2>
      <img src="" alt="" />
      <Button onClick={()=>console.log('Etudiant')} children='Je suis un étudiant' />
      <Button onClick={()=>console.log('Startup')} children='Je suis une startup' />
    </>
  )
}

export default LandingPage

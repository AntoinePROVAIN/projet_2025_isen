
import Button from '../components/Bouton'
import Header from '../components/Header'

function LandingPage() {

  return (
    <>
      <Header />
      <div className='container'>
        <h1>Rencontre ton commercial</h1>
        <img src="" alt="" />
        <Button onClick={()=>console.log('Etudiant')} children='Je suis un étudiant' />
        <Button onClick={()=>console.log('Startup')} children='Je suis une startup' />
    
      </div>
      </>
  )
}

export default LandingPage

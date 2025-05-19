
import { useNavigate } from 'react-router-dom'
import Button from '../components/Bouton'
import Header from '../components/Header'

function LandingPage() {

    const nav = useNavigate();

  return (
    <>
      <Header />
      <div className='container'>
        
        <h1 className='my-10 text-3xl font-bold text-center'>Rencontre ton commercial</h1>
        <div className='bg-black w-full h-80'>
            <img src="" alt="image de présentation" />
        </div>

        <span className='my-10'></span>
        <div className="space-y-10 py-10 px-16 flex flex-col justify-center">
            <Button onClick={()=>nav("/connection/student")} children='Je suis un étudiant' />
            <Button onClick={()=>nav("/connection/entreprise")} children='Je suis une startup' />
        </div>
      </div>
      </>
  )
}

export default LandingPage

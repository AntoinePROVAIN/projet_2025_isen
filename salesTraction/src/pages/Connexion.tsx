import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

import "../assets/css/connexion.css"

function Connexion() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const { personne } = useParams<{ personne: string }>();

  const handleClick = () => {
    if (personne == "student") {
      nav("/student/dashboard"); // a modifier pour mettre celle de l'entreprise
    } else if (personne == "entreprise") {// a modifier peut etre
      nav("entreprise/dashboard");
    } else {
      nav("/")
      console.log("probleme")
    }
  }
  
  const compteExist = () => {
      nav("/inscription/entreprise"); // a modifier pour mettre celle de l'entreprise
  }

  const handleRetour= () => {
    nav("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // setError("");
  
      // try {
      //   const user = await signUpWithEmail(email, password, name);
      //   console.log("Connecté :", user.email, "uid :", user.uid );
      // } catch (err: any) {
      //   setError(err.message);
      // }
  };

  return (
    <>
        <Header/>
          <div className='flex flex-col items-center justify-center min-h-screen p-4 md:p-8'>
            <div className="authComponent_container w-full bg-white shadow-md rounded-lg p-6 mt-8">
              <div className='authComponent_content'>
                <form onSubmit={handleSubmit}>
                  <label className="labels">Email</label>
                  <input type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">Password</label>
                  <input type='password' id='pwd' name='pwd' value={mdp} onChange={(e) => setMdp(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <div className="texte_lien">
                    {/* <p className="leftLink" onClick={compteExist}></p> */}
                    <p className="rightLink" onClick={compteExist}>No account yet ?</p>
                  </div>
                  <div className='auth_buttons flex flex-col md:flex-row justify-between gap-4'>
                      <input type='button' value="Connection" className='auth_button w-full md:w-1/2 py-2 bg-blue-500 text-white rounded' onClick={handleClick}/>
                      <input type='submit' value="Back" className='auth_button w-full md:w-1/2 py-2 bg-gray-500 text-white rounded' onClick={handleRetour}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </>
  )
}

export default Connexion

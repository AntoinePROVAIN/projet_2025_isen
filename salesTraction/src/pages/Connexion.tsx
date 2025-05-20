import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

import { login_student, login_startup } from "../requetes/auth";

import "../assets/css/connexion.css"

function Connexion() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { personne } = useParams<{ personne: string }>();
  const [error, setError] = useState("");
  
  const compteExist = () => {
    if (personne == "student") {
      nav("/inscript/student"); // a modifier pour mettre celle de l'entreprise
    } else if (personne == "entreprise") {// a modifier peut etre
      nav("/inscript/startup");
    } else {
      nav("/")
      console.log("probleme")
    }
  }

  const handleRetour= () => {
    nav("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("personne "+personne);
    if (personne === "student") {
      try {
        const { token, student } = await login_student(email, password);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', JSON.stringify(student.user.id));
        localStorage.setItem('userType', (personne));
        nav("/marketplace");
      } catch (err: any) {
        setError(err.message);
      }
    } else if (personne === "entreprise") {
      try {
        const { token, startup } = await login_startup(email, password);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', JSON.stringify(startup.user.id));
        localStorage.setItem('userType', (personne));
        nav("/marketplace");
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      console.log("problème : utilisateur sans rôle clair");
      // nav("/");
    }
  };

  return (
    <>
        <Header/>
        <div className='flex flex-col items-center justify-center p-4 md:p-8'>
          <div className="authComponent_container w-full bg-white shadow-md rounded-lg p-6 mt-8">
            <div className='authComponent_content'>
              <form onSubmit={handleSubmit}>
                <label className="labels">Email</label>
                <input type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                <label className="labels">Password</label>
                <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                <div className="texte_lien">
                  {/* <p className="leftLink" onClick={compteExist}></p> */}
                  <p className="rightLink" onClick={compteExist}>No account yet ?</p>
                </div>
                <div className='auth_buttons flex flex-col md:flex-row justify-between gap-4'>
                    <input type='submit' value="Connection" className='auth_button w-full md:w-1/2 py-2 bg-blue-500 text-white rounded'/>
                    <input type='button' value="Back" className='auth_button w-full md:w-1/2 py-2 bg-gray-500 text-white rounded' onClick={handleRetour}/>
                </div>
              </form>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </div>
    </>
  )
}

export default Connexion

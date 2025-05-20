import { useState } from "react";
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import "../assets/css/inscriptionEntreprise.css"

function InscriptionEntreprise() {

  const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [siret, setSiret] = useState("");
    const [nameCompany, setNameCompany] = useState("");
    const [desc, setDesc] = useState("");
    const [sector, setSector] = useState("");
    // const [error, setError] = useState("");

    const handleRetour= () => {
      nav("/");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        nav("/connection/entreprise");
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
                    <input type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                    <label className="labels">SIRET's number</label>
                    <input type='text' id="siret" name='siret' value={siret} onChange={(e) => setSiret(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                    <label className="labels">Company's name</label>
                    <input type='text' id="name" name='name' value={nameCompany} onChange={(e) => setNameCompany(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                    <label className="labels">Sectors</label>
                    <input type='text' id="sector" name='sector' value={sector} onChange={(e) => setSector(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                    <label className="labels">Description</label>
                    <input type='text' id="desc" name='desc' value={desc} onChange={(e) => setDesc(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                    <label className="labels">Password</label>
                    <input type='password' id='pwd' name='pwd' value={password} onChange={(e) => setPassword(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
                    <div className='auth_buttons flex flex-col md:flex-row justify-between gap-4'>
                        <input type='submit' value="Inscription" className='auth_button w-full md:w-1/2 py-2 bg-blue-500 text-white rounded'/>
                        <input type='button' value="Back" className='auth_button w-full md:w-1/2 py-2 bg-gray-500 text-white rounded' onClick={handleRetour}/>
                    </div>
                  </form>
              </div>
          </div>
      </div>
    </>
  )
}

export default InscriptionEntreprise

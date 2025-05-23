import { useState } from "react";
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import "../assets/css/inscriptionEntreprise.css"
import { register_startup } from "../requetes/inscription";

function InscriptionEntreprise() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [siret, setSiret] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [secteur, setSecteur] = useState("");
  const [error, setError] = useState("");

  const handleRetour= () => {
    nav("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    e.preventDefault();

    if (siret.length !== 14) {
      setError("Le numéro doit contenir exactement 14 chiffres.");
      return;
    }

    try {
      const result = await register_startup({
        email,
        password,
        company_name,
        siret,
        description,
        secteur,
      });

      console.log('Inscription réussie :', result.startup);
      nav('/connection/startup');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header/>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 md:p-8'>
        <div className="authComponent_container w-full bg-white shadow-md rounded-lg p-6 mt-8">
            <div className='authComponent_content'>
                  <form onSubmit={handleSubmit}>
                    <label className="labels">Email</label>
                    <input type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='placeholder-gray-400 auth_input w-full mb-3 p-1 h-10 border rounded' placeholder="startup@example.com" required/>
                    <label className="labels">SIRET's number</label>
                    <input type='number' id="siret" name='siret' maxLength={14} value={siret} onChange={(e) => {const val = e.target.value;if (/^\d{0,14}$/.test(val)) {setSiret(val);}}} className='placeholder-gray-400 auth_input w-full mb-3 p-1 h-10 border rounded' placeholder="12345678909876" required/>
                    <label className="labels">Company's name</label>
                    <input type='text' id="name" name='name' value={company_name} onChange={(e) => setCompanyName(e.target.value)} className='placeholder-gray-400 auth_input w-full mb-3 p-1 h-10 border rounded' placeholder="Google" required/>
                    <label className="labels">Sectors</label>
                    <input type='text' id="secteur" name='secteur' value={secteur} onChange={(e) => setSecteur(e.target.value)} className='placeholder-gray-400 auth_input w-full mb-3 p-1 h-10 border rounded' placeholder="IT" required/>
                    <label className="labels">Description</label>
                    <input type='text' id="description" name='description' value={description} onChange={(e) => setDescription(e.target.value)} className='placeholder-gray-400 auth_input w-full mb-3 p-1 h-10 border rounded' placeholder="Good and fun." required/>
                    <label className="labels">Password</label>
                    <input type='password' id='pwd' name='pwd' value={password} onChange={(e) => setPassword(e.target.value)} className='placeholder-gray-400 auth_input w-full mb-3 p-1 h-10 border rounded' placeholder="password123" required/>
                    <div className='auth_buttons flex flex-col md:flex-row justify-between gap-4'>
                        <input type='submit' value="Inscription" className='auth_button w-full md:w-1/2 py-2 bg-blue-500 text-white rounded'/>
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

export default InscriptionEntreprise

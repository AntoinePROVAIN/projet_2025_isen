import { useEffect, useState } from "react";
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import "../assets/css/inscriptionEntreprise.css"

function InscriptionEtudiant() {

  const nav = useNavigate();

  const [name, setName] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [age, setAge] = useState("");
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("");
  const [language, setLanguage] = useState("");
  const [dateS, setDateS] = useState("");
  const [dateE, setDateE] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [linkedin, setLinkedin] = useState("");
  // const [error, setError] = useState("");

  const handleClick = () => {
      nav("/connexion/{entreprise}");
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

  useEffect(() => {
    RecupName(name);
  }, [name]);
  
  const RecupName = (str: string) => {
    const [firstN, lName] =  str.split(" ", 5);
    setFName(firstN);
    setLName(lName);
  }


  return (
    <>
      <Header/>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 md:p-8'>
        <div className="authComponent_container w-full bg-white shadow-md rounded-lg p-6 mt-8">
            <div className='authComponent_content'>
                <form onSubmit={handleSubmit}>
                  <label className="labels">Email</label>
                  <input type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">Birth Date</label>
                  <input type='date' id="age" name='age' value={age} onChange={(e) => setAge(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">First Name/ Last Name</label>
                  <input type='text' id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">Linkedin</label>
                  <input type='url' id="linkedin" name='linkedin' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">University</label>
                  <input type='text' id="university" name='university' value={university} onChange={(e) => setUniversity(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">Sectors</label>
                  <input type='text' id="sector" name='sector' value={sector} onChange={(e) => setSector(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">Speaking languages</label>
                  <input type='text' id="lang" name='lang' value={language} onChange={(e) => setLanguage(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <label className="labels">Availability</label>
                  <input type='date' id='start' name='start' value={dateS} onChange={(e) => setDateS(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <input type='date' id='end' name='end' value={dateE} onChange={(e) => setDateE(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <input type="file" accept="image/png, image/jpeg, image/jpg" id="img" name="img" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files && e.target.files[0]) {setPhoto(e.target.files[0]);}}} className="auth_input w-full p-2 text-sm border rounded file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-500 file:text-white file:text-sm"/>
                  <label className="labels">Password</label>
                  <input type='password' id='pwd' name='pwd' value={password} onChange={(e) => setPassword(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded'/>
                  <div className='auth_buttons flex flex-col md:flex-row justify-between gap-4'>
                      <input type='button' value="Inscription" className='auth_button w-full md:w-1/2 py-2 bg-blue-500 text-white rounded' onClick={handleClick}/>
                      <input type='submit' value="Back" className='auth_button w-full md:w-1/2 py-2 bg-gray-500 text-white rounded' onClick={handleRetour}/>
                  </div>
                </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default InscriptionEtudiant

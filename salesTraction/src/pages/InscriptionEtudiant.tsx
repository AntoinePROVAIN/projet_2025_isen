import { useEffect, useState } from "react";
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import "../assets/css/inscription_etudiant.css"
import { register_student } from "../requetes/inscription";

function InscriptionEtudiant() {

  const nav = useNavigate();

  const [name, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birth_date, setBirthDate] = useState(""); // date
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secteurInput, setSecteurInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [sectorPreferences, setSectorPreferences] = useState<string[]>([]);
  const [starting_date, setStartingDate] = useState(""); //date
  const [ending_date, setEndingDate] = useState(""); //date
  const [profil_picture, setProfilPicture] = useState<File | null>(null);
  const [linkedin_url, setLinkedinUrl] = useState("");
  const [error, setError] = useState("");

  const handleRetour= () => {
    nav("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (languages.length === 0) {
      alert("Veuillez ajouter au moins une langue.");
      return;
    }
    // console.log("date ", birth_date, starting_date, ending_date)
    // console.log("table ", languages)
    // console.log("sector ", sectorPreferences)
    // console.log("profil ", profil_picture?.name);
    // console.log("em ", email)
    // console.log("pass ", password)
    // console.log("first ", first_name)
    // console.log("last ", last_name)
    // console.log("uni ", university)
    // console.log("link ", linkedin_url)

    try {
      const result = await register_student({
        email,
        password,
        first_name,
        last_name,
        university,
        linkedin_url,
        starting_date: new Date(starting_date),
        ending_date: new Date(ending_date),
        profile_picture: String(profil_picture?.name),
        birth_date: new Date(birth_date),
        secteur: sectorPreferences,
        language: languages,
      });
      console.log('Inscription réussie :', result.student);
      nav('/connection/student');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    RecupName(name);
  }, [name]);
  
  const RecupName = (str: string) => {
    const [firstN, last_name] =  str.split(" ", 5);
    setFirstName(firstN);
    setLastName(last_name);
  }

  return (
    <>
      <Header/>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 md:p-8'>
        <div className="authComponent_container w-full bg-white shadow-md rounded-lg p-6 mt-8">
          <div className='authComponent_content'>
            <form onSubmit={handleSubmit}>
              <label className="labels">Email</label>
              <input type='email' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
              <label className="labels">Birth Date</label>
              <input type='date' id="birth_date" name='birth_date' value={birth_date} onChange={(e) => setBirthDate(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
              <label className="labels">First Name/ Last Name</label>
              <input type='text' id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
              <label className="labels">linkedin_url</label>
              <input type='url' id="linkedin_url" name='linkedin_url' value={linkedin_url} onChange={(e) => setLinkedinUrl(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
              <label className="labels">University</label>
              <input type='text' id="university" name='university' value={university} onChange={(e) => setUniversity(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>

              <label className="labels">Sector preferences</label>
              <div className="flex items-stretch gap-2 mb-4">
                <input type="text" id="sector_preference" name="sector_preference" value={secteurInput} onChange={(e) => setSecteurInput(e.target.value)} className="border rounded px-2 w-[90%] h-10 focus:outline-none"/>
                <button type="button" className="button_plus bg-cyan-400 text-white rounded w-[10%] min-w-[40px] h-10 flex items-center justify-center" onClick={() => {const trimmed = secteurInput.trim();if (trimmed && !sectorPreferences.includes(trimmed)) {setSectorPreferences([...sectorPreferences, trimmed]);setSecteurInput("");}}}>+</button>
              </div>

              <label className="labels mb-2">Speaking languages</label>
              <div className="flex items-stretch gap-2 mb-4">
                <input type="text" id="lang" name="lang" value={languageInput} onChange={(e) => setLanguageInput(e.target.value)} className="border rounded px-2 w-[90%] h-10 focus:outline-none"/>
                <button type="button" onClick={() => {const trimmed = languageInput.trim(); if (trimmed && !languages.includes(trimmed)) {setLanguages([...languages, trimmed]);setLanguageInput("");}}}className="button_plus bg-cyan-400 text-white rounded w-[10%] min-w-[40px] h-10 flex items-center justify-center">+</button>
              </div>

              <label className="labels">Availability</label>
              <input type='date' id='start' name='start' value={starting_date} onChange={(e) => setStartingDate(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
              <input type='date' id='end' name='end' value={ending_date} onChange={(e) => setEndingDate(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
              <input type="file" accept="imbirth_date/png, imbirth_date/jpeg, imbirth_date/jpg" id="img" name="img" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files && e.target.files[0]) {setProfilPicture(e.target.files[0]);}}} className="auth_input w-full p-2 text-sm border rounded file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-500 file:text-white file:text-sm" required/>
              <label className="labels">Password</label>
              <input type='password' id='pwd' name='pwd' value={password} onChange={(e) => setPassword(e.target.value)} className='auth_input w-full mb-3 p-1 h-10 border rounded' required/>
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

export default InscriptionEtudiant

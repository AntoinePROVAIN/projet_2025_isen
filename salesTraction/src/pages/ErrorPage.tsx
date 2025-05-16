
import '../assets/css/error.css'

function ErrorPage() {

    return (
        <>
            <div className="error_wrapper">
                <div className='error_container'>
                    <h1 className="error_title">Erreur de page</h1>
                    <p className="error_text">La page recherchée n'existe pas</p>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
  
import { useNavigate } from 'react-router-dom'
import './styles.css'
import { useContext, useState } from 'react'
import { ProffyContext } from '../../context/proffyContext'

const LandingPage = () => {
    const navigate = useNavigate()

    const { loginHandler } = useContext(ProffyContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const handleLogin = async () => {
        const isLogged = await loginHandler(email, password)
        if (isLogged) {
            navigate('/home')
        }
        else{
            setShowError(true)
        }
    }

    return (
        <div id="page-landing">
            <div className="logo-container">
                <img src="/images/logo.svg" alt="Proffy" />
                <h2>Sua plataforma de estudos online.</h2>
            </div>

            <img
                className="hero-image"
                src="images/landing.svg"
                alt="Plataforma de estudos"
            />

            <div className="login-inputs">
                <input
                    type="email"
                    placeholder="Email"
                    className="home-input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="home-input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showError && <p className="error">Email ou senha inválidos</p>}

                <button
                    type="submit"
                    className="home-btn"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>

            <div className="buttons-container">
                <span
                    className="study"
                    onClick={() => navigate('/have-classes')}
                >
                    <img src="images/icons/study.svg" alt="Estudar" />
                    Estudar
                </span>

                <span
                    className="give-classes"
                    onClick={() => navigate('/give-classes')}
                >
                    <img src="images/icons/give-classes.svg" alt="Dar aulas" />
                    Dar aulas
                </span>
            </div>
        </div>
    )
}

export default LandingPage

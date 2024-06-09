import { useNavigate } from "react-router-dom";
import "./styles.css"

const LandingPage = () => {

    const navigate = useNavigate()

    return (
    <div id="page-landing">

        <div className="logo-container">
        <img src="/images/logo.svg" alt="Proffy"/>
        <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img className="hero-image" src="images/landing.svg" alt="Plataforma de estudos"/>

        <div className="login-inputs">
        <input type="text" placeholder="Usuário" className="home-input"/>
        <input type="password" placeholder="Senha" className="home-input"/>

        <button type="submit" className="home-btn" onClick={() => navigate("/home")}>Login</button>
        </div>

        <div className="buttons-container">
        <span className="study"  onClick={() => navigate("/have-classes")}>
            <img src="images/icons/study.svg" alt="Estudar"/>
            Estudar
        </span>

        <span className="give-classes"  onClick={() => navigate("/give-classes")}>
            <img src="images/icons/give-classes.svg" alt="Dar aulas"/>
            Dar aulas
        </span>
        </div>
  </div>
)
}

export default LandingPage;
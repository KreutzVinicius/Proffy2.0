import "./styles.css"

const Home = () => {

    return (
    <div id="page-landing">

        <div className="logo-container">
        <img src="/images/logo.svg" alt="Proffy"/>
        <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img className="hero-image" src="images/landing.svg" alt="Plataforma de estudos"/>


        <div className="buttons-container">
        <a className="study" href="/study">
            <img src="images/icons/study.svg" alt="Estudar"/>
            Estudar
        </a>

        <a className="give-classes" href="/give-classes">
            <img src="images/icons/give-classes.svg" alt="Dar aulas"/>
            Dar aulas
        </a>
        </div>

        <p className="total-connections">
        Total de 200 conexões já realizadas
        <img src="/images/icons//purple-heart.svg" alt="Coração roxo"/>
        </p>

  </div>
)
}

export default Home;
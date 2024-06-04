import "./styles.css"

const Header = () => {

    return <div className="page-header">
        <div className="top-bar-container">
            <a href="/">
            <img src="images/icons/back.svg" alt="Voltar"/>
            </a>
            <img src="images/logo.svg" alt=""/>
        </div>
        <div className="header-content">
            <strong>Que incrível que você quer dar aulas.</strong>
            <p>O primeiro passo, é preencher esse formulário de inscrição</p>
            
        </div>
    </div>

}
export default Header;
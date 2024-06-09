import "./styles.css"

export interface HeaderProps {
    content: string;
    subcontent?: string;
}

const Header = ({content, subcontent}: HeaderProps) => {

    return (<div className="page-header">
        <div className="top-bar-container">
            <a href="/">
            <img src="images/icons/back.svg" alt="Voltar"/>
            </a>
            <img src="images/logo.svg" alt=""/>
        </div>
        <div className="header-content">
            <strong>{content}</strong>
            <p>{subcontent ?? ""}</p>
            
        </div>
    </div>)

}
export default Header;
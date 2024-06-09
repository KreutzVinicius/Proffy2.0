import { useContext } from 'react'
import './styles.css'
import { ProffyContext } from '../../context/proffyContext'
import { useNavigate } from 'react-router-dom'

export interface HeaderProps {
    content: string
    subcontent?: string
}

const Header = ({ content, subcontent }: HeaderProps) => {
    const { isLogged } = useContext(ProffyContext)

    const navigate = useNavigate()

    return (
        <div className="page-header">
            <div className="top-bar-container">
                <a href="/">
                    <img src="images/icons/back.svg" alt="Voltar" />
                </a>
                <div className="top-right-header">
                    {!isLogged && (
                        <div
                            className="header-profile-link"
                            onClick={() => navigate('/edit-profile')}
                        >
                            <span className="img-container">
                                <img src="images/icons/user-icon.svg" alt="" />
                            </span>
                            My Profile
                        </div>
                    )}
                    <img
                        src="images/logo.svg"
                        alt=""
                        onClick={() => navigate(isLogged ? '/' : '/home')}
                    />
                </div>
            </div>
            <div className="header-content">
                <strong>{content}</strong>
                <p>{subcontent ?? ''}</p>
            </div>
        </div>
    )
}
export default Header

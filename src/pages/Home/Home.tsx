import Header from '../../components/Header/Header'
import ShowClasses from './ShowClasses/ShowClasses'
import './styles.css'

const Home = () => {
    return (
        <div>
            <Header content="Esses são os proffys disponíveis" />
            <div className="home-wrapper">
                <ShowClasses />
            </div>
        </div>
    )
}

export default Home

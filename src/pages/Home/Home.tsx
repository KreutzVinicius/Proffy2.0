import { useContext } from 'react'
import Header from '../../components/Header/Header'
import { ProffyContext } from '../../context/proffyContext'
import ShowAppointments from './ShowAppointments/ShowAppointments'
import ShowClasses from './ShowClasses/ShowClasses'
import './styles.css'

const Home = () => {
    const { isTeacher } = useContext(ProffyContext)

    return (
        <div>
            <Header content="Esses são os proffys disponíveis" />
            <div className="home-wrapper">
                <ShowAppointments />
                {!isTeacher && <ShowClasses />}
            </div>
        </div>
    )
}

export default Home

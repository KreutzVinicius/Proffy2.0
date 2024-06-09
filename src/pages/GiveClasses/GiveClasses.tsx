import "./styles.css"
import Header from "../../components/Header/Header"
import GiveClassesForm from "../../components/GiveClassesForm/GiveClassesForm"

const GiveClasses = () => {

    return (
    <>
    <Header/>
    <div className="give-classes-container">
        <GiveClassesForm/>
    </div>
    </>
    )
}

export default GiveClasses